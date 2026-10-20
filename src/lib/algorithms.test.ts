import {describe,it,expect} from 'vitest';
import {bvTruth,groverSteps,modularOrder,phaseEstimation,qftBasis,walshOracleAmplitudes} from './algorithms';
import {abs2} from './math';
describe('textbook algorithm reference cases',()=>{
 it('reproduces p. 16 parity and BV output including unobservable offset',()=>{expect(walshOracleAmplitudes(bvTruth(3,0,2))).toEqual([0,0,0,1]);expect(walshOracleAmplitudes(bvTruth(5,1,3))).toEqual([0,0,0,0,0,-1,0,0]);expect(walshOracleAmplitudes([false,false,false,false])).toEqual([1,0,0,0]);expect(walshOracleAmplitudes([false,false,true,true])[0]).toBe(0)});
 it('reproduces pp. 17–18 Grover probabilities and norm',()=>{const four=groverSteps(2,3,1).at(-1)!;expect(four.amplitudes).toEqual([0,0,0,1]);const eight=groverSteps(3,7,2).at(-1)!;expect(eight.probabilities[7]).toBeCloseTo(121/128);expect(eight.probabilities.reduce((a,b)=>a+b,0)).toBeCloseTo(1)});
 it('uses the positive-sign p. 19 QFT convention',()=>{const out=qftBasis(2,1);expect(out[0].re).toBeCloseTo(.5);expect(out[1].im).toBeCloseTo(.5);expect(out[2].re).toBeCloseTo(-.5);expect(out[3].im).toBeCloseTo(-.5);expect(out.map(abs2).reduce((a,b)=>a+b,0)).toBeCloseTo(1)});
 it('resolves p. 20 exact phase 3/8 and normalizes off-grid phase',()=>{const exact=phaseEstimation(3,3/8);expect(exact.probabilities[3]).toBeCloseTo(1);exact.probabilities.forEach((p,i)=>{if(i!==3)expect(p).toBeCloseTo(0)});expect(phaseEstimation(3,1/3).probabilities.reduce((a,b)=>a+b,0)).toBeCloseTo(1)});
 it('verifies p. 21 order and factors for 2 mod 15',()=>{expect(modularOrder(2,15)).toEqual({order:4,cycle:[1,2,4,8],factors:[3,5]});expect(()=>modularOrder(3,15)).toThrow()});
});
