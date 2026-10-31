// Google Drive's embedded preview has no public player API. Reload it with
// autoplay enabled after a short hover; the Drive player keeps its own controls.
document.querySelectorAll('.reel-card iframe').forEach(frame=>{
  const base=frame.src;
  let timer;
  const start=()=>{clearTimeout(timer);timer=setTimeout(()=>{
    const url=new URL(base);url.searchParams.set('autoplay','1');frame.src=url.toString();
  },900);};
  const stop=()=>{clearTimeout(timer);if(frame.src!==base)frame.src=base;};
  frame.addEventListener('pointerenter',start);
  frame.addEventListener('pointerleave',stop);
  frame.addEventListener('focus',start);
  frame.addEventListener('blur',stop);
});

// Muted, locally hosted clips allow hover previews without Drive iframe controls.
document.querySelectorAll('.microdrama-card').forEach(card=>{
  const video=card.querySelector('video'); let timer,active=false;
  function stop(){active=false;clearTimeout(timer);video.pause();if(video.readyState)video.currentTime=0;card.classList.remove('previewing');}
  function start(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;active=true;clearTimeout(timer);timer=setTimeout(async()=>{if(!video.getAttribute('src'))video.src=video.dataset.preview;video.muted=true;try{await video.play();if(!active){video.pause();return;}card.classList.add('previewing');}catch{card.classList.remove('previewing');}},600);}
  card.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')start();});card.addEventListener('pointerleave',stop);card.addEventListener('focus',start);card.addEventListener('blur',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  new MutationObserver(()=>{if(card.closest('[hidden]'))stop();}).observe(card.parentElement,{attributes:true,attributeFilter:['hidden']});
});
