/** Small, deterministic arithmetic parser for offline numeric practice. It
 * accepts expressions, never evaluates JavaScript, and rejects nonfinite values. */
export function parseNumeric(input:string):number|null {
  const compact=input.trim().replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/−/g,'-');
  if(!compact||compact.length>100)return null;
  const tokens=compact.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|sqrt|exp|log2|sin|cos|pi|e|[()+*/^\-]/gi);
  if(!tokens||tokens.join('').toLowerCase()!==compact.replace(/\s/g,'').toLowerCase())return null;
  let at=0;
  const peek=()=>tokens[at];
  const primary=():number=>{
    const token=peek()?.toLowerCase();
    if(token==='('){at++;const value=expression();if(peek()!==')')throw Error('parenthesis');at++;return value}
    if(token==='pi'){at++;return Math.PI}
    if(token==='e'){at++;return Math.E}
    if(token==='sqrt'||token==='exp'||token==='log2'||token==='sin'||token==='cos'){
      at++;if(peek()!=='(')throw Error('function');at++;
      const value=expression();if(peek()!==')')throw Error('function');at++;
      if(token==='sqrt')return Math.sqrt(value);
      if(token==='exp')return Math.exp(value);
      if(token==='log2')return Math.log2(value);
      if(token==='sin')return Math.sin(value);
      return Math.cos(value);
    }
    if(token&&/^(?:\d|\.)/.test(token)){at++;return Number(token)}
    throw Error('number');
  };
  const power=():number=>{const value=primary();if(peek()==='^'){at++;return Math.pow(value,unary())}return value};
  const unary=():number=>{const token=peek();if(token==='+'||token==='-'){at++;return (token==='-'?-1:1)*unary()}return power()};
  const product=():number=>{let value=unary();while(peek()==='*'||peek()==='/'){const op=tokens[at++];const next=unary();value=op==='*'?value*next:value/next}return value};
  const expression=():number=>{let value=product();while(peek()==='+'||peek()==='-'){const op=tokens[at++];const next=product();value=op==='+'?value+next:value-next}return value};
  try{const value=expression();return at===tokens.length&&Number.isFinite(value)?value:null}catch{return null}
}

export function numericEquivalent(input:string,expected:number,tolerance=1e-6):boolean {
  const actual=parseNumeric(input);
  return actual!==null&&Math.abs(actual-expected)<=tolerance*Math.max(1,Math.abs(expected));
}
