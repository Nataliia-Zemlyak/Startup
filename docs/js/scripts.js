let hamburger=document.querySelector(".hamburger"),menu=document.querySelector(".navmenu");hamburger.onclick=function(){menu.classList.toggle("active-burger")};const parallaxBG=document.querySelectorAll(".parallax");function moveBackground(e){let t=e.pageY-window.pageYOffset-e.target.getBoundingClientRect().top+1,i=50+e.pageX/window.innerWidth*15,n=50+t/window.innerHeight*20;e.target.style.backgroundPosition=`${i}% ${n}%`}let firstVisit,lastVisit,timeInSite,firstTimeInSite;parallaxBG.forEach((e=>{e.style.backgroundPosition="center",e.style.backgroundSize="130% auto",e.addEventListener("mousemove",(function(e){moveBackground(e)}))})),window.onload=function(){localStorage.firstVisit&&"undefined"!=localStorage.firstVisit||(localStorage.firstVisit=new Date),firstVisit=localStorage.firstVisit,localStorage.lastVisit||(localStorage.lastVisit=firstVisit),timeInSite=(new Date-new Date(localStorage.lastVisit))/1e3/60,firstTimeInSite=(new Date-new Date(localStorage.firstVisit))/1e3/60,console.log(firstTimeInSite),firstTimeInSite<=5?console.log("З поверненням"):firstTimeInSite>5&&firstTimeInSite<=60?console.log("Вітаємо знову на нашому сайті"):firstTimeInSite>1440&&console.log("З поверненням"),window.onblur=function(){localStorage.lastVisit=new Date},lastVisit=localStorage.lastVisit};let interval,menun=document.querySelectorAll(".top-menu a");function scrollToBlock(e){let t,i,n=document.querySelector(e).getBoundingClientRect().top+window.pageYOffset,o=window.pageYOffset,l=1;t=n>o?"down":"up",clearInterval(interval),interval=setInterval((()=>{i=Math.abs(n-window.pageYOffset),l<=55&&i>.4*window.innerHeight?l*=1.2:i<.4*window.innerHeight&&l>3&&(l*=.8),"down"==t?window.scrollTo(0,window.pageYOffset+l):window.scrollTo(0,window.pageYOffset-l),Math.abs(window.pageYOffset-n)<=3?(window.scrollTo(0,n),clearInterval(interval)):Math.abs(window.pageYOffset+window.innerHeight-document.body.getBoundingClientRect().height)<5&&clearInterval(interval),console.log(l)}),20)}menun.forEach((e=>{e.onclick=function(e){e.preventDefault(),scrollToBlock(this.getAttribute("href"))}}));let timer,tripleClick=document.querySelector(".rock-solid svg"),changeText=document.querySelectorAll(".personal h3");function changeTex(){changeText.forEach((e=>{e.innerText="Cliiiiick"}))}tripleClick.addEventListener("dblclick",(function(){timer=setTimeout((function(){timer=null}),200)})),tripleClick.addEventListener("click",(function(){timer&&(clearTimeout(timer),timer=null,changeTex())}));const animItems=document.querySelectorAll("._anim-start");if(animItems.length>0){function animOnScroll(){animItems.forEach((e=>{const t=e,i=t.offsetHeight,n=offset(t).top;let o=window.innerHeight-i/4;i>window.innerHeight&&(o=window.innerHeight-window.innerHeight/4),window.pageYOffset>n-o&&window.pageYOffset<n+i?t.classList.add("_active-anim"):t.classList.contains("_anim-no")||t.classList.remove("_active-anim")}))}function offset(e){const t=e.getBoundingClientRect();let i=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{top:t.top+n,left:t.left+i}}window.addEventListener("scroll",animOnScroll),setTimeout((()=>{animOnScroll()}),200)}