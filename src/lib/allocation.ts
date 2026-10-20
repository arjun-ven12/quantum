import {quboEnergy,quboToIsing,isingEnergy} from './math';
export type AllocationInput={taskNames:[string,string];agentNames:[string,string];costs:[[number,number],[number,number]];capable:[[boolean,boolean],[boolean,boolean]];priorities:[number,number];dependency:boolean;penalty:number};
export type Candidate={bits:number[];energy:number;objective:number;feasible:boolean;assignments:string[]};
/** Eight variables x_(task,agent,slot), task-major, agent next, slot last. */
export const varIndex=(task:number,agent:number,slot:number)=>task*4+agent*2+slot;
export function buildAllocation(input:AllocationInput){const n=8,Q=Array.from({length:n},()=>Array(n).fill(0)),P=input.penalty;const linear=(i:number,w:number)=>{Q[i][i]+=w};const pair=(i:number,j:number,w:number)=>{Q[i][j]+=w/2;Q[j][i]+=w/2};
 // Each task exactly once: P(sum x - 1)^2, excluding the constant P.
 for(let t=0;t<2;t++){const vars=[0,1,2,3].map(k=>t*4+k);for(const i of vars)linear(i,-P);for(let a=0;a<vars.length;a++)for(let b=a+1;b<vars.length;b++)pair(vars[a],vars[b],2*P)}
 for(let t=0;t<2;t++)for(let a=0;a<2;a++)for(let s=0;s<2;s++){const i=varIndex(t,a,s);linear(i,input.costs[t][a]-input.priorities[t]*(1-s));if(!input.capable[t][a])linear(i,P)}
 // Agent capacity: at most one task in each time slot.
 for(let a=0;a<2;a++)for(let s=0;s<2;s++)pair(varIndex(0,a,s),varIndex(1,a,s),P);
 // If task 0 precedes task 1, forbid simultaneous or reversed slots.
 if(input.dependency)for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let s=0;s<2;s++)for(let u=0;u<2;u++)if(s>=u)pair(varIndex(0,a,s),varIndex(1,b,u),P);
 return {Q,offset:2*P};
}
export function evaluateAllocation(input:AllocationInput,bits:number[]):Candidate{const {Q,offset}=buildAllocation(input);const picks=[0,1].map(t=>{const options=[] as {agent:number;slot:number}[];for(let a=0;a<2;a++)for(let s=0;s<2;s++)if(bits[varIndex(t,a,s)]===1)options.push({agent:a,slot:s});return options});const exactlyOnce=picks.every(x=>x.length===1);const capable=exactlyOnce&&picks.every((p,t)=>input.capable[t][p[0].agent]);const capacity=exactlyOnce&&!(picks[0][0].agent===picks[1][0].agent&&picks[0][0].slot===picks[1][0].slot);const ordered=!input.dependency||(exactlyOnce&&picks[0][0].slot<picks[1][0].slot);const feasible=exactlyOnce&&capable&&capacity&&ordered;const objective=exactlyOnce?picks.reduce((total,p,t)=>total+input.costs[t][p[0].agent]-input.priorities[t]*(1-p[0].slot),0):Infinity;return {bits,energy:quboEnergy(Q,bits)+offset,objective,feasible,assignments:picks.map((p,t)=>p.length===1?`${input.taskNames[t]} → ${input.agentNames[p[0].agent]} / round ${p[0].slot+1}`:`${input.taskNames[t]} → ${p.length} assignments`)}}
export function solveAllocation(input:AllocationInput){const {Q,offset}=buildAllocation(input);const all=Array.from({length:256},(_,n)=>evaluateAllocation(input,Array.from({length:8},(_,i)=>(n>>(7-i))&1)));const feasible=all.filter(x=>x.feasible).sort((a,b)=>a.objective-b.objective);const energy=all.slice().sort((a,b)=>a.energy-b.energy);return {Q,offset,ising:quboToIsing(Q),feasible,energy,best:feasible[0]??null,checked:all.length};}
export function verifyIsing(input:AllocationInput,bits:number[]){const {Q}=buildAllocation(input);return Math.abs(quboEnergy(Q,bits)-isingEnergy(quboToIsing(Q),bits.map(x=>1-2*x)))<1e-9;}
