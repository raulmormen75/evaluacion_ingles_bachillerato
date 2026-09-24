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
 assert.equal(new Set(subset.map(q=>q.type)).size,topic===4?8:9);
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
for(const answer of ['Good morning', 'Good morning!', 'Good morning, Eva', 'Good morning, Eva!', '¡Good morning!', '¡Good morning, Eva!'])assert.equal(scoring.grade(greeting,answer),1);
for(const answer of ['My name is Eva','Good night','¡Good night!','¡Good mourning!'])assert.equal(scoring.grade(greeting,answer),0);
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
assert.equal(scoring.grade(spelling,{0:'My sister is a student.',1:'I have thirty books.',2:'I would like to travel.'}),1);
assert.equal(scoring.grade(spelling,{0:'My brother is a student.',1:'I have thirteen books.',2:'I like to travel.'}),0);
assert.equal(scoring.grade(spelling,{0:'My sister is a student.',1:'I have forty books.',2:'I would like to travel.'}),2/3);
spelling.audioPairs.forEach((clip,i)=>assert(clip.choices.includes(spelling.pairs[i][1])));
spelling.audioPairs.forEach((clip,i)=>assert.equal(clip.text,spelling.pairs[i][1]));
for(const [id,good,bad] of [['t2-short','name new nice','name nice new'],['t3-fill','thirteen, forty, eighteen','thirteen fourty eighteen'],['t4-choice','13 y 30','30 y 13']]){
 const item=questions.find(q=>q.id===id);assert.equal(scoring.grade(item,good),1);assert.equal(scoring.grade(item,bad),0);
}
const numberWords=questions.find(q=>q.id==='t3-fill');
assert.equal(scoring.grade(numberWords,'Thirteen, forty, eighteen.'),1);
assert.equal(scoring.grade(numberWords,'thirteen forty eighteen'),1);
assert.equal(scoring.grade(numberWords,'thirteen forty'),0);
assert.equal(scoring.grade(numberWords,'eighteen forty thirteen'),0);
const largeNumber=questions.find(q=>q.id==='t4-correction');
for(const answer of ['One million fourteen thousand nine hundred twenty-six.', 'one million, fourteen thousand, nine hundred and twenty six'])assert.equal(scoring.grade(largeNumber,answer),1);
for(const answer of ['1014926','one million fourteen thousand nine hundred twenty five','fourteen thousand nine hundred twenty six'])assert.equal(scoring.grade(largeNumber,answer),0);
console.log('PASS: 45 questions, nine exercises per topic, correct/blank answers, contractions and partial credit.');

for(const id of ['t2-dictation','t2-short','t3-fill']){
 const item=questions.find(q=>q.id===id);assert.equal(item.wordList,true);
 const words=item.answers[0].split(' ');
 for(const separator of [' ', ', ', ',', '  ', '\n', ' ,  '])assert.equal(scoring.grade(item,words.join(separator)),1,id+' separator '+JSON.stringify(separator));
 assert.equal(scoring.grade(item,words.slice().reverse().join(', ')),0,id+' wrong order');
 assert.equal(scoring.grade(item,words.slice(0,-1).join(', ')),0,id+' missing word');
 assert.equal(scoring.grade(item,[...words,'extra'].join(', ')),0,id+' extra word');
}
console.log('PASS: all written word lists accept spaces and commas while checking order and completeness.');

const musicSentence=questions.find(q=>q.id==='t3-listening');
assert.equal(musicSentence.audio,'I like music, but my sister likes movies.');
assert.equal(scoring.grade(musicSentence,'Music'),1);
for(const wrong of ['Movies','Sports'])assert.equal(scoring.grade(musicSentence,wrong),0);
