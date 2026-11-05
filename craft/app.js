let language='zh';
const videos=[...document.querySelectorAll('video')];
videos.forEach((video,i)=>{
 video.muted=true;video.autoplay=true;video.loop=true;
 video.tabIndex=0;video.setAttribute('aria-label',i===0?'K-Cut 工作流：点击暂停或播放':'视频书签：点击暂停或播放');
 const start=()=>video.play().catch(()=>{video.controls=true;});
 video.addEventListener('loadeddata',start,{once:true});start();
 video.addEventListener('click',()=>{if(video.paused)start();else video.pause();});
 video.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(video.paused)start();else video.pause();}});
});
document.getElementById('language').addEventListener('click',()=>{language=language==='zh'?'en':'zh';document.documentElement.lang=language==='zh'?'zh-CN':'en';document.querySelectorAll('[data-zh]').forEach(n=>n.textContent=n.dataset[language]);const b=document.getElementById('language');b.textContent=language==='zh'?'EN':'中文';b.setAttribute('aria-label',language==='zh'?'Switch to English':'切换为中文');videos[0].setAttribute('aria-label',language==='zh'?'K-Cut 工作流：点击暂停或播放':'K-Cut Workflow: click to pause or play');videos[1].setAttribute('aria-label',language==='zh'?'视频书签：点击暂停或播放':'Video Bookmarks: click to pause or play');});
const sources={zh:['assets/k-cut-subject-zh.mp4','assets/annotation-subject.mp4'],en:['assets/k-cut-subject-en.mp4','assets/annotation-en.mp4']};
document.getElementById('language').addEventListener('click',()=>{
 videos.forEach((video,i)=>{
  video.pause();video.src=sources[language][i];video.muted=true;video.controls=false;video.load();
  video.play().catch(()=>{video.controls=true;});
 });
});
document.getElementById('language').addEventListener('click',()=>{document.querySelector('.production-link').href='../video-bookmarks/?lang='+language;});
