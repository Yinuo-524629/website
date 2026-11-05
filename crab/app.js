const gallery = document.getElementById('gallery');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let language = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'zh';
const images = [
  ['图片1.png',1.02,80],['图片2.png',.563,64],['图片3.png',1.024,80],
  ['图片4.png',.563,64],['图片5.png',.563,64],['图片6.png',.563,64],
  ['宣传图2.jpg',.85,68],['螃蟹1.jpg',.65,66]
];
gallery.innerHTML = images.map(([src,ratio,mobile],i) => `<button type="button" class="image-card" aria-pressed="false" style="--ratio:${ratio};--mobile-width:${mobile}" data-index="${i}"><span class="turner" aria-hidden="true"><span class="face front"><img src="assets/${src}" alt="" draggable="false" ${i < 2 ? 'fetchpriority="high"' : 'loading="lazy"'}></span><span class="face rear"><span class="qr"><img src="assets/小程序.png" alt="" draggable="false"><span class="qr-label" data-label="mini"></span></span><span class="qr"><img src="assets/微信公众号.jpg" alt="" draggable="false"><span class="qr-label" data-label="account"></span></span></span></span></button>`).join('');
const cards = [...gallery.querySelectorAll('.image-card')];
const animations = new Map();
const labels = {
  zh:{title:'陈氏蟹业',role:'[运营负责人]',back:'返回项目经历',switch:'Switch to English',gallery:'陈氏蟹业图片，拖动或方向键横向浏览，点击图片翻看二维码',mini:'小程序',account:'服务号',show:i=>`图片 ${i}：显示小程序和服务号二维码`,hide:i=>`图片 ${i}：二维码已显示，点击返回图片`},
  en:{title:'Chen Shi Crab',role:'[Operations Lead]',back:'Back to projects',switch:'切换为中文',gallery:'Chen Shi Crab gallery. Drag or use arrow keys to browse. Activate an image to show QR codes.',mini:'Mini Program',account:'Service Account',show:i=>`Image ${i}: show Mini Program and Service Account QR codes`,hide:i=>`Image ${i}: QR codes shown. Activate to return to the image`}
};
function updateCardLabel(card){const t=labels[language];card.setAttribute('aria-label',(card.classList.contains('flipped')?t.hide:t.show)(Number(card.dataset.index)+1));}
function setLanguage(){
  const t = labels[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = `IRIS — ${t.title}`;
  document.querySelector('h1').textContent = t.title;
  document.getElementById('role').textContent = t.role;
  document.querySelector('.back').setAttribute('aria-label',t.back);
  document.getElementById('language').textContent = language === 'zh' ? 'EN' : '中文';
  document.getElementById('language').setAttribute('aria-label',t.switch);
  gallery.setAttribute('aria-label',t.gallery);
  gallery.querySelectorAll('[data-label]').forEach(node=>node.textContent=t[node.dataset.label]);
  cards.forEach(updateCardLabel);
}
function flip(card){
  if(animations.has(card)) return;
  const wasFlipped=card.classList.contains('flipped');
  card.classList.toggle('flipped');
  card.setAttribute('aria-pressed',String(!wasFlipped));
  updateCardLabel(card);
  if(reduce.matches) return;
  const start=wasFlipped?180:0,end=wasFlipped?0:180;
  const animation=card.querySelector('.turner').animate([
    {transform:`rotateY(${start}deg)`,offset:0},
    {transform:`rotateY(${start}deg)`,offset:.18},
    {transform:`rotateY(${(start+end)/2}deg)`,offset:.55},
    {transform:`rotateY(${end}deg)`,offset:1}
  ],{duration:720,easing:'cubic-bezier(.3,.05,.2,1)'});
  const blurs=[...card.querySelectorAll('.face')].map(face=>face.animate([{filter:'blur(0px)',offset:0},{filter:'blur(5px)',offset:.18},{filter:'blur(3px)',offset:.55},{filter:'blur(0px)',offset:1}],{duration:720,easing:'cubic-bezier(.3,.05,.2,1)'}));
  animations.set(card,[animation,...blurs]);
  animation.onfinish=()=>animations.delete(card);
}
let drag=null,suppressClick=false;
gallery.addEventListener('pointerdown',e=>{
  suppressClick=false;
  if(e.pointerType!=='mouse'||e.button!==0) return;
  drag={x:e.clientX,left:gallery.scrollLeft,target:e.target.closest('.image-card')||gallery,moved:false};
});
gallery.addEventListener('pointermove',e=>{
  if(!drag) return;
  if(!drag.moved&&Math.abs(e.clientX-drag.x)>8){drag.moved=true;drag.target.setPointerCapture(e.pointerId);gallery.classList.add('dragging');}
  if(drag.moved){e.preventDefault();gallery.scrollLeft=drag.left+drag.x-e.clientX;}
});
function endDrag(){if(drag?.moved)suppressClick=true;drag=null;gallery.classList.remove('dragging');}
gallery.addEventListener('pointerup',endDrag);
gallery.addEventListener('pointercancel',endDrag);
gallery.addEventListener('lostpointercapture',endDrag);
gallery.addEventListener('click',e=>{
  if(suppressClick&&e.detail!==0){e.preventDefault();suppressClick=false;return;}
  const card=e.target.closest('.image-card');if(card)flip(card);
});
gallery.addEventListener('wheel',e=>{
  if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||gallery.scrollWidth<=gallery.clientWidth)return;
  e.preventDefault();gallery.scrollLeft+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?gallery.clientWidth:1);
},{passive:false});
gallery.addEventListener('keydown',e=>{
  if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
  e.preventDefault();
  const direction=e.key==='ArrowRight'?1:-1;
  gallery.scrollTo({left:e.key==='Home'?0:e.key==='End'?gallery.scrollWidth:gallery.scrollLeft+gallery.clientWidth*.65*direction,behavior:reduce.matches?'instant':'smooth'});
});
reduce.addEventListener('change',()=>{if(reduce.matches){animations.forEach(list=>list.forEach(a=>a.cancel()));animations.clear();}});
document.getElementById('language').addEventListener('click',()=>{language=language==='zh'?'en':'zh';setLanguage();});
setLanguage();
