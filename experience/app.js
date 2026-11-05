history.scrollRestoration='manual';
const entries = [
 {y:'2026',m:'11',date:'2026.11',zh:{kind:'奖学金',title:'浙江省政府奖学金',meta:'2025—2026 学年'},en:{kind:'Scholarship',title:'Zhejiang Provincial Government Scholarship',meta:'Academic year 2025–2026'}},
 {y:'2025',m:'10',date:'2025.10.23',zh:{kind:'奖学金',title:'浙江大学一等奖学金',meta:'2024—2025 学年'},en:{kind:'Scholarship',title:'Zhejiang University First-Class Scholarship',meta:'Academic year 2024–2025'}},
 {y:'2026',m:'10',date:'2026.10',zh:{kind:'奖学金',title:'浙江大学三等奖学金',meta:'2025—2026 学年'},en:{kind:'Scholarship',title:'Zhejiang University Third-Class Scholarship',meta:'Academic year 2025–2026'}},
 {y:'2026',m:'10',date:'2026.10.13',zh:{kind:'荣誉',title:'浙江大学学业优秀标兵',meta:'2025—2026 学年'},en:{kind:'Honor',title:'Zhejiang University Academic Excellence Exemplar',meta:'Academic year 2025–2026'}},
 {y:'2025',m:'10',date:'2025.10.23',zh:{kind:'奖学金',title:'国家奖学金',meta:'2024—2025 学年'},en:{kind:'Scholarship',title:'National Scholarship',meta:'Academic year 2024–2025'}},
 {y:'2025',m:'10',date:'2025.10.12',zh:{kind:'荣誉',title:'浙江大学优秀学生',meta:'2024—2025 学年'},en:{kind:'Honor',title:'Zhejiang University Outstanding Student',meta:'Academic year 2024–2025'}},
 {y:'2025',m:'10',date:'2025.10.09',zh:{kind:'荣誉',title:'浙江大学学业优秀标兵',meta:'2024—2025 学年'},en:{kind:'Honor',title:'Zhejiang University Academic Excellence Exemplar',meta:'Academic year 2024–2025'}},
 {y:'2025',m:'10',date:'2025.10.09',zh:{kind:'荣誉',title:'浙江大学对外交流标兵',meta:'2025—2026 学年'},en:{kind:'Honor',title:'Zhejiang University International Exchange Exemplar',meta:'Academic year 2025–2026'}},
 {y:'2024',m:'11',date:'2024.11.21',zh:{kind:'奖学金',title:'浙江大学三等奖学金',meta:'2023—2024 学年'},en:{kind:'Scholarship',title:'Zhejiang University Third-Class Scholarship',meta:'Academic year 2023–2024'}},
 {y:'2024',m:'10',date:'2024.10.11',zh:{kind:'荣誉',title:'浙江大学学业优秀标兵',meta:'2023—2024 学年'},en:{kind:'Honor',title:'Zhejiang University Academic Excellence Exemplar',meta:'Academic year 2023–2024'}},
 {y:'2023',m:'09',date:'2023.09',zh:{kind:'教育背景',title:'浙江大学',second:'教育学 · 本科在读',meta:''},en:{kind:'Education',title:'Zhejiang University',second:'Undergraduate studies in Education',meta:''}}
 ];
// Show education first and progress toward the latest honor.
entries.sort((a,b)=>(a.date.length===7?a.date+'.31':a.date).localeCompare(b.date.length===7?b.date+'.31':b.date));

entries.push({y:'2026',m:'11',terminal:true,zh:{title:'TBC'},en:{title:'TBC'}});

let lang='zh',pending=false,items=[];
const $=id=>document.getElementById(id), reduced=matchMedia('(prefers-reduced-motion: reduce)');
function setupDigits(id,count){$(id).replaceChildren(...Array.from({length:count},()=>{const d=document.createElement('span');d.className='digit';d.innerHTML='<span></span><span></span>';return d}));}
setupDigits('year',4);setupDigits('month',2);
function digits(id,from,to,t){[...$(id).children].forEach((d,i)=>{const [a,b]=d.children;a.textContent=from[i];b.textContent=to[i];const p=from[i]===to[i]?0:t;a.style.transform=`translateY(${-p*100}%)`;b.style.transform=`translateY(${(1-p)*100}%)`;b.style.visibility=from[i]===to[i]?'hidden':'visible';});}
function update(){pending=false;const line=innerHeight*(innerWidth<=700?.44:.5);const positions=items.map(el=>el.getBoundingClientRect().top+40);let i=0;for(let n=0;n<positions.length;n++){if(positions[n]<=line)i=n;}
 const j=Math.min(i+1,entries.length-1);const dist=positions[j]-line;let t=i===j?0:Math.max(0,Math.min(1,(110-dist)/110));t=reduced.matches?(t>=.5?1:0):t*t*(3-2*t);digits('year',entries[i].y,entries[j].y,t);digits('month',entries[i].m,entries[j].m,t);const active=t>=.5?j:i;document.querySelector('.date-lock').style.opacity=(entries[active].terminal||(entries[j].terminal&&positions[j]<line+140))?'0':'1';items.forEach((el,n)=>{el.classList.toggle('active',n===active);if(n===active)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current');});}
function requestUpdate(){if(!pending){pending=true;requestAnimationFrame(update)}}
function render(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=lang==='zh'?'IRIS — 教育经历':'IRIS — Education';$('page-label').textContent=lang==='zh'?'教育经历':'Education';$('language').textContent=lang==='zh'?'EN':'中文';$('language').setAttribute('aria-label',lang==='zh'?'Switch to English':'切换为中文');$('events').innerHTML=entries.map(e=>{const text=e[lang];return `<article class="event${e.terminal?' event-tbc':''}" aria-label="${e.terminal?'TBC':e.y+'.'+e.m}"><h2>${text.title}</h2>${text.second?`<p class="second">${text.second}</p>`:''}${text.meta?`<p class="meta">${text.meta}</p>`:''}</article>`;}).join('');items=[...document.querySelectorAll('.event')];requestUpdate();}
$('language').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';render()});addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',requestUpdate);reduced.addEventListener('change',requestUpdate);document.fonts.ready.then(requestUpdate);render();


addEventListener('pageshow',()=>{scrollTo(0,0);requestUpdate()});
