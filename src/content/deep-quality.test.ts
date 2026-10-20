import {describe,expect,it} from 'vitest';
import {authoredConcepts} from './concepts';
import {deepChecks} from './deep-checks';
import {deepTeaching} from './deep-teaching';
import {choiceFeedback,teachingFor} from './teaching';
import {numericMistakes} from './numeric-mistakes';

describe('individual lesson teaching audit',()=>{
  it('gives every concept an alternate teaching route and a source-specific diagnosis',()=>{
    expect(authoredConcepts).toHaveLength(107);
    expect(Object.keys(deepTeaching)).toHaveLength(92);
    expect(Object.keys(deepChecks)).toHaveLength(92);
    for(const concept of authoredConcepts){
      const note=teachingFor(concept.id);
      expect(note?.bridge.length,concept.id).toBeGreaterThan(60);
      expect(note?.alternate.length,concept.id).toBeGreaterThan(70);
      expect(note?.whyUseful.length,concept.id).toBeGreaterThan(15);
      expect(new Set(concept.check.options).size,concept.id).toBe(3);
      for(let index=0;index<3;index++){
        if(index===concept.check.answer)continue;
        const feedback=choiceFeedback(concept.id,index,concept.check.answer,concept.check.options[index],concept.practice.hint,concept.check.feedback);
        expect(feedback.length,`${concept.id} option ${index}`).toBeGreaterThan(35);
        expect(feedback,concept.id).not.toContain('You chose');
      }
    }
  });
  it('keeps the source-correct answer while replacing later chapters’ two weak distractors',()=>{
    for(const concept of authoredConcepts.filter(c=>c.page>6)){
      const upgrade=deepChecks[concept.id];
      expect(upgrade,concept.id).toBeDefined();
      expect(deepTeaching[concept.id],concept.id).toBeDefined();
      const wrong=concept.check.options.filter((_,index)=>index!==concept.check.answer);
      expect(wrong,concept.id).toEqual(upgrade.wrong);
      expect(upgrade.why.every(reason=>reason.length>35),concept.id).toBe(true);
    }
  });
  it('attaches numerical diagnoses only to distinct wrong values',()=>{
    for(const [id,traps] of Object.entries(numericMistakes)){
      const concept=authoredConcepts.find(c=>c.id===id);
      expect(concept,id).toBeDefined();
      for(const trap of traps){
        expect(Number.isFinite(trap.value),id).toBe(true);
        expect(Math.abs(trap.value-concept!.practice.answer),id).toBeGreaterThan(concept!.practice.tolerance??1e-6);
        expect(trap.message.length,id).toBeGreaterThan(40);
      }
    }
  });
});
