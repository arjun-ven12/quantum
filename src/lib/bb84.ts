import {applyGate,c,gates,probabilities,type Vector} from './math';
export type Basis=0|1;export type Bit=0|1;
export const preparedState=(bit:Bit,basis:Basis):Vector=>basis?applyGate(bit?[c(0),c(1)]:[c(1),c(0)],gates.H,0):bit?[c(0),c(1)]:[c(1),c(0)];
export const measureDistribution=(state:Vector,basis:Basis):[number,number]=>probabilities(basis?applyGate(state,gates.H,0):state) as [number,number];
export function bobDistribution(aliceBit:Bit,aliceBasis:Basis,bobBasis:Basis,eveBasis:Basis|null):[number,number]{const initial=preparedState(aliceBit,aliceBasis);if(eveBasis===null)return measureDistribution(initial,bobBasis);const eve=measureDistribution(initial,eveBasis);const d0=measureDistribution(preparedState(0,eveBasis),bobBasis),d1=measureDistribution(preparedState(1,eveBasis),bobBasis);return [eve[0]*d0[0]+eve[1]*d1[0],eve[0]*d0[1]+eve[1]*d1[1]]}
export const idealInterceptQber=(fraction:number)=>{if(fraction<0||fraction>1)throw Error('Fraction must be between zero and one');return fraction/4};
export const noErrorProbability=(tested:number,qber:number)=>{if(!Number.isInteger(tested)||tested<0||qber<0||qber>1)throw Error('Invalid sample');return (1-qber)**tested};
