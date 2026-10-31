const connectDialog=document.querySelector('#connect-dialog');
for(const link of document.querySelectorAll('a[href="#contact"]'))link.addEventListener('click',e=>{e.preventDefault();connectDialog.showModal();});
connectDialog.querySelector('.dialog-close').onclick=()=>connectDialog.close();
connectDialog.addEventListener('click',e=>{if(e.target===connectDialog){const r=connectDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)connectDialog.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();
