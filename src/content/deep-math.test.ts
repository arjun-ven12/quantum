import {describe,expect,it} from 'vitest';
import {abs2,applyCnot,applyGate,c,gates,quboEnergy,tensor} from '../lib/math';
import {groverSteps,modularOrder,qftBasis} from '../lib/algorithms';
import {idealInterceptQber} from '../lib/bb84';
import {ryKernel} from '../lib/qml';
import {trialsForTarget} from '../lib/athenaResearch';

describe('supplementary teaching examples',()=>{
  it('checks the phase-gate interferometer and Bell marginal',()=>{
    let state=applyGate([c(1),c(0)],gates.H,0);
    state=applyGate(state,gates.S,0);
    state=applyGate(state,gates.H,0);
    state.map(abs2).forEach(probability=>expect(probability).toBeCloseTo(.5));
    const bell=applyCnot(tensor([c(Math.SQRT1_2),c(Math.SQRT1_2)],[c(1),c(0)]),0,1);
    expect(abs2(bell[0])+abs2(bell[1])).toBeCloseTo(.5);
  });
  it('checks Grover overshoot and four-state QFT cancellation',()=>{
    const trace=groverSteps(2,0,2);
    expect(trace[1].probabilities[0]).toBeCloseTo(1);
    expect(trace[2].probabilities[0]).toBeCloseTo(.25);
    const f0=qftBasis(2,0),f2=qftBasis(2,2);
    for(let k=0;k<4;k++)expect(abs2(c((f0[k].re+f2[k].re)*Math.SQRT1_2,(f0[k].im+f2[k].im)*Math.SQRT1_2))).toBeCloseTo(k%2?0:.5);
  });
  it('checks factor extraction, penalty expansion and QML overlap',()=>{
    expect(modularOrder(2,15)).toMatchObject({order:4,factors:[3,5]});
    const penalty=(x:number,y:number)=>3+quboEnergy([[-3,6],[0,-3]],[x,y]);
    expect([penalty(0,0),penalty(0,1),penalty(1,0),penalty(1,1)]).toEqual([3,0,0,3]);
    expect(ryKernel(0,Math.PI/2)).toBeCloseTo(.5);
  });
  it('checks BB84 disturbance and independent time-to-target example',()=>{
    expect(idealInterceptQber(.4)).toBeCloseTo(.1);
    expect(trialsForTarget(.5,.95,2)).toEqual({trials:5,time:10});
  });
});
