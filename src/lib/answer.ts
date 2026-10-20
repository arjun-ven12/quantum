/** Deliberately small arithmetic parser for offline numeric practice. No JS evaluation. */
export function parseNumeric(input:string):number|null {
 const compact=input.trim().replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/−/g,'-');
 if(!compact || compact.length>80)return null;
 const tokens=compact.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|sqrt|pi|[()+*/-]/gi);
 if(!tokens || tokens.join('').toLowerCase()!==compact.replace(/\s/g,'').toLowerCase())return null;
 let at=0;const peek=()=>tokens[at];
 const atom=():number=>{const t=peek();if(t==='+'||t==='-'){at++;return (t==='-'?-1:1)*atom()}if(t==='('){at++;const v=expr();if(peek()!==')')throw Error('parenthesis');at++;return v}if(t?.toLowerCase()==='sqrt'){at++;if(peek()!=='(')throw Error('sqrt');at++;const v=expr();if(peek()!==')'||v<0)throw Error('sqrt');at++;return Math.sqrt(v)}if(t?.toLowerCase()==='pi'){at++;return Math.PI}if(t&&/^(?:\d|\.)/.test(t)){at++;return Number(t)}throw Error('number')};
 const term=():number=>{let v=atom();while(peek()==='*'||peek()==='/'){const op=tokens[at++];const rhs=atom();v=op==='*'?v*rhs:v/rhs}return v};
 const expr=():number=>{let v=term();while(peek()==='+'||peek()==='-'){const op=tokens[at++];const rhs=term();v=op==='+'?v+rhs:v-rhs}return v};
 try{const value=expr();return at===tokens.length&&Number.isFinite(value)?value:null}catch{return null}
}
export function numericEquivalent(input:string,expected:number,tolerance=1e-6):boolean {const actual=parseNumeric(input);return actual!==null&&Math.abs(actual-expected)<=tolerance*Math.max(1,Math.abs(expected));}
