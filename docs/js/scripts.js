function ajaxForm(t,e,o){return new Promise(((n,r)=>{let a=new FormData(t);fetch(o,{method:e,body:a}).then((e=>e.ok?(t.reset(),n(e)):r(e)))}))}document.querySelector("#contactForm").onsubmit=function(t){t.preventDefault(),ajaxForm(this,"post","../docs/php/getStarted.php").then((t=>t.text())).then((t=>{console.log(t)}))};
const animItems=document.querySelectorAll("._anim-start");if(animItems.length>0){function animOnScroll(){animItems.forEach((e=>{const n=e,t=n.offsetHeight,i=offset(n).top;let o=window.innerHeight-t/4;t>window.innerHeight&&(o=window.innerHeight-window.innerHeight/4),window.pageYOffset>i-o&&window.pageYOffset<i+t?n.classList.add("_active-anim"):n.classList.contains("_anim-no")||n.classList.remove("_active-anim")}))}function offset(e){const n=e.getBoundingClientRect();let t=window.pageXOffset||document.documentElement.scrollLeft,i=window.pageYOffset||document.documentElement.scrollTop;return{top:n.top+i,left:n.left+t}}window.addEventListener("scroll",animOnScroll),setTimeout((()=>{animOnScroll()}),200)}
class InfinitySlider{constructor(t,s={}){this.settings={...InfinitySlider.defoltSettings,...s},this.positionCards=0,this.slider=document.querySelector(t),this.sliderCard=this.slider.querySelector(".slider-card"),this.sliderWidth,this.cards=this.sliderCard.children,this.heightCards,this.realCardsLenth=this.cards.length,this.widthCards,this.btnLeft,this.btnRight,this.distanceCards,this.cloneCard,this.cardsCount,this.sliderInterval,this.maxHeight,this.sliderDots,this.touchPoint,this.dot}static defoltSettings={slideToScrollAll:!1,dots:!1,distanceDots:0,fadeOut:!1,gap:0,autoplay:!1,arrows:!1,autoplayspeed:3e3,baseCardWidth:null,transitionslider:"all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"};init(){if(this.sliderWidth=this.sliderCard.getBoundingClientRect().width,null==this.settings.baseCardWidth&&(this.settings.baseCardWidth=this.sliderWidth+"px"),this.slider.querySelectorAll(".clone").forEach((t=>{t.remove()})),localStorage[this.slider.id+"interval"]&&clearInterval(localStorage[this.slider.id+"interval"]),this.slider.style.position="relative",this.sliderCard.style.position="relative",this.sliderCard.style.width="100%",this.sliderCard.style.overflow="hidden",this.cardsCount=Math.floor(this.sliderWidth/(parseInt(this.settings.baseCardWidth)+this.settings.gap)),0==this.cardsCount&&(this.cardsCount=1),this.distanceCards=this.settings.gap,this.widthCards=(this.sliderWidth-(this.cardsCount-1)*this.distanceCards)/this.cardsCount,this.positionCards=0-(this.distanceCards+this.widthCards),this.settings.arrows&&this.createArrows(),this.btnLeft=this.slider.querySelector(".left"),this.btnRight=this.slider.querySelector(".right"),this.settings.arrows&&this.cards.length<=this.cardsCount?(this.btnLeft.style.display="none",this.btnRight.style.display="none"):this.settings.arrows&&(this.btnLeft.style.display="block",this.btnRight.style.display="block"),this.settings.dots&&this.realCardsLenth>1){this.createDots(),this.dot=this.slider.querySelectorAll(".dot");for(let t=0;t<this.cards.length;t++)this.cards[t].classList.contains("activeFadeSlide")&&(this.dot[t].classList.remove("activeFadeSlide"),this.cards[t].classList.remove("activeFadeSlide"));this.dot[0].classList.add("activeFadeSlide"),this.cards[0].classList.add("activeFadeSlide")}this.settings.fadeOut||(this.createClone(),this.shuffleCard()),this.cards=this.sliderCard.children,this.heightCards=0;for(let t=0;t<this.cards.length;t++)this.cards[t].style.width=this.widthCards+"px",this.cards[t].style.position="absolute",this.maxHeight=this.cards[t].getBoundingClientRect().height,this.maxHeight>this.heightCards&&(this.heightCards=this.maxHeight),this.cards[t].style.transition="none",setTimeout((()=>{this.cards[t].style.transition=this.settings.transitionslider}),1);this.sliderCard.style.height=this.heightCards+"px",this.settings.dots&&this.createDots(),this.dot=this.slider.querySelectorAll(".dot"),this.dot.forEach((t=>{t.onclick=()=>{clearInterval(localStorage[this.slider.id+"interval"]);for(let t=0;t<this.realCardsLenth;t++)this.dot[t].classList.remove("activeFadeSlide"),this.cards[t].classList.remove("activeFadeSlide");this.cards[t.dataset.order].classList.add("activeFadeSlide"),t.classList.add("activeFadeSlide")}})),this.settings.autoplay&&this.realCardsLenth>this.cardsCount&&this.autoPlaySlider(),this.slider.addEventListener("touchend",(()=>{this.settings.autoplay&&this.realCardsLenth>this.cardsCount&&this.autoPlaySlider()})),this.touchSlider=this.touchSlider.bind(this),this.slider.addEventListener("touchstart",(t=>{this.touchPoint=t.touches[0].pageX,this.slider.addEventListener("touchmove",this.touchSlider),clearInterval(localStorage[this.slider.id+"interval"])})),this.slider.onmouseenter=()=>{clearInterval(localStorage[this.slider.id+"interval"])},this.slider.onmouseleave=()=>{this.settings.autoplay&&this.realCardsLenth>this.cardsCount&&this.autoPlaySlider()}}createArrows(){if(this.slider.querySelectorAll(".cards-slider").length<1){let t=!0;this.btnLeft=document.createElement("span"),this.btnRight=document.createElement("span"),this.btnLeft.className="cards-slider left",this.btnRight.className="cards-slider right",this.slider.insertAdjacentElement("afterbegin",this.btnLeft),this.slider.insertAdjacentElement("beforeend",this.btnRight),this.btnLeft.onclick=()=>{t&&(this.changeSlide("left"),t=!1,setTimeout((()=>{t=!0}),1e3*parseFloat(this.cards[0].style.transitionDuration)))},this.btnRight.onclick=()=>{t&&(this.changeSlide("right"),t=!1,setTimeout((()=>{t=!0}),1e3*parseFloat(this.cards[0].style.transitionDuration)))}}}createClone(){let t=1;do{this.cloneCard=this.cards[this.cards.length-t].cloneNode(!0),this.cloneCard.classList.add("clone"),this.cloneCard.style.transition="none",this.sliderCard.insertAdjacentElement("afterbegin",this.cloneCard),this.realCardsLenth=this.cards.length-this.slider.querySelectorAll(".clone").length,t++}while(t<=this.realCardsLenth&&this.settings.slideToScrollAll);if(this.settings.slideToScrollAll)for(t=0;t<this.realCardsLenth;)this.cloneCard=this.cards[t].cloneNode(!0),this.cloneCard.classList.add("clone"),this.cloneCard.style.transition="none",this.sliderCard.insertAdjacentElement("beforeend",this.cloneCard),t++}createDots(){if(this.slider.querySelectorAll(".dot-container").length<1){this.sliderDots=document.createElement("div"),this.sliderDots.className="dot-container",this.sliderDots.style.position="absolute",this.slider.insertAdjacentElement("beforeend",this.sliderDots);for(let t=0;t<this.realCardsLenth;t++){const s=document.createElement("span");s.className="dot",s.dataset.order=t,this.sliderDots.insertAdjacentElement("beforeend",s)}}}shuffleCard(){this.positionCards=0-(this.distanceCards+this.widthCards),this.cards=this.sliderCard.children,this.settings.slideToScrollAll&&(this.positionCards=0-(this.distanceCards+this.widthCards)*this.realCardsLenth);for(let t=0;t<this.cards.length;t++)this.cards[t].style.left=this.positionCards+"px",this.positionCards+=this.distanceCards+this.widthCards}changeSlide(t){this.sliderWidth=this.sliderCard.getBoundingClientRect().width,this.cardsCount=Math.floor(this.sliderWidth/(parseInt(this.settings.baseCardWidth)+this.settings.gap)),0==this.cardsCount&&(this.cardsCount=1),this.widthCards=(this.sliderWidth-(this.cardsCount-1)*this.distanceCards)/this.cardsCount,this.cards=this.sliderCard.children;let s=0;for(let t=0;t<this.cards.length;t++)this.cards[t].classList.contains("activeFadeSlide")&&(s=t);if("left"==t)if(this.settings.slideToScrollAll)for(let t=0;t<this.cardsCount;t++)this.sliderCard.insertAdjacentElement("afterbegin",this.cards[this.cards.length-1]);else if(this.settings.fadeOut)setTimeout((()=>this.cards[s].classList.add("activeFadeSlide")),1e3),setTimeout((()=>this.dot[s].classList.add("activeFadeSlide")),1e3),this.cards[s].classList.remove("activeFadeSlide"),this.dot[s].classList.remove("activeFadeSlide"),this.cards[s-1]?s--:s=this.cards.length-1;else{this.cards[this.cards.length-1].remove();let t=this.cards[this.cards.length-1].cloneNode(!0);t.classList.add("clone"),this.sliderCard.insertAdjacentElement("afterbegin",t),this.cards[1].classList.remove("clone")}else if("right"==t)if(this.settings.slideToScrollAll)for(let t=0;t<this.cardsCount;t++)this.sliderCard.insertAdjacentElement("beforeend",this.cards[0]);else if(this.settings.fadeOut)setTimeout((()=>this.cards[s].classList.add("activeFadeSlide")),1e3),setTimeout((()=>this.dot[s].classList.add("activeFadeSlide")),1e3),this.cards[s].classList.remove("activeFadeSlide"),this.dot[s].classList.remove("activeFadeSlide"),this.cards[s+1]?s++:s=0;else{this.cards[0].remove();let t=this.cards[0].cloneNode(!0);t.classList.add("clone"),this.sliderCard.insertAdjacentElement("beforeend",t),this.cards[this.cards.length-2].classList.remove("clone")}this.settings.fadeOut||this.shuffleCard()}autoPlaySlider(){if(clearInterval(localStorage[this.slider.id+"interval"]),this.settings.fadeOut){let t=0;for(let s=0;s<this.cards.length;s++)this.cards[s].classList.contains("activeFadeSlide")&&(t=s);const s=t=>{setTimeout((()=>this.cards[t].classList.add("activeFadeSlide")),1e3),setTimeout((()=>this.dot[t].classList.add("activeFadeSlide")),1e3)};this.sliderInterval=setInterval((()=>{this.cards[t].classList.remove("activeFadeSlide"),this.dot[t].classList.remove("activeFadeSlide"),this.cards[t+1]?t++:t=0,s(t)}),this.settings.autoplayspeed)}else this.sliderInterval=setInterval((()=>{this.changeSlide("right")}),this.settings.autoplayspeed);localStorage[this.slider.id+"interval"]=this.sliderInterval}touchSlider(t){this.touchPoint+20<t.touches[0].pageX?(this.changeSlide("left"),this.slider.removeEventListener("touchmove",this.touchSlider)):this.touchPoint-20>t.touches[0].pageX&&(this.changeSlide("right"),this.slider.removeEventListener("touchmove",this.touchSlider))}}window.onresize=function(){sliderPeople.init(),sliderBrands.init(),sliderQuotes.init()};let sliderPeople=new InfinitySlider(".slider",{arrows:!0,baseCardWidth:"263rem",slideToScrollAll:!0,autoplay:!1,gap:20}),sliderBrands=new InfinitySlider(".sliderBrands",{gap:45,slideToScrollAll:!0,baseCardWidth:"127rem",autoplay:!0,arrows:!1}),sliderQuotes=new InfinitySlider(".sliderQuotes",{autoplay:!0,autoplayspeed:4e3,fadeOut:!0,dots:!0,distanceDots:40,arrows:!1});sliderPeople.init(),sliderBrands.init(),sliderQuotes.init();


!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).LazyLoad=t()}(this,(function(){"use strict";function n(){return n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i])}return n},n.apply(this,arguments)}var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),a=t&&window.devicePixelRatio>1,r={elements_selector:".lazy",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_bg_set:"bg-set",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1,restore_on_error:!1},c=function(t){return n({},r,t)},l=function(n,t){var e,i="LazyLoad::Initialized",o=new n(t);try{e=new CustomEvent(i,{detail:{instance:o}})}catch(n){(e=document.createEvent("CustomEvent")).initCustomEvent(i,!1,!1,{instance:o})}window.dispatchEvent(e)},u="src",s="srcset",d="sizes",f="poster",_="llOriginalAttrs",g="data",v="loading",b="loaded",m="applied",p="error",h="native",E=function(n,t){return n.getAttribute("data-"+t)},I=function(n){return E(n,"ll-status")},y=function(n,t){return function(n,t,e){var i="data-ll-status";null!==e?n.setAttribute(i,e):n.removeAttribute(i)}(n,0,t)},k=function(n){return y(n,null)},w=function(n){return null===I(n)},A=function(n){return I(n)===h},L=[v,b,m,p],O=function(n,t,e,i){n&&(void 0===i?void 0===e?n(t):n(t,e):n(t,e,i))},x=function(n,t){o?n.classList.add(t):n.className+=(n.className?" ":"")+t},C=function(n,t){o?n.classList.remove(t):n.className=n.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},N=function(n){return n.llTempImage},M=function(n,t){if(t){var e=t._observer;e&&e.unobserve(n)}},z=function(n,t){n&&(n.loadingCount+=t)},T=function(n,t){n&&(n.toLoadCount=t)},R=function(n){for(var t,e=[],i=0;t=n.children[i];i+=1)"SOURCE"===t.tagName&&e.push(t);return e},G=function(n,t){var e=n.parentNode;e&&"PICTURE"===e.tagName&&R(e).forEach(t)},j=function(n,t){R(n).forEach(t)},D=[u],H=[u,f],V=[u,s,d],F=[g],B=function(n){return!!n[_]},J=function(n){return n[_]},P=function(n){return delete n[_]},S=function(n,t){if(!B(n)){var e={};t.forEach((function(t){e[t]=n.getAttribute(t)})),n[_]=e}},U=function(n,t){if(B(n)){var e=J(n);t.forEach((function(t){!function(n,t,e){e?n.setAttribute(t,e):n.removeAttribute(t)}(n,t,e[t])}))}},$=function(n,t,e){x(n,t.class_applied),y(n,m),e&&(t.unobserve_completed&&M(n,t),O(t.callback_applied,n,e))},q=function(n,t,e){x(n,t.class_loading),y(n,v),e&&(z(e,1),O(t.callback_loading,n,e))},K=function(n,t,e){e&&n.setAttribute(t,e)},Q=function(n,t){K(n,d,E(n,t.data_sizes)),K(n,s,E(n,t.data_srcset)),K(n,u,E(n,t.data_src))},W={IMG:function(n,t){G(n,(function(n){S(n,V),Q(n,t)})),S(n,V),Q(n,t)},IFRAME:function(n,t){S(n,D),K(n,u,E(n,t.data_src))},VIDEO:function(n,t){j(n,(function(n){S(n,D),K(n,u,E(n,t.data_src))})),S(n,H),K(n,f,E(n,t.data_poster)),K(n,u,E(n,t.data_src)),n.load()},OBJECT:function(n,t){S(n,F),K(n,g,E(n,t.data_src))}},X=["IMG","IFRAME","VIDEO","OBJECT"],Y=function(n,t){!t||function(n){return n.loadingCount>0}(t)||function(n){return n.toLoadCount>0}(t)||O(n.callback_finish,t)},Z=function(n,t,e){n.addEventListener(t,e),n.llEvLisnrs[t]=e},nn=function(n,t,e){n.removeEventListener(t,e)},tn=function(n){return!!n.llEvLisnrs},en=function(n){if(tn(n)){var t=n.llEvLisnrs;for(var e in t){var i=t[e];nn(n,e,i)}delete n.llEvLisnrs}},on=function(n,t,e){!function(n){delete n.llTempImage}(n),z(e,-1),function(n){n&&(n.toLoadCount-=1)}(e),C(n,t.class_loading),t.unobserve_completed&&M(n,e)},an=function(n,t,e){var i=N(n)||n;tn(i)||function(n,t,e){tn(n)||(n.llEvLisnrs={});var i="VIDEO"===n.tagName?"loadeddata":"load";Z(n,i,t),Z(n,"error",e)}(i,(function(o){!function(n,t,e,i){var o=A(t);on(t,e,i),x(t,e.class_loaded),y(t,b),O(e.callback_loaded,t,i),o||Y(e,i)}(0,n,t,e),en(i)}),(function(o){!function(n,t,e,i){var o=A(t);on(t,e,i),x(t,e.class_error),y(t,p),O(e.callback_error,t,i),e.restore_on_error&&U(t,V),o||Y(e,i)}(0,n,t,e),en(i)}))},rn=function(n,t,e){!function(n){return X.indexOf(n.tagName)>-1}(n)?function(n,t,e){!function(n){n.llTempImage=document.createElement("IMG")}(n),an(n,t,e),function(n){B(n)||(n[_]={backgroundImage:n.style.backgroundImage})}(n),function(n,t,e){var i=E(n,t.data_bg),o=E(n,t.data_bg_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage='url("'.concat(r,'")'),N(n).setAttribute(u,r),q(n,t,e))}(n,t,e),function(n,t,e){var i=E(n,t.data_bg_multi),o=E(n,t.data_bg_multi_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage=r,$(n,t,e))}(n,t,e),function(n,t,e){var i=E(n,t.data_bg_set);if(i){var o=i.split("|"),a=o.map((function(n){return"image-set(".concat(n,")")}));n.style.backgroundImage=a.join(),""===n.style.backgroundImage&&(a=o.map((function(n){return"-webkit-image-set(".concat(n,")")})),n.style.backgroundImage=a.join()),$(n,t,e)}}(n,t,e)}(n,t,e):function(n,t,e){an(n,t,e),function(n,t,e){var i=W[n.tagName];i&&(i(n,t),q(n,t,e))}(n,t,e)}(n,t,e)},cn=function(n){n.removeAttribute(u),n.removeAttribute(s),n.removeAttribute(d)},ln=function(n){G(n,(function(n){U(n,V)})),U(n,V)},un={IMG:ln,IFRAME:function(n){U(n,D)},VIDEO:function(n){j(n,(function(n){U(n,D)})),U(n,H),n.load()},OBJECT:function(n){U(n,F)}},sn=["IMG","IFRAME","VIDEO"],dn=function(n){return n.use_native&&"loading"in HTMLImageElement.prototype},fn=function(n){return Array.prototype.slice.call(n)},_n=function(n){return n.container.querySelectorAll(n.elements_selector)},gn=function(n){return function(n){return I(n)===p}(n)},vn=function(n,t){return function(n){return fn(n).filter(w)}(n||_n(t))},bn=function(n,e){var o=c(n);this._settings=o,this.loadingCount=0,function(n,t){i&&!dn(n)&&(t._observer=new IntersectionObserver((function(e){!function(n,t,e){n.forEach((function(n){return function(n){return n.isIntersecting||n.intersectionRatio>0}(n)?function(n,t,e,i){var o=function(n){return L.indexOf(I(n))>=0}(n);y(n,"entered"),x(n,e.class_entered),C(n,e.class_exited),function(n,t,e){t.unobserve_entered&&M(n,e)}(n,e,i),O(e.callback_enter,n,t,i),o||rn(n,e,i)}(n.target,n,t,e):function(n,t,e,i){w(n)||(x(n,e.class_exited),function(n,t,e,i){e.cancel_on_exit&&function(n){return I(n)===v}(n)&&"IMG"===n.tagName&&(en(n),function(n){G(n,(function(n){cn(n)})),cn(n)}(n),ln(n),C(n,e.class_loading),z(i,-1),k(n),O(e.callback_cancel,n,t,i))}(n,t,e,i),O(e.callback_exit,n,t,i))}(n.target,n,t,e)}))}(e,n,t)}),function(n){return{root:n.container===document?null:n.container,rootMargin:n.thresholds||n.threshold+"px"}}(n)))}(o,this),function(n,e){t&&(e._onlineHandler=function(){!function(n,t){var e;(e=_n(n),fn(e).filter(gn)).forEach((function(t){C(t,n.class_error),k(t)})),t.update()}(n,e)},window.addEventListener("online",e._onlineHandler))}(o,this),this.update(e)};return bn.prototype={update:function(n){var t,o,a=this._settings,r=vn(n,a);T(this,r.length),!e&&i?dn(a)?function(n,t,e){n.forEach((function(n){-1!==sn.indexOf(n.tagName)&&function(n,t,e){n.setAttribute("loading","lazy"),an(n,t,e),function(n,t){var e=W[n.tagName];e&&e(n,t)}(n,t),y(n,h)}(n,t,e)})),T(e,0)}(r,a,this):(o=r,function(n){n.disconnect()}(t=this._observer),function(n,t){t.forEach((function(t){n.observe(t)}))}(t,o)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),t&&window.removeEventListener("online",this._onlineHandler),_n(this._settings).forEach((function(n){P(n)})),delete this._observer,delete this._settings,delete this._onlineHandler,delete this.loadingCount,delete this.toLoadCount},loadAll:function(n){var t=this,e=this._settings;vn(n,e).forEach((function(n){M(n,t),rn(n,e,t)}))},restoreAll:function(){var n=this._settings;_n(n).forEach((function(t){!function(n,t){(function(n){var t=un[n.tagName];t?t(n):function(n){if(B(n)){var t=J(n);n.style.backgroundImage=t.backgroundImage}}(n)})(n),function(n,t){w(n)||A(n)||(C(n,t.class_entered),C(n,t.class_exited),C(n,t.class_applied),C(n,t.class_loading),C(n,t.class_loaded),C(n,t.class_error))}(n,t),k(n),P(n)}(t,n)}))}},bn.load=function(n,t){var e=c(t);rn(n,e)},bn.resetStatus=function(n){k(n)},t&&function(n,t){if(t)if(t.length)for(var e,i=0;e=t[i];i+=1)l(n,e);else l(n,t)}(bn,window.lazyLoadOptions),bn}));
const popupLinks=document.querySelectorAll(".popup-link"),body=document.querySelector("body"),lockPadding=document.querySelectorAll(".lock-padding"),timeout=300;let unlock=!0;if(popupLinks.length>0)for(let o=0;o<popupLinks.length;o++){const e=popupLinks[o];e.addEventListener("click",(function(o){const t=e.getAttribute("href").replace("#","");popupOpen(document.getElementById(t)),o.preventDefault()}))}const popupCloseIkon=document.querySelectorAll(".close-popup");if(popupCloseIkon.length>0)for(let o=0;o<popupCloseIkon.length;o++){const e=popupCloseIkon[o];e.addEventListener("click",(function(o){popupClose(e.closest(".popup")),o.preventDefault()}))}function popupOpen(o){if(o&&unlock){const e=document.querySelector(".popup.open");e?popupClose(e,!1):bodyLock(),o.classList.add("open"),o.addEventListener("click",(function(o){o.target.closest(".popup-content")||popupClose(o.target.closest(".popup"))}))}}function popupClose(o,e=!0){unlock&&(o.classList.remove("open"),e&&bodyUnLock())}function bodyLock(){const o=window.innerWidth-document.querySelector("section").offsetWidth+"px";for(let e=0;e<lockPadding.length;e++){lockPadding[e].style.paddingRight=o}body.style.paddingRight=o,body.classList.add("lock"),unlock=!1,setTimeout((function(){unlock=!0}),300)}function bodyUnLock(){setTimeout((function(){if(lockPadding.length>0)for(let o=0;o<lockPadding.length;o++){lockPadding[o].style.paddingRight="0px"}body.style.paddingRight="0px",body.classList.remove("lock")}),300),unlock=!1,setTimeout((function(){unlock=!0}),300)}const blogReadMore=document.querySelector(".button-more-show"),blogStartup=document.querySelector(".blog-startup");blogReadMore.addEventListener("click",(function(o){o.preventDefault(),blogStartup.classList.toggle("active"),blogStartup.classList.contains("active")?blogReadMore.innerHTML="Hide":blogReadMore.innerHTML="Read more"}));
let hamburger=document.querySelector(".hamburger"),menu=document.querySelector(".navmenu");hamburger.onclick=function(){menu.classList.toggle("active-burger")};const headerSection=document.querySelector(".header-section");let lastScrollTop=0;function menuBackground(){let e=window.pageYOffset||document.documentElement.scrollTop;e>lastScrollTop?headerSection.classList.add("header-hidden"):headerSection.classList.remove("header-hidden"),lastScrollTop=e<=0?0:e,window.pageYOffset>window.innerHeight/4?headerSection.style.backgroundColor="#c0301c":headerSection.style.backgroundColor="transparent"}window.addEventListener("scroll",menuBackground);const parallaxBG=document.querySelectorAll(".parallax");function moveBackground(e){let t=e.pageY-window.pageYOffset-e.target.getBoundingClientRect().top+1,o=50+e.pageX/window.innerWidth*15,n=50+t/window.innerHeight*20;e.target.style.backgroundPosition=`${o}% ${n}%`}let firstVisit,lastVisit,timeInSite,firstTimeInSite;parallaxBG.forEach((e=>{e.style.backgroundPosition="center",e.addEventListener("mousemove",(function(e){moveBackground(e)}))})),window.onload=function(){localStorage.firstVisit&&"undefined"!=localStorage.firstVisit||(localStorage.firstVisit=new Date),firstVisit=localStorage.firstVisit,localStorage.lastVisit||(localStorage.lastVisit=firstVisit),timeInSite=(new Date-new Date(localStorage.lastVisit))/1e3/60,timeInSite<=5?console.log("З поверненням"):timeInSite>1440?console.log("Вітаємо знову на нашому сайті"):timeInSite>2880&&console.log("З поверненням на сайт!"),window.onblur=function(){localStorage.lastVisit=new Date},lastVisit=localStorage.lastVisit,fetch("goods.json").then((e=>e.json())).then((e=>{for(let[t,o]of Object.entries(e)){let e=document.querySelector(".shopBlock"),n=document.createElement("div"),r=document.createElement("div"),l=document.createElement("p"),c=document.createElement("p"),i=document.createElement("p"),a=document.createElement("a"),s=document.createElement("img");document.querySelector(".tableProduct");popupInfo=document.querySelector(".popupInfo"),imgProduct=document.querySelector(".imgProduct"),nameProduct=document.querySelector(".nameProduct"),costProduct=document.querySelector(".costProduct"),n.className="worksCards",n.dataset.filter=o.category,r.className="worksCardsHover flex",l.className="name",c.className="category",i.className="cost",a.className="addToCard",s.src=o.src,s.alt=o.alt,n.appendChild(s),l.innerText=o.name,c.innerText=o.category,i.innerText=o.cost+" $",a.innerText="Add to card",a.href=o.href,a.dataset.id=t,r.appendChild(l),r.appendChild(c),r.appendChild(i),r.appendChild(a),n.appendChild(r),e.appendChild(n),a.onclick=function(e){e.preventDefault();let t=e.target.closest(".worksCards"),o=t.getBoundingClientRect().top,n=t.getBoundingClientRect().left,r=document.querySelector(".basket"),l=r.getBoundingClientRect().top,c=r.getBoundingClientRect().left,i=t.cloneNode(!0);i.style.position="fixed",i.style.transition="all .5s ease",i.style.left=n+"px",i.style.top=o+"px",document.body.appendChild(i),setTimeout((()=>{i.style.left=c+"px",i.style.top=l+"px",setTimeout((function(){i.remove()}),500)}),100),console.log(l),console.log(c)}}!function(){const e=document.querySelectorAll(".filter-category"),t=document.querySelectorAll(".worksCards");function o(e,t){t.forEach((t=>{const o=t.querySelector(".category").innerHTML.toLowerCase()==e,n="all"===e.toLowerCase();o||n?t.classList.remove("anim-worksCards"):t.classList.add("anim-worksCards")}))}e.forEach((e=>{e.addEventListener("click",(n=>{o(e.dataset.filter,t),n.preventDefault()}))}))}()}))};let timer,tripleClick=document.querySelector(".rock-solid svg"),changeText=document.querySelectorAll(".personal h3");function changeTex(){changeText.forEach((e=>{e.innerText="Cliiiiick"}))}tripleClick.addEventListener("dblclick",(function(){timer=setTimeout((function(){timer=null}),200)})),tripleClick.addEventListener("click",(function(){timer&&(clearTimeout(timer),timer=null,changeTex())}));let getStarted=document.querySelector(".getStarted");function sendAjax(e,t,o={rol:"admin"}){return fetch(t,{method:e,body:o,headers:{"Content-Type":"text/html"}}).then((e=>e.ok?e.text():e.then((e=>{}))))}getStarted.onclick=function(e){e.preventDefault(),sendAjax("post","../docs/php/getStarted.php").then((e=>{console.log(e),getStarted.innerHTML=e}))};
let interval,menun=document.querySelectorAll(".top-menu a");function scrollToBlock(e){let n,t,o=document.querySelector(e).getBoundingClientRect().top+window.pageYOffset,i=window.pageYOffset,l=1;n=o>i?"down":"up",clearInterval(interval),interval=setInterval((()=>{t=Math.abs(o-window.pageYOffset),l<=55&&t>.4*window.innerHeight?l*=1.2:t<.4*window.innerHeight&&l>3&&(l*=.8),"down"==n?window.scrollTo(0,window.pageYOffset+l):window.scrollTo(0,window.pageYOffset-l),Math.abs(window.pageYOffset-o)<=3?(window.scrollTo(0,o),clearInterval(interval)):Math.abs(window.pageYOffset+window.innerHeight-document.body.getBoundingClientRect().height)<5&&clearInterval(interval)}),20)}menun.forEach((e=>{e.onclick=function(e){e.preventDefault(),scrollToBlock(this.getAttribute("href"))}}));
class Shop{constructor(o){this.shopBlock=document.querySelector(o),this.cardsShop=this.shopBlock.children,console.log()}addProduct(){}delProduct(){}checkOut(){}}new Shop(".shopBlock");
