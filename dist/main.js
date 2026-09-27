// A short brand intro; always release the page even if an asset fails.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('intro-loading')) return;
  let finishing = false;
  let deadline;
  function finish(immediate = false) {
    if (finishing) return;
    finishing = true;
    clearTimeout(deadline);
    document.removeEventListener('keydown', skipIntro);
    if (immediate) {
      root.classList.remove('intro-loading', 'intro-finishing');
      clearTimeout(window.aaIntroFailsafe);
      return;
    }
    const elapsed = performance.now() - window.aaIntroStarted;
    setTimeout(() => {
      root.classList.add('intro-finishing');
      setTimeout(() => {
        root.classList.remove('intro-loading', 'intro-finishing');
        clearTimeout(window.aaIntroFailsafe);
      }, 850);
    }, Math.max(0, 1250 - elapsed));
  }
  function skipIntro(event) {
    if (event.key === 'Tab' || event.key === 'Escape') finish(true);
  }
  document.addEventListener('keydown', skipIntro);
  deadline = setTimeout(() => finish(), 2300);
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', () => finish(), { once: true });
})();

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
const techs={
html:{category:'FRONTEND / FOUNDATIONS',glyph:'</>',title:'Every experience starts with structure.',description:'Semantic HTML gives a page its meaning — from headings and navigation to forms and accessible content. It’s the foundation underneath the visual layer.',tags:['Semantic structure','Accessibility','Forms'],code:'<main>\n  <h1>Hello, world. I’m Aman.</h1>\n</main>'},
css:{category:'FRONTEND / VISUAL DESIGN',glyph:'{ }',title:'Make an interface feel intentional.',description:'CSS brings structure to life through layout, typography, colour, and motion. I use it to shape responsive experiences that work across different screen sizes.',tags:['Responsive layouts','Flexbox & Grid','Animation'],code:'.idea {\n  display: grid;\n  place-items: center;\n  transition: transform 300ms ease;\n}'},
js:{category:'FRONTEND / INTERACTION',glyph:'JS',title:'A page becomes an experience.',description:'JavaScript connects user actions to behaviour: changing content, handling events, and adding the logic that makes an interface interactive.',tags:['DOM & events','Application logic','Interaction'],code:"const idea = document.querySelector('.idea');\n\nidea.addEventListener('click', () => {\n  idea.classList.toggle('in-motion');\n});"},
react:{category:'FRONTEND / COMPONENTS',glyph:'⚛',title:'Build a bigger idea from smaller parts.',description:'React helps organise interfaces into reusable components. I work with its component-based approach to connect data, state, and what people see on screen.',tags:['Components','State','Reusable UI'],code:'function Hello({ name }) {\n  return <h1>Hey, {name}.</h1>;\n}\n\n<Hello name="Aman" />'},
python:{category:'BACKEND / PROGRAMMING',glyph:'Py',title:'Clear thinking. Expressed in code.',description:'Python is part of my programming toolkit for working through logic, solving problems, and exploring backend development and the foundations of AI.',tags:['Programming','Problem solving','AI foundations'],code:'def explore(ideas):\n    for idea in ideas:\n        print(f"What if we built {idea}?")\n\nexplore(["something useful"])'},
sql:{category:'DATA / QUERY LANGUAGE',glyph:'SQL',title:'Ask better questions of your data.',description:'SQL is how I work with structured information: selecting records, connecting tables, and understanding how data can support a useful application.',tags:['Queries','Joins','Structured data'],code:"SELECT name, category\nFROM ideas\nWHERE curiosity = true\nORDER BY created_at DESC;"},
postgres:{category:'BACKEND / DATABASES',glyph:'PG',title:'Give information a reliable home.',description:'PostgreSQL brings relational data into the application stack. I’m interested in how table design, relationships, and queries work together behind an interface.',tags:['Relational databases','Table design','SQL'],code:'CREATE TABLE ideas (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  curiosity BOOLEAN DEFAULT true\n);'}
};
function selectTech(button,focus=false){const key=button.dataset.tech,t=techs[key];$$('[role="tab"]').forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});$('#tech-panel').setAttribute('aria-labelledby',button.id);$('#tech-category').textContent=t.category;$('.panel-top span:last-child').textContent='TOOLKIT_0'+(Object.keys(techs).indexOf(key)+1);$('#tech-glyph').textContent=t.glyph;$('#tech-title').textContent=t.title;$('#tech-description').textContent=t.description;$('#tech-code').textContent=t.code;$('#tech-tags').replaceChildren(...t.tags.map(label=>{const span=document.createElement('span');span.textContent=label;return span;}));if(!paused)$('#tech-panel').animate([{opacity:.3,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'ease-out'});if(focus){button.focus();button.scrollIntoView({block:'nearest',inline:'nearest',behavior:paused?'instant':'smooth'});}}
$$('[role="tab"]').forEach((button,i,list)=>{button.addEventListener('click',()=>selectTech(button));button.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%list.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i-1+list.length)%list.length;if(e.key==='Home')next=0;if(e.key==='End')next=list.length-1;if(next!==undefined){e.preventDefault();selectTech(list[next],true);}});});
$$('[data-scene]').forEach(button=>button.addEventListener('click',()=>{$$('[data-scene]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});$$('.hero-image').forEach((image,i)=>image.classList.toggle('active',i===Number(button.dataset.scene)));}));
const canvas=$('#network'),ctx=canvas.getContext('2d');let cw=0,ch=0,networkVisible=false,frame=0,raf=0;
function resize(){const box=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);cw=box.width;ch=box.height;canvas.width=cw*dpr;canvas.height=ch*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);renderNetwork();}
function renderNetwork(){ctx.clearRect(0,0,cw,ch);const time=frame*.004;const nodes=[];for(let i=0;i<92;i++){const phi=Math.acos(1-2*(i+.5)/92),theta=Math.PI*(1+Math.sqrt(5))*i;const r=Math.min(ch*.42,cw*.36);const x=r*Math.sin(phi)*Math.cos(theta),y=r*Math.cos(phi),z=r*Math.sin(phi)*Math.sin(theta);const xx=x*Math.cos(time)+z*Math.sin(time),zz=-x*Math.sin(time)+z*Math.cos(time);const yy=y*Math.cos(.4)-zz*Math.sin(.4),depth=y*Math.sin(.4)+zz*Math.cos(.4);nodes.push({x:cw/2+xx,y:ch/2+yy,z:depth});}for(let i=0;i<nodes.length;i++){const a=nodes[i];for(let j=i+1;j<nodes.length;j++){const b=nodes[j],dist=Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);if(dist<45){ctx.strokeStyle=`rgba(172,214,73,${.11*(1-dist/50)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}ctx.fillStyle=`rgba(212,255,63,${.15+(a.z+ch*.45)/ch*.65})`;ctx.beginPath();ctx.arc(a.x,a.y,1.5,0,Math.PI*2);ctx.fill();}}
let scrollDirty=true,cursorX=-100,cursorY=-100,smoothX=-100,smoothY=-100;
function animate(){raf=0;if(paused||document.hidden)return;frame++;if(networkVisible&&frame%2===0)renderNetwork();if(scrollDirty){updateScroll();scrollDirty=false;}if(matchMedia('(pointer:fine)').matches){smoothX+=(cursorX-smoothX)*.2;smoothY+=(cursorY-smoothY)*.2;$('.cursor').style.transform=`translate(${smoothX}px,${smoothY}px) translate(-50%,-50%)`;}raf=requestAnimationFrame(animate);}
function startAnimation(){if(!raf&&!paused&&!document.hidden)raf=requestAnimationFrame(animate);}
function updateScroll(){const doc=document.documentElement,progress=scrollY/Math.max(1,doc.scrollHeight-innerHeight);$('.reading-progress').style.transform=`scaleX(${progress})`;if(!paused){$('.hero').style.setProperty('--hero-y',`${Math.min(scrollY,innerHeight)*.2}px`);$('.hero').style.setProperty('--name-x',`${-Math.min(scrollY,innerHeight)*.12}px`);const rect=$('.manifesto').getBoundingClientRect();$('.manifesto').style.setProperty('--manifesto-x',`${-200+(innerHeight-rect.top)*.2}px`);}}
addEventListener('scroll',()=>{scrollDirty=true;if(paused)updateScroll();},{passive:true});addEventListener('resize',()=>{resize();scrollDirty=true;});
new IntersectionObserver(entries=>{networkVisible=entries[0].isIntersecting;if(networkVisible)renderNetwork();}).observe(canvas);
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});$$('.reveal').forEach((el,i)=>{el.style.setProperty('--delay',`${i%3*60}ms`);revealObserver.observe(el);});
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;counterObserver.unobserve(entry.target);const el=entry.target,target=Number(el.dataset.count);if(paused)return;const begin=performance.now();function count(now){const p=Math.min(1,(now-begin)/900);el.textContent=String(Math.round(target*(1-Math.pow(1-p,3)))).padStart(Number(el.dataset.pad),'0');if(p<1&&!paused)requestAnimationFrame(count);else el.textContent=String(target).padStart(Number(el.dataset.pad),'0');}requestAnimationFrame(count);}),{threshold:.5});$$('[data-count]').forEach(el=>counterObserver.observe(el));
function setMotion(value){paused=value;document.body.classList.toggle('paused',paused);document.documentElement.classList.toggle('paused',paused);document.body.classList.toggle('js-motion',!paused);$('#motion-toggle').textContent=`Motion: ${paused?'off':'on'}`;$('#motion-toggle').setAttribute('aria-pressed',String(paused));if(paused){cancelAnimationFrame(raf);raf=0;$$('.tilt').forEach(el=>el.style.transform='');renderNetwork();}else startAnimation();}
$('#motion-toggle').addEventListener('click',()=>setMotion(!paused));reduced.addEventListener('change',()=>setMotion(reduced.matches));document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else startAnimation();});
if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.addEventListener('pointermove',e=>{cursorX=e.clientX;cursorY=e.clientY;$('.cursor').style.opacity='1';});document.documentElement.addEventListener('pointerleave',()=>$('.cursor').style.opacity='0');$$('.photo-button').forEach(el=>{el.addEventListener('pointerenter',()=>$('.cursor').classList.add('view'));el.addEventListener('pointerleave',()=>$('.cursor').classList.remove('view'));});$$('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{if(paused)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1000px) rotateY(${x*7}deg) rotateX(${-y*5}deg)`;});el.addEventListener('pointerleave',()=>el.style.transform='');});}
const rail=$('.photo-rail');function railState(){const width=rail.querySelector('.photo-card').getBoundingClientRect().width+30;const total=rail.querySelectorAll('.photo-card').length;const index=Math.min(total-1,Math.round(rail.scrollLeft/width));$('#gallery-counter').textContent=`0${index+1} — 0${total}`;$('#gallery-prev').disabled=rail.scrollLeft<3;$('#gallery-next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-3;}
$('#gallery-prev').addEventListener('click',()=>rail.scrollBy({left:-(rail.querySelector('.photo-card').clientWidth+30),behavior:paused?'instant':'smooth'}));$('#gallery-next').addEventListener('click',()=>rail.scrollBy({left:rail.querySelector('.photo-card').clientWidth+30,behavior:paused?'instant':'smooth'}));rail.addEventListener('scroll',railState,{passive:true});addEventListener('resize',railState);
const photos=$$('.photo-button'),dialog=$('#photo-dialog');let photoIndex=0;
function showPhoto(i){photoIndex=(i+photos.length)%photos.length;const button=photos[photoIndex];$('#full-photo').src=button.dataset.image;$('#full-photo').alt=button.querySelector('img').alt;$('#full-caption').textContent=button.dataset.caption;}
photos.forEach((button,i)=>button.addEventListener('click',()=>{showPhoto(i);dialog.showModal();}));$('.dialog-close').addEventListener('click',()=>dialog.close());$('.photo-prev').addEventListener('click',()=>showPhoto(photoIndex-1));$('.photo-next').addEventListener('click',()=>showPhoto(photoIndex+1));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}});
$('#year').textContent=new Date().getFullYear();resize();railState();setMotion(paused);updateScroll();
