import {describe,it,expect} from 'vitest';
import {parseNumeric,numericEquivalent} from './answer';
describe('offline numeric answers',()=>{it('checks fractions, roots and pi',()=>{expect(parseNumeric('1/6')).toBeCloseTo(1/6);expect(parseNumeric('sqrt(2)/2')).toBeCloseTo(Math.SQRT1_2);expect(parseNumeric('π/2')).toBeCloseTo(Math.PI/2)});it('rejects code, division by zero and malformed expressions',()=>{expect(parseNumeric('alert(1)')).toBeNull();expect(parseNumeric('1/0')).toBeNull();expect(parseNumeric('2+')).toBeNull()});it('uses explicit numerical tolerance',()=>{expect(numericEquivalent('0.166667',1/6,1e-5)).toBe(true);expect(numericEquivalent('0.1',1/6,1e-5)).toBe(false)})});
describe('formula-friendly numerical input',()=>{
  it('accepts functions and powers used by later textbook exercises',()=>{
    expect(parseNumeric('1-exp(-2)')).toBeCloseTo(1-Math.exp(-2));
    expect(parseNumeric('e^(-2)')).toBeCloseTo(Math.exp(-2));
    expect(parseNumeric('cos(pi/4)^2')).toBeCloseTo(.5);
    expect(parseNumeric('sin(pi/3)')).toBeCloseTo(Math.sqrt(3)/2);
    expect(parseNumeric('log2(8)')).toBe(3);
    expect(parseNumeric('2^3^2')).toBe(512);
    expect(parseNumeric('-2^2')).toBe(-4);
  });
  it('rejects undefined or unsafe expressions',()=>{
    for(const input of ['sqrt(-1)','log2(0)','0/0','2**3','2^10000','constructor(1)'])expect(parseNumeric(input)).toBeNull();
  });
});
