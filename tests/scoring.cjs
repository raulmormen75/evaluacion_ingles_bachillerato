const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const c=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(path.join(root,'questions.js'),'utf8'),c);
const questions=c.window.QUESTIONS;
const scoring=require('../scoring.js');
assert.equal(questions.length,45);
assert.equal(new Set(questions.map(q=>q.id)).size,45);
for(let topic=1;topic<=5;topic++){
 const subset=questions.filter(q=>q.topic===topic);
 assert.equal(subset.length,9);
 assert.equal(new Set(subset.map(q=>q.type)).size,9);
}
for(const q of questions){
 const answer=q.pairs?Object.fromEntries(q.pairs.map((p,i)=>[i,p[1]])):q.items?Object.fromEntries(q.items.map((p,i)=>[i,p.category])):q.tokens?q.tokens.map((_,i)=>i):q.answers?.[0]??q.answer;
 assert.equal(scoring.grade(q,answer),1,q.id);
 assert.equal(scoring.complete(q,answer),true,q.id);
 assert.equal(scoring.grade(q,undefined),0,q.id+' empty');
 assert.equal(scoring.complete(q,undefined),false,q.id+' empty');
}
const q=questions.find(q=>q.id==='t5-dictation');
assert.equal(scoring.grade(q,'  I’m from Mexico.  '),1);
assert.equal(scoring.grade(q,'I from Mexico'),0);
const m=questions.find(q=>q.type==='match');
assert.equal(scoring.grade(m,{0:m.pairs[0][1]}),1/m.pairs.length);
assert.equal(scoring.equivalent("I'm",'I am'),false,'Only explicitly approved contractions');
const greeting=questions.find(q=>q.id==='t1-short');
for(const answer of ['Good morning!', 'Good morning, Eva.'])assert.equal(scoring.grade(greeting,answer),1);
for(const answer of ['My name is Eva','Good night'])assert.equal(scoring.grade(greeting,answer),0);
const age=questions.find(q=>q.id==='t4-short');
for(const answer of ['He’s twenty years old.', 'Luis is 20.'])assert.equal(scoring.grade(age,answer),1);
for(const answer of ['I am twenty','He is twelve'])assert.equal(scoring.grade(age,answer),0);
assert(questions.every(q=>!q.prompt.includes('Tu personaje')));
const spelling=questions.find(q=>q.id==='t2-match');
const wordDictation=questions.find(q=>q.id==='t2-dictation');
const schoolListening=questions.find(q=>q.id==='t2-listening');
assert.equal(scoring.grade(schoolListening,'A ruler'),1);
assert.equal(scoring.grade(schoolListening,'An eraser'),0);
assert.equal(scoring.grade(schoolListening,'A backpack'),0);
for(const answer of ['apple book dog','Apple, book, dog.','apple\nbook\ndog'])assert.equal(scoring.grade(wordDictation,answer),1);
for(const answer of ['dog apple book','apple book','pencil'])assert.equal(scoring.grade(wordDictation,answer),0);
assert.equal(scoring.grade(wordDictation,'BED'),0);
assert.equal(scoring.grade(spelling,{0:'Jane',1:'Sara',2:'Mike'}),1);
assert.equal(scoring.grade(spelling,{0:'Jean',1:'Sarah',2:'Nick'}),0);
assert.equal(scoring.grade(spelling,{0:'Jane',1:'Sarah',2:'Mike'}),2/3);
spelling.audioPairs.forEach((clip,i)=>assert(clip.choices.includes(spelling.pairs[i][1])));
for(const [id,good,bad] of [['t2-short','name new nice','name nice new'],['t3-fill','student','studant'],['t4-choice','13 y 30','30 y 13']]){
 const item=questions.find(q=>q.id===id);assert.equal(scoring.grade(item,good),1);assert.equal(scoring.grade(item,bad),0);
}
console.log('PASS: 45 questions, nine formats per topic, correct/blank answers, contractions and partial credit.');
