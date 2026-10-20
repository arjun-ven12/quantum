import type {StudyEvent} from './storage';
export type ReviewState={attempts:number;successes:number;streak:number;intervalDays:number;dueAt:string|null;due:boolean;label:'New'|'Needs work'|'Learning'|'Review due'|'Recall growing'};
const DAY=86_400_000;
/** Transparent success-and-hint review schedule, not a validated learning model. */
export function reviewState(events:StudyEvent[],now=new Date()):ReviewState{
 const ordered=[...events].sort((a,b)=>a.at.localeCompare(b.at));
 let streak=0,intervalDays=0,ease=2.3,successes=0,dueAt:string|null=null,lastSuccessAt:number|null=null;
 for(const event of ordered){
  const when=Date.parse(event.at);if(!Number.isFinite(when))continue;
  if(!event.correct){streak=0;intervalDays=0;dueAt=event.at;lastSuccessAt=null;ease=Math.max(1.3,ease-.2);continue}
  successes++;if(lastSuccessAt!==null&&when-lastSuccessAt<DAY/2)continue;streak++;lastSuccessAt=when;
  const quality=event.hints>0?3:5;
  ease=Math.max(1.3,ease+(quality===5?.1:-.14));
  intervalDays=streak===1?1:streak===2?3:Math.max(4,Math.round(intervalDays*ease));
  dueAt=new Date(when+intervalDays*DAY).toISOString();
 }
 const due=dueAt!==null&&Date.parse(dueAt)<=now.getTime();
 const label=ordered.length===0?'New':streak===0?'Needs work':due?'Review due':streak>=3?'Recall growing':'Learning';
 return {attempts:ordered.length,successes,streak,intervalDays,dueAt,due,label};
}
export function eventsForConcept(events:StudyEvent[],id:string){return events.filter(event=>event.conceptId===id||event.conceptId.startsWith(`${id}:`))}
