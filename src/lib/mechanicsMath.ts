import {c,polar,matMul,bloch,type Matrix,type Vector} from './math';
export function waveNormalization(ell:number){if(!(ell>0))throw new Error('Length scale must be positive');return Math.sqrt(2/ell)}
export function waveDensity(x:number,ell:number){if(!(ell>0))throw new Error('Length scale must be positive');return x<0?0:(2/ell)*Math.exp(-2*x/ell)}
export function waveIntervalProbability(a:number,b:number,ell:number){if(!(ell>0)||a<0||b<a)throw new Error('Invalid interval');return Math.exp(-2*a/ell)-Math.exp(-2*b/ell)}
export function evolveSplitZ(omegaTime:number):Vector{const q=Math.SQRT1_2;return [polar(q,-omegaTime/2),polar(q,omegaTime/2)]}
export function plusBasisProbability(state:Vector){return (1+bloch(state).x)/2}
export function phaseFlipPlusDensity(p:number):Matrix{if(p<0||p>1)throw new Error('Probability outside [0,1]');return [[c(.5),c(.5-p)],[c(.5-p),c(.5)]]}
export function purity(rho:Matrix){const squared=matMul(rho,rho);return squared.reduce((sum,row,i)=>sum+row[i].re,0)}
