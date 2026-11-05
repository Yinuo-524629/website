const gallery=document.getElementById('gallery');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let language=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh';
const pages=Array.from({length:9},(_,i)=>[1,i+2]);
gallery.innerHTML=pages.map(([book,page],i)=>`<figure class="page ${book===2&&page===1?'collection-two':''}" data-book="${book}" data-page="${page}"><img src="assets/watermarked/brochure-${book}-${String(page).padStart(2,'0')}.jpg" alt="" draggable="false" ${i<3?'fetchpriority="high"':'loading="lazy"'}><span class="frost soft" aria-hidden="true"></span><span class="frost outer" aria-hidden="true"></span><span class="frost edges" aria-hidden="true"></span>${book===1&&page===1?'<span class="frost cover" aria-hidden="true"></span>':''}</figure>`).join('');
function translate(){const en=language==='en';document.documentElement.lang=en?'en':'zh-CN';document.title=en?'IRIS — Brochures':'IRIS — 宣传册';document.querySelector('h1').textContent=en?'Brochures':'宣传册';document.getElementById('role').textContent=en?'[Brochure Production]':'[宣传册制作]';document.getElementById('language').textContent=en?'中文':'EN';document.getElementById('language').setAttribute('aria-label',en?'切换为中文':'Switch to English');document.querySelector('.back').setAttribute('aria-label',en?'Back to projects':'返回项目经历');gallery.setAttribute('aria-label',en?'Brochure gallery. Drag or use the arrow keys to browse.':'宣传册，拖动或使用左右方向键横向浏览');gallery.querySelectorAll('figure').forEach(f=>f.querySelector('img').alt=en?`Brochure ${f.dataset.book}, page ${f.dataset.page}`:`宣传册${f.dataset.book}，第${f.dataset.page}页`);}
document.getElementById('language').addEventListener('click',()=>{language=language==='zh'?'en':'zh';translate();});
gallery.addEventListener('wheel',e=>{if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();gallery.scrollLeft+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?gallery.clientWidth:1);},{passive:false});
let drag=null;
gallery.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,left:gallery.scrollLeft,target:e.target.closest('.page')||gallery,moved:false};});
gallery.addEventListener('pointermove',e=>{if(!drag)return;if(!drag.moved&&Math.abs(e.clientX-drag.x)>8){drag.moved=true;drag.target.setPointerCapture(e.pointerId);gallery.classList.add('dragging');}if(drag.moved)gallery.scrollLeft=drag.left+drag.x-e.clientX;});
function release(){drag=null;gallery.classList.remove('dragging');}
gallery.addEventListener('pointerup',release);gallery.addEventListener('pointercancel',release);gallery.addEventListener('lostpointercapture',release);
gallery.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();gallery.scrollTo({left:e.key==='Home'?0:e.key==='End'?gallery.scrollWidth:gallery.scrollLeft+(e.key==='ArrowRight'?1:-1)*gallery.clientWidth*.7,behavior:reduced.matches?'instant':'smooth'});});
translate();

let unlocked=false;
gallery.querySelectorAll('.page').forEach((page,index)=>{
 page.tabIndex=0;page.setAttribute('role','button');page.setAttribute('aria-expanded','false');
 const toggle=()=>{
  if(page.classList.contains('revealed')){page.classList.remove('revealed');page.setAttribute('aria-expanded','false');return;}
  if(index>=3&&!unlocked){pending=page;dialog.showModal();code.value='';error.textContent='';code.focus();return;}
  page.classList.add('revealed');page.setAttribute('aria-expanded','true');
 };
 page.addEventListener('click',()=>{if(!didDrag)toggle();});
 page.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});
let didDrag=false,downX=0;
gallery.addEventListener('pointerdown',e=>{didDrag=false;downX=e.clientX;});
gallery.addEventListener('pointermove',e=>{if(e.buttons&&Math.abs(e.clientX-downX)>8)didDrag=true;});
let pending=null;
const dialog=document.createElement('dialog');
dialog.innerHTML='<form><label for="access-code">Code</label><input id="access-code" type="password" inputmode="numeric" autocomplete="off" required><p class="error" aria-live="polite"></p><div><button type="button" class="cancel">Cancel</button><button type="submit">Unlock</button></div></form>';
document.body.append(dialog);
const code=dialog.querySelector('input'),error=dialog.querySelector('.error');
dialog.querySelector('.cancel').onclick=()=>dialog.close();
dialog.querySelector('form').onsubmit=e=>{e.preventDefault();if(code.value==='524629'){unlocked=true;pending.classList.add('revealed');pending.setAttribute('aria-expanded','true');dialog.close();pending.focus();}else{error.textContent=language==='zh'?'密码不正确':'Incorrect code';code.select();}};
