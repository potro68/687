const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){
  const setOpen=(open)=>{
    nav.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  };
  toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
}

/* 10/11: on phones, long detail lists open on tap */
(function(){if(!window.matchMedia||!matchMedia('(max-width:700px)').matches)return;
var it=(document.documentElement.lang||'').indexOf('it')===0;
document.querySelectorAll('.detail-points').forEach(function(el){if(el.children.length<4)return;
el.classList.add('dp-collapsed');var b=document.createElement('button');b.type='button';b.className='dp-more';
b.textContent=it?'Mostra tutti i dettagli ▾':'Show all details ▾';
b.addEventListener('click',function(){var c=el.classList.toggle('dp-collapsed');b.textContent=c?(it?'Mostra tutti i dettagli ▾':'Show all details ▾'):(it?'Mostra meno ▴':'Show less ▴');});
el.after(b);});})();
