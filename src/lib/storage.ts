import Dexie, {type Table} from 'dexie';
export type Note = {id:string;title:string;body:string;tags:string[];kind:'personal'|'hypothesis'|'verified';linkedConcepts:string[];updatedAt:string};
export type Progress = {lessonId:string;completed:boolean;lastStudied:string;attempts:number;correct:number;confusing:boolean};
export type SavedCircuit = {id:string;name:string;qubits:number;gates:unknown[];updatedAt:string};
export type StudyEvent = {id:string;conceptId:string;correct:boolean;hints:number;at:string};
export class AtlasDB extends Dexie { notes!:Table<Note,string>; progress!:Table<Progress,string>; circuits!:Table<SavedCircuit,string>; events!:Table<StudyEvent,string>; constructor(){super('quantum-atlas');this.version(1).stores({notes:'id,updatedAt,*tags,*linkedConcepts',progress:'lessonId,lastStudied',circuits:'id,updatedAt',events:'id,conceptId,at'});} }
export const db=new AtlasDB();
export type Backup={schemaVersion:1;exportedAt:string;notes:Note[];progress:Progress[];circuits:SavedCircuit[];events:StudyEvent[]};
export function validateBackup(value:unknown):Backup {
 if(!value||typeof value!=='object') throw new Error('Invalid backup');
 const x=value as Record<string,unknown>;
 if(x.schemaVersion!==1) throw new Error('Unsupported backup version');
 for(const key of ['notes','progress','circuits','events']) if(!Array.isArray(x[key])) throw new Error(`Missing ${key}`);
 const isObject=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
 const isStrings=(v:unknown)=>Array.isArray(v)&&v.every(x=>typeof x==='string');
 for(const n of x.notes as unknown[]) if(!isObject(n)||typeof n.id!=='string'||typeof n.title!=='string'||typeof n.body!=='string'||!isStrings(n.tags)||!isStrings(n.linkedConcepts)||!['personal','hypothesis','verified'].includes(String(n.kind))||typeof n.updatedAt!=='string') throw new Error('Invalid note');
 for(const p of x.progress as unknown[]) if(!isObject(p)||typeof p.lessonId!=='string'||typeof p.completed!=='boolean'||typeof p.lastStudied!=='string'||!Number.isInteger(p.attempts)||!Number.isInteger(p.correct)||typeof p.confusing!=='boolean') throw new Error('Invalid progress');
 for(const c of x.circuits as unknown[]) if(!isObject(c)||typeof c.id!=='string'||typeof c.name!=='string'||!Number.isInteger(c.qubits)||!Array.isArray(c.gates)||typeof c.updatedAt!=='string') throw new Error('Invalid circuit');
 for(const e of x.events as unknown[]) if(!isObject(e)||typeof e.id!=='string'||typeof e.conceptId!=='string'||typeof e.correct!=='boolean'||!Number.isInteger(e.hints)||typeof e.at!=='string') throw new Error('Invalid study event');
 return x as Backup;
}
export async function exportBackup():Promise<Backup>{return {schemaVersion:1,exportedAt:new Date().toISOString(),notes:await db.notes.toArray(),progress:await db.progress.toArray(),circuits:await db.circuits.toArray(),events:await db.events.toArray()};}
export async function importBackup(raw:unknown):Promise<void>{const x=validateBackup(raw);await db.transaction('rw',db.notes,db.progress,db.circuits,db.events,async()=>{await Promise.all([db.notes.clear(),db.progress.clear(),db.circuits.clear(),db.events.clear()]);await db.notes.bulkPut(x.notes);await db.progress.bulkPut(x.progress);await db.circuits.bulkPut(x.circuits);await db.events.bulkPut(x.events);});}
export async function recordAnswer(lessonId:string,correct:boolean,hints=0){const now=new Date().toISOString();const old=await db.progress.get(lessonId);await db.transaction('rw',db.progress,db.events,async()=>{await db.progress.put({lessonId,completed:old?.completed??false,lastStudied:now,attempts:(old?.attempts??0)+1,correct:(old?.correct??0)+(correct?1:0),confusing:old?.confusing??false});await db.events.put({id:crypto.randomUUID(),conceptId:lessonId,correct,hints,at:now});});}
export function nextReviewDays(attempts:number,correct:number,hints=0):number { if(attempts<1) return 0;const rate=correct/attempts;return Math.max(1,Math.round((rate<0.6?1:2**Math.min(correct,6))/(1+hints))); }
