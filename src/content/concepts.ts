import {foundationConcepts} from './foundation';
import {mechanicsConcepts} from './mechanics';
import {computationConcepts} from './computation';
import {algorithmConcepts} from './algorithms';
export const authoredConcepts=[...foundationConcepts,...mechanicsConcepts,...computationConcepts,...algorithmConcepts];
export const conceptsForPage=(page:number)=>authoredConcepts.filter(x=>x.page===page);
