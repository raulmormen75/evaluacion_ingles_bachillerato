/* Result report: vector layout with embedded institutional assets. */
(function(root){
'use strict';
let assetPromise;
function loadAssets(){
 if(!assetPromise)assetPromise=Promise.all(['assets/fonts/PlusJakartaSans-Regular.ttf','assets/fonts/PlusJakartaSans-Bold.ttf','assets/ifr-shield.jpg'].map(async url=>{const r=await fetch(url);if(!r.ok)throw new Error('No se pudo cargar '+url);const bytes=new Uint8Array(await r.arrayBuffer());let text='';for(let i=0;i<bytes.length;i+=8192)text+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(text);})).then(([regular,bold,shield])=>({regular,bold,shield})).catch(error=>{assetPromise=null;throw error;});
 return assetPromise;
}
function build({jsPDF,state,questions,topics,scoring,totals,assets}){
 const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
 doc.addFileToVFS('Jakarta-Regular.ttf',assets.regular);doc.addFont('Jakarta-Regular.ttf','Jakarta','normal');
 doc.addFileToVFS('Jakarta-Bold.ttf',assets.bold);doc.addFont('Jakarta-Bold.ttf','Jakarta','bold');
 doc.setProperties({title:'Evaluación de inglés - '+state.name,author:'Instituto Fernando Ramírez',subject:'Resultados de evaluación'});
 const navy='#1C1E5A',ink='#262943',muted='#68718A',line='#DFE3EF',pale='#F3F5FB',green='#157442',red='#B52E40';
 const left=16,width=178,bottom=276;let y=16;
 const text=s=>String(s??'').replace(/[’‘]/g,"'").replace(/[“”]/g,'"').replace(/…/g,'...');
 const font=(size=10,bold=false,color=ink)=>{doc.setFont('Jakarta',bold?'bold':'normal');doc.setFontSize(size);doc.setTextColor(color);};
 const wrap=(s,w,size=10,bold=false)=>{font(size,bold);return doc.splitTextToSize(text(s),w);};
 const write=(s,x,baseline,size=10,bold=false,color=ink)=>{font(size,bold,color);doc.text(text(s),x,baseline);};
 const rect=(x,top,w,h,fill,stroke=null,r=3)=>{doc.setFillColor(fill);if(stroke)doc.setDrawColor(stroke);doc.roundedRect(x,top,w,h,r,r,stroke?'FD':'F');};
 function newPage(title='Detalle de tus respuestas'){doc.addPage();doc.setFillColor(navy);doc.rect(0,0,210,2,'F');write(title,left,15,11,true,navy);doc.setDrawColor(line);doc.line(left,20,194,20);y=26;}
 // One institutional identity block, followed by the same result hierarchy as the app.
 doc.setFillColor('#2CE51E');doc.rect(0,0,210,1.5,'F');
 const shield=doc.getImageProperties('data:image/jpeg;base64,'+assets.shield);const sw=16,sh=sw*shield.height/shield.width;
 doc.addImage('data:image/jpeg;base64,'+assets.shield,'JPEG',left,12,sw,sh);
 write('Instituto Fernando Ramírez',left+21,21,16,true,navy);
 write('Evaluación de inglés',left+21,29,10,false,muted);
 const finished=new Date(state.finished);if(!Number.isNaN(finished.getTime()))write('Entrega: '+finished.toLocaleDateString('es-MX',{day:'numeric',month:'long',year:'numeric'}),left+21,35,8,false,muted);
 y=Math.max(40,14+sh);
 write('Tu resultado',left,y+8,25,true,navy);y+=16;
 const names=wrap(state.name,width,13,true);names.forEach(t=>{if(y+6>bottom)newPage('Tu resultado');write(t,left,y+5,13,true);y+=6;});
 if(y+67>bottom)newPage('Tu resultado');
 write(state.group,left,y+6,10,false,muted);y+=14;
 rect(left,y,width,43,navy);
 write(totals.percentage.toFixed(2)+'%',left+8,y+24,34,true,'#FFFFFF');
 write(totals.points.toFixed(2)+' de 45 puntos'+(totals.review?' · Provisional':''),left+9,y+35,10,false,'#FFFFFF');
 y+=53;
 write('Resultados por tema',left,y,14,true,navy);y+=7;
 totals.topics.forEach((t,i)=>{
  const titleLines=wrap(topics[i],130,10,true),height=Math.max(23,14+titleLines.length*4.8);
  if(y+height>bottom)newPage('Resultados por tema');
  rect(left,y,width,height,i%2===0?pale:'#FFFFFF');
  write('TEMA '+(i+1),left+5,y+6,7,true,muted);
  titleLines.forEach((s,j)=>write(s,left+5,y+12+j*4.8,10,true,navy));
  write(t.score.toFixed(2)+' / 9',left+145,y+13,12,true,navy);
  doc.setFillColor('#E0E5EF');doc.roundedRect(left+5,y+height-5,128,1.4,.6,.6,'F');
  if(t.score>0){doc.setFillColor('#2CE51E');doc.roundedRect(left+5,y+height-5,128*Math.min(1,t.score/9),1.4,.6,.6,'F');}
  y+=height+2;
 });
 if(totals.review){const ls=wrap(totals.review===1?'Hay 1 ejercicio pendiente de revisión.':'Hay '+totals.review+' ejercicios pendientes de revisión.',width,9);ls.forEach(s=>{if(y+5>bottom)newPage('Resultados por tema');write(s,left,y+5,9,false,muted);y+=5;});}
 newPage();
 questions.forEach((q,index)=>{
  const value=state.answers[q.id],points=scoring.grade(q,value),pending=Boolean(q.audio&&state.issues[q.id]);
  const correct=points===1,color=pending?'#865D10':correct?green:red,bg=pending?'#FFF6DF':correct?'#EAF8EF':'#FFF0F2';
  const status=pending?'Por revisar':correct?'Correcto':points>0?'Parcial':'Incorrecto';
  const units=[];
  function prose(s,size=10,bold=false,color=ink){const ls=wrap(s,162,size,bold);for(let i=0;i<ls.length;i+=24){const chunk=ls.slice(i,i+24);units.push({height:chunk.length*5+4,draw:top=>chunk.forEach((v,j)=>write(v,left+8,top+4+j*5,size,bold,color))});}}
  function answerRow(label,answer,expected){
   if(label)prose(label,9,true,navy);
   const two=expected!==null,col=two?79:162,gap=4;
   const a=wrap(answer,col-10,10),b=two?wrap(expected,col-10,10):[];
   for(let offset=0;offset<Math.max(a.length,b.length);offset+=23){const aa=a.slice(offset,offset+23),bb=b.slice(offset,offset+23);const h=12+Math.max(aa.length,bb.length)*5;
    units.push({height:h+3,draw:top=>{
     rect(left+8,top,col,h,bg,null,2);write(offset?'Tu respuesta (continúa)':'Tu respuesta',left+13,top+6,7,true,color);aa.forEach((s,j)=>write(s,left+13,top+12+j*5));
     if(two){rect(left+8+col+gap,top,col,h,'#EEF1FC',null,2);write(offset?'Corrección (continúa)':'Respuesta correcta',left+13+col+gap,top+6,7,true,'#4F5B91');bb.forEach((s,j)=>write(s,left+13+col+gap,top+12+j*5,10,false,navy));}
    }});
   }
  }
  prose(q.prompt,10,true);
  if(q.audio)prose('Audio: '+q.audio,9,false,muted);
  const pairs=q.pairs?q.pairs.map(p=>({label:p[0],answer:p[1]})):q.items?q.items.map(p=>({label:p.text,answer:p.category})):null;
  if(pairs)pairs.forEach((p,i)=>answerRow(p.label,value?.[i]||'Sin respuesta',!pending&&value?.[i]!==p.answer?p.answer:null));
  else answerRow(null,scoring.answerText(q,value),!pending&&!correct?scoring.expected(q):null);
  if(pending)prose('Audio pendiente de revisión.',9,false,muted);else if(!correct)prose(q.explain,9,false,muted);
  const pts=pending?'Pendiente':points.toLocaleString('es-MX',{maximumFractionDigits:2})+' / 1 punto';
  units.push({height:8,draw:top=>{font(8,true,color);doc.text(pts,186,top+5,{align:'right'});}});
  let position=0,continued=false;
  while(position<units.length){
   const title=wrap(topics[q.topic-1],115,10,true),header=12+title.length*4.5;
   const allHeight=units.slice(position).reduce((n,u)=>n+u.height,header+8);
   if(y+allHeight>bottom&&allHeight<=250)newPage();
   if(y+header+units[position].height+8>bottom)newPage();
   let end=position,bodyHeight=0;
   while(end<units.length&&y+header+bodyHeight+units[end].height+8<=bottom){bodyHeight+=units[end].height;end++;}
   if(end===position)throw new Error('El contenido no cabe en la página.');
   rect(left,y,width,header+bodyHeight+8,'#FFFFFF',line,3);
   doc.setFillColor(color);doc.roundedRect(left,y,1.2,header+bodyHeight+8,.5,.5,'F');
   rect(left+6,y+5,10,10,bg,null,2);write(String(index+1),left+8.5,y+11.8,9,true,color);
   title.forEach((s,j)=>write(s,left+20,y+9+j*4.5,10,true,navy));
   if(continued)write('Continúa',left+20,y+header-2,7,false,muted);
   rect(166,y+5,22,8,bg,null,2);font(7,true,color);doc.text(status,177,y+10.5,{align:'center'});
   let top=y+header;for(let i=position;i<end;i++){units[i].draw(top);top+=units[i].height;}
   y+=header+bodyHeight+14;position=end;continued=true;
   if(position<units.length)newPage();
  }
 });
 const pages=doc.getNumberOfPages();for(let i=1;i<=pages;i++){
  doc.setPage(i);doc.setDrawColor(line);doc.line(left,282,194,282);
  write('Evaluación elaborada por el Profesor Morales Mendoza Raul',left,288,7,false,muted);
  font(7,false,muted);doc.text(i+' / '+pages,194,288,{align:'right'});
 }
 return doc;
}
root.IFRPDF={loadAssets,build};if(typeof module!=='undefined')module.exports=root.IFRPDF;
})(typeof window!=='undefined'?window:globalThis);
