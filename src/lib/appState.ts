import {create} from 'zustand';
type Page='dashboard'|'learn'|'lab'|'practice'|'knowledge'|'athena'|'settings';
type State={page:Page;lessonId:string|null;theme:'dark'|'light';setPage:(page:Page)=>void;openLesson:(id:string)=>void;setTheme:(theme:'dark'|'light')=>void};
export const useApp=create<State>((set)=>({page:'dashboard',lessonId:null,theme:(localStorage.getItem('atlas-theme')==='light'?'light':'dark'),setPage:(page)=>set({page,lessonId:null}),openLesson:(lessonId)=>set({page:'learn',lessonId}),setTheme:(theme)=>{localStorage.setItem('atlas-theme',theme);set({theme});}}));
