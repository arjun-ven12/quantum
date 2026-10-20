/** Small-system, ideal state-vector arithmetic. Qubit 0 is the most significant bit. */
export type Complex = { re: number; im: number };
export type Vector = Complex[];
export type Matrix = Complex[][];
export const c = (re: number, im = 0): Complex => ({ re, im });
export const add = (a: Complex, b: Complex): Complex => c(a.re + b.re, a.im + b.im);
export const sub = (a: Complex, b: Complex): Complex => c(a.re - b.re, a.im - b.im);
export const mul = (a: Complex, b: Complex): Complex => c(a.re*b.re-a.im*b.im, a.re*b.im+a.im*b.re);
export const scale = (a: Complex, n: number): Complex => c(a.re*n,a.im*n);
export const conj = (a: Complex): Complex => c(a.re,-a.im);
export const abs2 = (a: Complex): number => a.re*a.re+a.im*a.im;
export function div(a:Complex,b:Complex):Complex { const d=abs2(b);if(d<1e-24)throw new Error('Division by zero');return c((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d); }
export function sqrtComplex(z:Complex):Complex { const r=Math.hypot(z.re,z.im);return c(Math.sqrt(Math.max(0,(r+z.re)/2)),Math.sign(z.im||1)*Math.sqrt(Math.max(0,(r-z.re)/2))); }
export const modulus = (a: Complex): number => Math.sqrt(abs2(a));
export const phase = (a: Complex): number => Math.atan2(a.im,a.re);
export const polar = (r: number, theta: number): Complex => c(r*Math.cos(theta),r*Math.sin(theta));
export const format = (a: Complex, digits=3): string => `${a.re.toFixed(digits)} ${a.im < 0 ? '−' : '+'} ${Math.abs(a.im).toFixed(digits)}i`;
export function norm2(v: Vector): number { return v.reduce((s,x)=>s+abs2(x),0); }
export function normalize(v: Vector): Vector { const n=Math.sqrt(norm2(v)); if(n < 1e-12) throw new Error('Cannot normalize a zero vector'); return v.map(x=>scale(x,1/n)); }
export function dot(a: Vector,b: Vector): Complex { if(a.length!==b.length) throw new Error('Vector dimensions differ'); return a.reduce((s,x,i)=>add(s,mul(conj(x),b[i])),c(0)); }
export function matVec(m: Matrix,v: Vector): Vector { if(!m.length || m.some(row=>row.length!==v.length)) throw new Error('Matrix and vector dimensions differ'); return m.map(row=>row.reduce((s,x,i)=>add(s,mul(x,v[i])),c(0))); }
export function matMul(a: Matrix,b: Matrix): Matrix { if(!a.length||!b.length||a.some(row=>row.length!==b.length)||b.some(row=>row.length!==b[0].length)) throw new Error('Matrix dimensions differ'); return a.map(row=>b[0].map((_,j)=>row.reduce((s,x,k)=>add(s,mul(x,b[k][j])),c(0)))); }
export function dagger(m: Matrix): Matrix { if(!m.length||m.some(row=>row.length!==m[0].length)) throw new Error('Invalid matrix'); return m[0].map((_,j)=>m.map(row=>conj(row[j]))); }
export function eigen2(m:Matrix):{value:Complex;vector:Vector}[] { if(m.length!==2||m.some(r=>r.length!==2))throw new Error('Expected a 2×2 matrix');const [a,b]=m[0],[cc,d]=m[1];const trace=add(a,d),det=sub(mul(a,d),mul(b,cc));const discriminant=sqrtComplex(sub(mul(trace,trace),scale(det,4)));return [1,-1].map(sign=>{const value=scale(add(trace,scale(discriminant,sign)),.5);let vector:Vector=[b,sub(value,a)];if(norm2(vector)<1e-20)vector=[sub(value,d),cc];if(norm2(vector)<1e-20)vector=[c(1),c(0)];return {value,vector:normalize(vector)};}); }
export function isUnitary(m: Matrix,tol=1e-9): boolean { if(!m.length||m.some(row=>row.length!==m.length)) return false; const product=matMul(dagger(m),m); return product.every((row,i)=>row.every((x,j)=>Math.abs(x.re-(i===j?1:0))<tol&&Math.abs(x.im)<tol)); }
export function tensor(a: Vector,b: Vector): Vector { return a.flatMap(x=>b.map(y=>mul(x,y))); }
const q=Math.SQRT1_2;
export const gates: Record<string,Matrix> = {
 I:[[c(1),c(0)],[c(0),c(1)]], X:[[c(0),c(1)],[c(1),c(0)]],
 Y:[[c(0),c(0,-1)],[c(0,1),c(0)]], Z:[[c(1),c(0)],[c(0),c(-1)]],
 H:[[c(q),c(q)],[c(q),c(-q)]], S:[[c(1),c(0)],[c(0),c(0,1)]],
 T:[[c(1),c(0)],[c(0),polar(1,Math.PI/4)]]
};
export function rotation(axis:'x'|'y'|'z',theta:number): Matrix { const co=Math.cos(theta/2),si=Math.sin(theta/2); if(axis==='x') return [[c(co),c(0,-si)],[c(0,-si),c(co)]]; if(axis==='y') return [[c(co),c(-si)],[c(si),c(co)]]; return [[polar(1,-theta/2),c(0)],[c(0),polar(1,theta/2)]]; }
export function zeroState(qubits:number): Vector { if(!Number.isInteger(qubits)||qubits<1||qubits>5) throw new Error('Use 1–5 qubits'); return Array.from({length:2**qubits},(_,i)=>c(i===0?1:0)); }
export function applyGate(state:Vector, gate:Matrix, target:number): Vector { const n=Math.log2(state.length); if(!Number.isInteger(n)||target<0||target>=n||!Number.isInteger(target)||gate.length!==2||gate.some(r=>r.length!==2)) throw new Error('Invalid gate, target, or state'); const mask=1<<(n-target-1),out=state.map(x=>({...x})); for(let i=0;i<state.length;i++) if(!(i&mask)){ const j=i|mask; out[i]=add(mul(gate[0][0],state[i]),mul(gate[0][1],state[j])); out[j]=add(mul(gate[1][0],state[i]),mul(gate[1][1],state[j])); } return out; }
export function applyCnot(state:Vector,control:number,target:number): Vector { const n=Math.log2(state.length); if(!Number.isInteger(n)||control===target||control<0||target<0||control>=n||target>=n) throw new Error('Invalid CNOT wires'); const cm=1<<(n-control-1),tm=1<<(n-target-1),out=state.map(x=>({...x})); for(let i=0;i<state.length;i++) if((i&cm)&&!(i&tm)){ const j=i|tm; out[i]=state[j]; out[j]=state[i]; } return out; }
export function probabilities(state:Vector): number[] { const p=state.map(abs2); const sum=p.reduce((a,b)=>a+b,0); if(Math.abs(sum-1)>1e-8) throw new Error('State is not normalized'); return p; }
export function bloch(state:Vector): {x:number;y:number;z:number} { if(state.length!==2||Math.abs(norm2(state)-1)>1e-8) throw new Error('Expected normalized one-qubit state'); const cross=mul(conj(state[0]),state[1]); return {x:2*cross.re,y:2*cross.im,z:abs2(state[0])-abs2(state[1])}; }
export function quboEnergy(q:number[][],bits:number[]):number { if(q.length!==bits.length||q.some(r=>r.length!==bits.length)||bits.some(b=>b!==0&&b!==1)) throw new Error('Invalid QUBO input'); return bits.reduce((sum,x,i)=>sum+x*bits.reduce((s,y,j)=>s+q[i][j]*y,0),0); }
/** Textbook convention s=2x-1, x=(1+s)/2; E=offset + h.s + sJs. */
export function quboToIsing(q:number[][]):{offset:number;h:number[];J:number[][]} { const n=q.length;if(q.some(r=>r.length!==n)) throw new Error('QUBO must be square'); const h=Array(n).fill(0),J=Array.from({length:n},()=>Array(n).fill(0)); let offset=0;for(let i=0;i<n;i++){offset+=q[i][i]/2;h[i]+=q[i][i]/2;for(let j=i+1;j<n;j++){const w=q[i][j]+q[j][i];offset+=w/4;h[i]+=w/4;h[j]+=w/4;J[i][j]=w/4;}}return {offset,h,J}; }
export function isingEnergy(model:ReturnType<typeof quboToIsing>,spins:number[]):number { return model.offset+spins.reduce((sum,z,i)=>sum+model.h[i]*z,0)+model.J.reduce((sum,row,i)=>sum+row.reduce((s,j,jx)=>s+j*spins[i]*spins[jx],0),0); }
