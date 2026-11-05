(()=>{
 const root=document.documentElement,script=document.currentScript;
 const base=new URL(script.dataset.siteBase||'./',script.src);
 let mode='light';try{mode=localStorage.getItem('iris-theme')||'light';}catch{}
 const requested=new URLSearchParams(location.search).get('theme');if(['dark','light'].includes(requested))mode=requested;
 root.dataset.theme=mode;
 function save(dark){root.dataset.theme=dark?'dark':'light';try{localStorage.setItem('iris-theme',root.dataset.theme);}catch{}if(document.querySelector('#world'))document.body.classList.toggle('dark',dark);const b=document.querySelector('.site-dock button');if(b){const path=b.querySelector('path');if(path)path.setAttribute('d',dark?'M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z':'M12 4V1m0 22v-3M4 12H1m22 0h-3M5 5 3 3m18 18-2-2M5 19l-2 2M21 3l-2 2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0');b.setAttribute('aria-pressed',String(dark));b.setAttribute('data-tip',root.lang.startsWith('en')?'Toggle theme':'切换明暗模式');}}
 function initialize(){
  document.querySelectorAll('.site-dock').forEach(el=>el.remove());
  document.querySelectorAll('.page-theme,.dock').forEach(el=>el.remove());
  document.querySelectorAll('.viewport-blur').forEach(el=>el.remove());
  if(!document.querySelector('#world')){
   for(const edge of ['top','bottom']){const veil=document.createElement('div');veil.className='viewport-blur viewport-blur--'+edge;veil.setAttribute('aria-hidden','true');for(let i=0;i<4;i++)veil.append(document.createElement('span'));document.body.append(veil);}
  }
  const nav=document.createElement('nav');nav.className='site-dock';nav.setAttribute('aria-label','主导航 / Main navigation');document.body.append(nav);
  const paths=['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21v-2a8 6 0 0 1 16 0v2','M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8','M5 8 12 4l7 4-7 4-7-4m0 0v7l7 4 7-4V8M12 12v7','M8 7V4h8v3M3 7h18v14H3zM3 12h18M10 12v3h4v-3','m9 4 1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4m9 9 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3','M12 4V1m0 22v-3M4 12H1m22 0h-3M5 5 3 3m18 18-2-2M5 19l-2 2M21 3l-2 2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0'];
  [paths[0],paths[1]]=[paths[1],paths[0]];
  function render(){const en=root.lang.startsWith('en');document.querySelectorAll('header .brand,header .wordmark').forEach(el=>{el.textContent=en?'IRIS':'Yinuo';el.setAttribute('aria-label',el.textContent);});
   const labels=en?['Home','About','Education','Projects','Vibe Coding','Toggle theme']:['主页','自我介绍','教育经历','项目经历','Vibe Coding','切换明暗模式'];
   const urls=['home/','about/','experience/index.html','index.html','craft/'];
   nav.innerHTML=labels.map((label,i)=>`${i===5?'<i class="site-divider" aria-hidden="true"></i>':''}<span class="dock-slot">${i<5?'<a href="'+new URL(urls[i],base).href+'"':'<button type="button"'} aria-label="${label}" data-tip="${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[i]}"/></svg></${i<5?'a':'button'}></span>`).join('');
   nav.querySelector('button').onclick=()=>save(root.dataset.theme!=='dark');save(root.dataset.theme==='dark');
  }
  function reset(){nav.querySelectorAll('.dock-slot>*').forEach(el=>{el.style.setProperty('--lift','0px');el.style.setProperty('--scale','1');});}
  function magnify(x){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;nav.querySelectorAll('.dock-slot').forEach(slot=>{const r=slot.getBoundingClientRect(),power=Math.exp(-Math.pow((x-r.left-r.width/2)/95,2)),el=slot.firstElementChild;el.style.setProperty('--lift',(-power*12)+'px');el.style.setProperty('--scale',String(1+power*.32));});}
  nav.addEventListener('click',event=>{
   const control=event.target.closest('.dock-slot>a,.dock-slot>button');if(!control||event.button>0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
   control.classList.remove('dock-tapped');void control.offsetWidth;control.classList.add('dock-tapped');
   control.addEventListener('animationend',()=>control.classList.remove('dock-tapped'),{once:true});
   if(control.tagName==='A'&&!event.defaultPrevented){event.preventDefault();setTimeout(()=>{location.href=control.href;},340);}
  });
  nav.addEventListener('pointermove',e=>{if(e.pointerType==='mouse')magnify(e.clientX);});nav.addEventListener('pointerleave',reset);nav.addEventListener('focusin',e=>{const r=e.target.getBoundingClientRect();magnify(r.left+r.width/2);});nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget))reset();});
  let preferred=new URLSearchParams(location.search).get('lang');try{preferred=localStorage.getItem('iris-language')||preferred;}catch{}
  if(['zh','en'].includes(preferred)&&root.lang.startsWith('en')!==(preferred==='en'))document.querySelector('#language')?.click();
  function syncLanguage(){try{localStorage.setItem('iris-language',root.lang.startsWith('en')?'en':'zh');}catch{}render();}
  syncLanguage();new MutationObserver(syncLanguage).observe(root,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link)return;const target=new URL(link.href,location.href);if(target.origin!==location.origin)return;const normalized=p=>p.replace(/index\.html$/,'').replace(/\/$/,'');if(link.closest('.site-dock')&&normalized(target.pathname)===normalized(location.pathname)){event.preventDefault();return;}if(target.pathname===location.pathname)return;target.searchParams.set('theme',root.dataset.theme);target.searchParams.set('lang',root.lang.startsWith('en')?'en':'zh');link.href=target.href;},true);
  addEventListener('pageshow',()=>{try{save(localStorage.getItem('iris-theme')==='dark');}catch{}});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});else initialize();
 addEventListener('storage',e=>{if(e.key==='iris-language'&&['zh','en'].includes(e.newValue)&&root.lang.startsWith('en')!==(e.newValue==='en'))document.querySelector('#language')?.click();if(e.key==='iris-theme')save(e.newValue==='dark');});
})();
