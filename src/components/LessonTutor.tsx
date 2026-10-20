import {useState} from 'react';
import type {FoundationConcept} from '../content/foundation';
import {authoredConcepts} from '../content/concepts';
import {teachingFor} from '../content/teaching';
import {MathText} from './Math';
export function LessonTutor({concept,onPrerequisite,confusing,onConfused,onClearConfused}:{concept:FoundationConcept;onPrerequisite:(page:number)=>void;confusing:boolean;onConfused:()=>void;onClearConfused:()=>void}){
 const [open,setOpen]=useState(false),[at,setAt]=useState(0),[showConfused,setShowConfused]=useState(false);
 const note=teachingFor(concept.id);
 const prerequisites=concept.prerequisites.map(id=>authoredConcepts.find(x=>x.id===id)).filter((x):x is FoundationConcept=>Boolean(x));
 const frames=[
  {title:'1 · Build a picture',content:note?.bridge??concept.intuitive},
  {title:'2 · What you need first',content:prerequisites.length?`This reasoning uses ${prerequisites.map(x=>x.title).join(', ')}. Try describing each idea before reading the formula.`:'You need complex arithmetic and elementary algebra. Say what the quantities represent before manipulating symbols.'},
  ...concept.symbols.map(([symbol,meaning],i)=>({title:`${i+3} · Read one symbol`,content:<><MathText tex={symbol}/> means {meaning}. Find where it appears in the formula before moving on.</>})),
  {title:'Connect the symbols',content:<><div className="formula"><MathText block tex={concept.formula}/></div><p>{concept.rigorous}</p></>},
  ...concept.steps.map((step,i)=>({title:`Derivation · step ${i+1}`,content:<><p>{step.prompt}</p><p>{step.why}</p></>})),
  {title:'Check a worked case',content:concept.worked},
  {title:'Explore, then solve',content:<><p>Before opening the {concept.lab} lab, predict what will change. {concept.labPrompt}</p><p>Then solve independently: {concept.practice.prompt}</p></>}
 ];
 return <section className="tutor-panel" aria-label={`Teach Me: ${concept.title}`}><div className="tutor-actions"><button className="secondary" aria-expanded={open} onClick={()=>{setOpen(x=>!x);setAt(0)}}>Teach Me · guided mode</button><button className="secondary" aria-expanded={showConfused} onClick={()=>{setShowConfused(x=>!x);if(!confusing)onConfused()}}>I'm Confused</button></div>{open&&<div className="tutor-frame"><div className="section-head"><strong>{frames[at].title}</strong><small>{at+1} / {frames.length}</small></div><div className="tutor-copy">{frames[at].content}</div><div className="button-row"><button className="secondary" disabled={at===0} onClick={()=>setAt(x=>x-1)}>Previous</button><button className="primary" disabled={at===frames.length-1} onClick={()=>setAt(x=>x+1)}>Next explanation</button></div></div>}{showConfused&&<div className="tutor-frame"><strong>Another route into this idea</strong><p>{note?.alternate??`Start with the concrete case: ${concept.worked} Now return to the general statement and identify which quantities changed.`}</p><p className="muted">{confusing?'Marked for review on this device.':'Marking this concept for review.'}</p>{confusing&&<button className="text-button" onClick={onClearConfused}>Clear confusing flag</button>}{prerequisites.length>0&&<><strong>Revisit a prerequisite</strong><div className="tutor-prereqs">{prerequisites.map(x=><button className="secondary" key={x.id} onClick={()=>onPrerequisite(x.page)}>{x.title} · p. {x.page}</button>)}</div></>}{prerequisites.length===0&&<p>Try the complex plane or matrix lab from this lesson, then return to the worked example.</p>}</div>}</section>
}
