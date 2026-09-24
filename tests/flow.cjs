const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const nodes=new Map();
const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',disabled:false,focus(){},addEventListener(){}});return nodes.get(id);};
let stored=null;
const c=vm.createContext({crypto:require('node:crypto').webcrypto,window:{addEventListener(){},scrollTo(){}},document:{getElementById:node,querySelectorAll:()=>[]},localStorage:{getItem:()=>stored,setItem:(k,v)=>{stored=v;},removeItem:()=>{stored=null;}},setTimeout:()=>1,clearTimeout(){},console});
for(const file of ['questions.js','scoring.js','app.js']){vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);if(file==='questions.js')c.TOPICS=c.window.TOPICS;}
const run=code=>vm.runInContext(code,c);
run(`state={version:VERSION,name:'Prueba',group:'Tercer cuatrimestre',started:new Date().toISOString(),ids:BANK.map(q=>q.id),index:0,answers:{},orderings:{},issues:{},plays:{},done:false};for(const q of BANK){if(q.choices)state.orderings[q.id]=q.choices;if(q.tokens)state.orderings[q.id]=q.tokens.map((_,i)=>i);if(q.pairs)state.orderings[q.id]=q.pairs.map(p=>p[1]);}renderQuestion();`);
run('go(1);review();results();downloadPDF();restartEvaluation()');assert.equal(run('state.index'),0);assert.equal(run('view'),'exam');
for(let i=0;i<45;i++){
 assert.equal(run('state.index'),i);
 run(`{const q=qs()[state.index];const answer=q.pairs?Object.fromEntries(q.pairs.map((p,i)=>[i,p[1]])):q.items?Object.fromEntries(q.items.map((p,i)=>[i,p.category])):q.tokens?q.tokens.map((_,i)=>i):q.answers?.[0]??q.answer;setAnswer(q,answer);}`);
 if(i<44){run(`go(${i+1})`);const before=run('JSON.stringify(state.answers)');run(`setAnswer(qs()[${i}],'changed');go(${i});`);assert.equal(run('JSON.stringify(state.answers)'),before);assert.equal(run('state.index'),i+1);}
}
run('review()');assert.equal(run('view'),'review');
const finalAnswer=run('JSON.stringify(state.answers)');run('state=null;restore();startScreen();setAnswer(qs()[44],"changed")');
assert.equal(run('view'),'review');assert.equal(run('JSON.stringify(state.answers)'),finalAnswer);
node('finish').onclick();assert.equal(run('view'),'results');assert.equal(run('totals().percentage'),100);
const answers=run('JSON.stringify(state.answers)');run('setAnswer(qs()[44],"changed");go(0);startScreen()');assert.equal(run('view'),'results');assert.equal(run('JSON.stringify(state.answers)'),answers);
assert(!/Folio|id="print"|question-grid/.test(node('app').innerHTML));
assert(node('app').innerHTML.includes('id="restart"'));
assert(node('app').innerHTML.indexOf('id="restartTop"') < node('app').innerHTML.indexOf('Detalle de tus respuestas'));
assert.equal(typeof node('restartTop').onclick,'function');
run('state=null;restore();startScreen()');assert.equal(run('state.done'),true);assert.equal(run('view'),'results');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'assets/audio/manifest.json'),'utf8'));
assert.equal(manifest.voice,'af_heart');assert.equal(manifest.clips.length,14);
for(const clip of manifest.clips){const data=fs.readFileSync(path.join(root,'assets/audio',clip.id+'.wav'));assert.equal(data.toString('ascii',0,4),'RIFF');assert(clip.seconds>0.5);}
const previous=JSON.parse(stored);previous.orderings['t2-match']=['b','g','j'];stored=JSON.stringify(previous);
run('state=null;restore();startScreen()');assert.equal(run('state.done'),true);assert.equal(run('state.index'),44);
assert.deepEqual(JSON.parse(run('JSON.stringify(state.orderings["t2-match"].slice().sort())')),['I have thirty books.','I would like to travel.','My sister is a student.']);
node('restartTop').onclick();assert.equal(run('state'),null);assert.equal(stored,null);assert(node('app').innerHTML.includes('startForm'));
console.log('PASS: 45 sequential steps; previous answers locked; complete-only result/PDF/restart; resume and bank migration; 14 Heart WAVs.');
