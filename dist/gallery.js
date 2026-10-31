(()=>{
const videos=window.EDITED_VIDEOS,grid=document.querySelector('#video-grid'),filters=document.querySelector('#video-filters'),roles=document.querySelector('#role-filters');
let role='all',selected='All projects',page=0;
const groups=['All projects','Film songs','Songs & music videos','Devotional songs','Trailers & teasers','Production films','More edits'];
const mobile=matchMedia('(max-width:600px)'),tablet=matchMedia('(max-width:900px)');
function render(){
const size=mobile.matches?2:tablet.matches?4:6;
const scoped=videos.filter(v=>role==='all'||v.role===role),matches=scoped.filter(v=>selected==='All projects'||v.category===selected),pages=Math.max(1,Math.ceil(matches.length/size));page=Math.min(page,pages-1);
document.querySelector('#role-description').textContent=role==='production'?'Our productions: filmed and edited by Bright Scene Studioz.':role==='editing'?'Selected client projects edited by Neeraj Sachdeva.':'Selected productions and editing projects.';
for(const b of roles.children){b.classList.toggle('active',b.dataset.role===role);b.setAttribute('aria-pressed',String(b.dataset.role===role));}
for(const b of filters.children){const n=scoped.filter(v=>b.dataset.group==='All projects'||v.category===b.dataset.group).length;b.hidden=!n;b.textContent=b.dataset.group;b.classList.toggle('active',b.dataset.group===selected);b.setAttribute('aria-pressed',String(b.dataset.group===selected));}
grid.replaceChildren();for(const v of matches.slice(page*size,(page+1)*size)){const a=document.createElement('a');a.className='video-card';a.href='https://www.youtube.com/watch?v='+v.id;a.target='_blank';a.rel='noopener noreferrer';const visual=document.createElement('div');visual.className='video-thumb';const img=document.createElement('img');img.src='https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg';img.alt=v.title;img.loading='lazy';const play=document.createElement('span');play.textContent='▶';visual.append(img,play);const tag=document.createElement('small');tag.textContent=(v.role==='production'?'PRODUCTION · ':'EDITING · ')+v.category;const title=document.createElement('h3');title.textContent=v.title;const link=document.createElement('p');link.textContent='Watch on YouTube ↗';a.append(visual,tag,title,link);grid.append(a);}
document.querySelector('#video-count').textContent=matches.length+' projects';document.querySelector('#page-status').textContent=`${page+1} / ${pages}`;document.querySelector('#prev-videos').disabled=page===0;document.querySelector('#next-videos').disabled=page===pages-1;
}
for(const [value,label] of [['all','All work'],['production','Our productions'],['editing','Editing portfolio']]){const b=document.createElement('button');b.type='button';b.dataset.role=value;b.textContent=label;b.onclick=()=>{role=value;selected='All projects';page=0;render();};roles.append(b);}
for(const group of groups){const b=document.createElement('button');b.type='button';b.dataset.group=group;b.onclick=()=>{selected=group;page=0;render();};filters.append(b);}
document.querySelector('#prev-videos').onclick=()=>{page--;render();};document.querySelector('#next-videos').onclick=()=>{page++;render();};mobile.addEventListener('change',()=>{page=0;render();});tablet.addEventListener('change',()=>{page=0;render();});render();
})();
