let lang='zh',sound=true,x=0,y=0,zoom=1,drag=null,audio;
const icons={home:'M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8',craft:'m9 4 1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4m9 9 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3',projects:'M8 7V4h8v3M3 7h18v14H3zM3 12h18M10 12v3h4v-3',awards:'M8 3h8v9l-4 3-4-3V3M8 5H4v4l4 3m8-7h4v4l-4 3m-4 3v5m-4 1h8',photos:'M3 7h5l2-3h4l2 3h5v14H3zM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',github:'M8 20v-3c-4 1-4-2-5-2m5 2c-5-2-5-9 0-10L7 3l5 2 5-2-1 4c5 1 5 8 0 10v4',mail:'M3 5h18v14H3zM3 6l9 7 9-7',theme:'M12 4v-3m0 22v-3M4 12H1m22 0h-3M5 5 3 3m18 18-2-2M5 19l-2 2M21 3l-2 2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',sound:'M3 9h4l5-5v16l-5-5H3zM16 8q5 4 0 8m3-11q8 7 0 14'};
const items=[['home','#','个人介绍','About'],['awards','../../experience/index.html','求学经历','Education'],['projects','../index.html','项目经历','Projects'],['craft','../craft/','Vibe Coding','Vibe Coding'],['divider'],['theme',null,'切换明暗模式','Toggle theme'],['sound',null,'声音','Sound']];
function render(){const name=lang==='zh'?'YINUO':'IRIS';document.title=name;document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelector('.letters').innerHTML=[...name].map(c=>`<span>${c}</span>`).join('');document.querySelector('.letters').setAttribute('aria-label',name);document.getElementById('language').textContent=lang==='zh'?'EN':'中文';}
function update(){document.querySelector('.plane').style.setProperty('--rx',`${35+y}deg`);document.querySelector('.plane').style.setProperty('--rz',`${-13+x}deg`);}
document.getElementById('language').onclick=()=>{lang=lang==='zh'?'en':'zh';render();};

const viewport=document.getElementById('viewport');viewport.onpointerdown=e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,ox:x,oy:y};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');};viewport.onpointermove=e=>{if(!drag)return;x=Math.max(-9,Math.min(9,drag.ox+(e.clientX-drag.x)*.025));y=Math.max(-8,Math.min(8,drag.oy+(e.clientY-drag.y)*.025));update();};viewport.onpointerup=viewport.onpointercancel=()=>{drag=null;viewport.classList.remove('dragging');};viewport.ondblclick=()=>{x=y=0;zoom=1;update();};viewport.addEventListener('wheel',e=>{e.preventDefault();},{passive:false});function size(){document.getElementById('size').textContent=`${innerWidth}×${innerHeight}`;}window.addEventListener('resize',size);size();render();

const grid=document.querySelector('.grid');grid.setAttribute('aria-hidden','true');
grid.innerHTML=Array.from({length:1440},(_,i)=>`<div class="cell" data-cell="${i}"></div>`).join('');
const colors=['#0099ff','#f2cf37','#31aa75','#9861da'];let lastCell=-1,lastNote=0;
const activeNotes=new Set();
function stopNotes(){activeNotes.forEach(o=>{try{o.stop();}catch{}});activeNotes.clear();}
let lastPitch=-1,noteBag=[];
function nextPitch(){
 if(!noteBag.length){
  noteBag=Array.from({length:24},(_,i)=>i);
  for(let i=noteBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[noteBag[i],noteBag[j]]=[noteBag[j],noteBag[i]];}
  if(noteBag[noteBag.length-1]===lastPitch)[noteBag[0],noteBag[noteBag.length-1]]=[noteBag[noteBag.length-1],noteBag[0]];
 }
 lastPitch=noteBag.pop();return lastPitch;
}
const pianoFiles=["INSPiano_Vel03_A4_01.ogg","INSPiano_Vel03_A5_01.ogg","INSPiano_Vel03_As4_01.ogg","INSPiano_Vel03_As5_01.ogg","INSPiano_Vel03_B4_01.ogg","INSPiano_Vel03_B5_01.ogg","INSPiano_Vel03_C4_01.ogg","INSPiano_Vel03_C5_01.ogg","INSPiano_Vel03_Cs4_01.ogg","INSPiano_Vel03_Cs5_01.ogg","INSPiano_Vel03_D4_01.ogg","INSPiano_Vel03_D5_01.ogg","INSPiano_Vel03_Ds4_01.ogg","INSPiano_Vel03_Ds5_01.ogg","INSPiano_Vel03_E4_01.ogg","INSPiano_Vel03_E5_01.ogg","INSPiano_Vel03_F4_01.ogg","INSPiano_Vel03_F5_01.ogg","INSPiano_Vel03_Fs4_01.ogg","INSPiano_Vel03_Fs5_01.ogg","INSPiano_Vel03_G4_01.ogg","INSPiano_Vel03_G5_01.ogg","INSPiano_Vel03_Gs4_01.ogg","INSPiano_Vel03_Gs5_01.ogg"];
const pianoBuffers=new Map();let noteRequest=0;
async function piano(index){
 if(!sound||!audio)return;
 const request=++noteRequest;const file=pianoFiles[nextPitch()];
 try{
 if(!pianoBuffers.has(file))pianoBuffers.set(file,fetch('assets/piano/'+file).then(r=>{if(!r.ok)throw new Error('Sample unavailable');return r.arrayBuffer();}).then(b=>audio.decodeAudioData(b)));
 const buffer=await pianoBuffers.get(file);
 if(!sound||request!==noteRequest)return;
 stopNotes();const source=audio.createBufferSource(),gain=audio.createGain();source.buffer=buffer;source.connect(gain).connect(audio.destination);const now=audio.currentTime;gain.gain.setValueAtTime(.75,now);gain.gain.setValueAtTime(.75,now+1.25);gain.gain.exponentialRampToValueAtTime(.001,now+1.8);source.start();source.stop(now+1.85);activeNotes.add(source);source.onended=()=>activeNotes.delete(source);
 viewport.dataset.audioState='sample-playing';
 }catch(error){pianoBuffers.delete(file);viewport.dataset.audioState='load-error';}
}
viewport.addEventListener('pointerdown',()=>{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();});
const glowAnimations=new WeakMap();
grid.addEventListener('pointerover',e=>{
 const cell=e.target.closest('.cell');if(!cell||drag||cell.contains(e.relatedTarget))return;
 glowAnimations.get(cell)?.cancel();let glow=cell.querySelector('.cell-glow');if(!glow){glow=document.createElement('span');glow.className='cell-glow';cell.append(glow);}glow.style.background=colors[Number(cell.dataset.cell)%4];glow.style.opacity='.85';
});
grid.addEventListener('pointerout',e=>{
 const cell=e.target.closest('.cell');if(!cell||cell.contains(e.relatedTarget))return;const glow=cell.querySelector('.cell-glow');if(!glow)return;
 const animation=glow.animate([{opacity:.85},{opacity:0}],{duration:1100,easing:'ease-out'});glowAnimations.set(cell,animation);animation.onfinish=()=>{glow.remove();glowAnimations.delete(cell);};
});
document.querySelectorAll('.liquid:not(.s5)').forEach(tile=>{
 const video=tile.querySelector('video');let hovering=false,focused=false,tapped=false;
 video.muted=true;
 const update=()=>{const active=hovering||focused||tapped;tile.classList.toggle('active',active);if(active)video.play().catch(()=>{});else video.pause();};
 tile.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovering=true;update();}});
 tile.addEventListener('pointerleave',()=>{hovering=false;update();});
 tile.addEventListener('focus',()=>{focused=tile.matches(':focus-visible');update();});
 tile.addEventListener('blur',()=>{focused=false;tapped=false;update();});
 tile.addEventListener('pointerdown',e=>e.stopPropagation());
 tile.addEventListener('click',e=>{if(e.pointerType&&e.pointerType!=='mouse'){tapped=!tapped;update();}});
 tile.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tapped=!tapped;focused=false;update();}});
 video.addEventListener('loadeddata',()=>{if(!hovering&&!focused&&!tapped)video.pause();},{once:true});
});
const introAnimations=[];
function entrance(){
 introAnimations.forEach(a=>a.cancel());introAnimations.length=0;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const letters=[...document.querySelectorAll('.letters span')];
 letters.forEach((letter,i)=>introAnimations.push(letter.animate([{opacity:0,filter:'blur(7px)'},{opacity:1,filter:'blur(0px)'}],{duration:560,delay:i*140,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'})));
 document.querySelectorAll('.sheet').forEach((sheet,i)=>introAnimations.push(sheet.animate([{opacity:0,translate:'0 22px'},{opacity:1,translate:'0 0'}],{duration:650,delay:(letters.length-1)*140+560+i*110,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'})));
}
function fitScene(){
 const world=document.getElementById('world');world.style.transform='scale(1)';
 const rects=[...document.querySelectorAll('.letters,.sheet')].map(n=>n.getBoundingClientRect());
 const l=Math.min(...rects.map(r=>r.left)),r=Math.max(...rects.map(r=>r.right)),t=Math.min(...rects.map(r=>r.top)),b=Math.max(...rects.map(r=>r.bottom));
 const fit=Math.min((innerWidth-28)/(r-l),(innerHeight-80)/(b-t))*1.16;
 const dx=-((l+r)/2-innerWidth/2)*fit,dy=-18-((t+b)/2-innerHeight/2)*fit;
 world.style.transform=`translate(${dx}px,${dy}px) scale(${fit})`;
}
window.addEventListener('resize',fitScene);fitScene();entrance();
document.getElementById('language').addEventListener('click',entrance);
document.getElementById('language').addEventListener('click',fitScene);

viewport.addEventListener('click',async e=>{
 const cell=document.elementFromPoint(e.clientX,e.clientY)?.closest('.cell');if(!cell||!sound)return;
 audio??=new (window.AudioContext||window.webkitAudioContext)();await audio.resume();piano(Number(cell.dataset.cell));viewport.dataset.audioState=audio.state;viewport.dataset.lastNote=cell.dataset.cell;
});
document.getElementById('language').addEventListener('click',()=>{
 const tile=document.querySelector('.s2.liquid'),video=tile?.querySelector('video');if(!video)return;
 const active=tile.classList.contains('active');video.pause();video.src=lang==='zh'?'assets/k-cut-zh-v2.mp4#t=0.05':'assets/k-cut-en-v2.mp4#t=0.05';video.load();if(active)video.play().catch(()=>{});
});
document.querySelector('.dock').addEventListener('click',()=>{if(!sound)stopNotes();});document.addEventListener('visibilitychange',()=>{if(document.hidden)stopNotes();});


document.getElementById('language').addEventListener('click',()=>{
 const tile=document.querySelector('.annotation'),video=tile.querySelector('video');
 const active=tile.classList.contains('active');video.pause();video.src=lang==='zh'?'assets/annotation-decorated-zh.mp4#t=0.05':'assets/annotation-decorated-en.mp4#t=0.05';video.load();
 tile.setAttribute('aria-label',lang==='zh'?'视频批注演示，悬停或聚焦播放':'Video annotation demo. Hover or focus to play.');
 if(active)video.play().catch(()=>{});
});

const vinylTile=document.querySelector('.s5.liquid'),vinylVideo=vinylTile.querySelector('video');
function syncVinyl(){const file=document.documentElement.dataset.theme==='dark'?'vinyl-dark.mp4':'vinyl-light.mp4';if(vinylVideo.dataset.variant===file)return;vinylVideo.dataset.variant=file;vinylVideo.pause();vinylVideo.src='assets/'+file+'#t=0.05';vinylVideo.load();if(vinylTile.classList.contains('active'))vinylVideo.play().catch(()=>{});}
new MutationObserver(syncVinyl).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});syncVinyl();

window.addEventListener('site-sound-state',event=>{sound=!event.detail.muted;if(!sound){noteRequest++;stopNotes();}});

