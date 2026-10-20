import katex from 'katex';
export function MathText({tex,block=false}:{tex:string;block?:boolean}){let html='';try{html=katex.renderToString(tex,{throwOnError:false,displayMode:block,output:'html'});}catch{html=tex;}return <span className={block?'math-block':'math-inline'} dangerouslySetInnerHTML={{__html:html}}/>;}
