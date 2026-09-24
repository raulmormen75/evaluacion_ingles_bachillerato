/* Reglas de corrección compartidas por la interfaz y las pruebas. */
(function(root){
'use strict';
function normalize(value){return String(value??'').normalize('NFKC').replace(/[’‘]/g,"'").toLowerCase().trim().replace(/[.!?]+$/g,'').replace(/\s+/g,' ').trim();}
function equivalent(a,b){return normalize(a)===normalize(b);}
function grade(q,value){
 if(q.type==='match'){const a=value||{};return q.pairs.reduce((s,p,i)=>s+(a[i]===p[1]?1:0),0)/q.pairs.length;}
 if(q.type==='classify'){const a=value||{};return q.items.reduce((s,p,i)=>s+(a[i]===p.category?1:0),0)/q.items.length;}
 if(q.type==='order'){const a=Array.isArray(value)?value.map(i=>q.tokens[i]).join(' '):'';return q.answers.some(x=>equivalent(a,x))?1:0;}
 return (q.answers||[q.answer]).some(x=>equivalent(value,x))?1:0;
}
function complete(q,value){if(q.type==='match')return q.pairs.every((_,i)=>Boolean(value?.[i]));if(q.type==='classify')return q.items.every((_,i)=>Boolean(value?.[i]));if(q.type==='order')return Array.isArray(value)&&value.length===q.tokens.length;return String(value??'').trim().length>0;}
function answerText(q,value){if(q.type==='match')return q.pairs.map((p,i)=>p[0]+' → '+(value?.[i]||'Sin respuesta')).join('; ');if(q.type==='classify')return q.items.map((p,i)=>p.text+' → '+(value?.[i]||'Sin respuesta')).join('; ');if(q.type==='order')return (value||[]).map(i=>q.tokens[i]).join(' ')||'Sin respuesta';return String(value||'Sin respuesta');}
function expected(q){if(q.pairs)return q.pairs.map(p=>p.join(' → ')).join('; ');if(q.items)return q.items.map(p=>p.text+' → '+p.category).join('; ');return (q.answers||[q.answer]).join(' / ');}
root.ExamScoring={normalize,equivalent,grade,complete,answerText,expected};if(typeof module!=='undefined')module.exports=root.ExamScoring;
})(typeof window!=='undefined'?window:globalThis);
