//humburger
let hamburger = document.querySelector(".hamburger")
let menu = document.querySelector(".navmenu")

hamburger.onclick = function () {
    menu.classList.toggle ("active-burger")
}

//parallax
// let parallaxStartPos,
//     shiftX,
//     shiftY
const parallaxBG = document.querySelectorAll(".parallax")
function moveBackground(e) {
        let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1
        let offsetX = 50 + (e.pageX / window.innerWidth * 15)
        let offsetY = 50 + (Y / window.innerHeight * 20)
        e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`
}

parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`
    element.style.backgroundSize = `130% auto`

    element.addEventListener("mousemove", function (e) { moveBackground(e); })
})

//localStorage

let firstVisit,
    lastVisit,
    timeInSite,
    firstTimeInSite

window.onload = function(){
    if(!localStorage.firstVisit || localStorage.firstVisit == "undefined"){
        localStorage.firstVisit = new Date ()
    } 
    
    firstVisit = localStorage.firstVisit

    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit
    } 
    
    timeInSite = ((new Date() - new Date (localStorage.lastVisit)) / 1000 / 60)

    firstTimeInSite = ((new Date() - new Date (localStorage.firstVisit)) / 1000 / 60)
    console.log(firstTimeInSite)
    
    if (firstTimeInSite <= 5) {
        console.log ("З поверненням")
    } else if (firstTimeInSite > 5 && firstTimeInSite <= 60){
        console.log("Вітаємо знову на нашому сайті")
    } else if (firstTimeInSite > 1440){
        console.log("З поверненням")
    }
    

    window.onblur = function () {
        localStorage.lastVisit = new Date () 
        
    }
    lastVisit = localStorage.lastVisit
}

//scroll
let menun = document.querySelectorAll(".top-menu a"),
    interval
function scrollToBlock(href){
    let target = document.querySelector(href),
        targetLocation = target.getBoundingClientRect().top + window.pageYOffset, //положення цілі
        currentPosition = window.pageYOffset, //поточна позиція
        direction, //напрямок скролу
        pixelScroll = 1, // швидкість скролу 
        pixelsLeft //залишилось пікселів до цілі
    if (targetLocation > currentPosition) {
        direction = "down"
    } else {
        direction = "up"  
    }
    clearInterval(interval)
    interval = setInterval(()=> {
        
        pixelsLeft = Math.abs(targetLocation - window.pageYOffset) 
        
        if(pixelScroll <= 55 && pixelsLeft > (window.innerHeight * 0.4)){
            pixelScroll *= 1.2
            //console.log("down")
        } else if (pixelsLeft < (window.innerHeight * 0.4)  && pixelScroll > 3) {
            pixelScroll *= 0.8
            //console.log("up")
        }
        if(direction == "down"){
            window.scrollTo(0, window.pageYOffset + pixelScroll)
            
        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll)
        }

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation)
            clearInterval(interval)
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5){
            clearInterval(interval)

        }
        console.log (pixelScroll)
    },20)
}

menun.forEach(element => {
    element.onclick = function (event) {
        event.preventDefault()
        scrollToBlock(this.getAttribute("href"))
    } 
})

//tripple click

let tripleClick = document.querySelector(".rock-solid svg"),
    changeText = document.querySelectorAll(".personal h3"),
    timer          

tripleClick.addEventListener("dblclick", function () {
    timer = setTimeout(function () {
        timer = null
    }, 200)
})
tripleClick.addEventListener("click", function () {
    if (timer) {
        clearTimeout(timer)
        timer = null
        changeTex()
    }

})
function changeTex (){
    changeText.forEach(element => {
        element.innerText = "Cliiiiick"
    })

}

// tripleClick.addEventListener('dblclick', function (){
//     //if (event.detail === 3) {
//     changeText.forEach(element => {
//         element.innerHTML = "Cliiiick!"
//         alert("kdj")
//     })
//     //}
// })
// animation


const animItems = document.querySelectorAll(`._anim-start`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        animItems.forEach(element => {
            const animItem = element
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((window.pageYOffset > animItemOffSet - animItemPoint) && window.pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active-anim`)
            } else {
                if (!(animItem.classList.contains(`_anim-no`))) {
                    animItem.classList.remove(`_active-anim`)
                }
            }            
        });
    }
    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 200)
}





//slider

// function infinitySlider () {
//     let slider = document.querySelector(".slider-card"),
//         cards = document.querySelectorAll(".cards"),
//         btnLeft = document.querySelector(".cards-slider.left"),
//         btnRight = document.querySelector(".cards-slider.right"),
//         heightCards = cards[0].getBoundingClientRect().height,
//         widthCards = cards[0].getBoundingClientRect().width,
//         sliderWidth = slider.getBoundingClientRect().width,
//         cardsCount = Math.floor(sliderWidth / widthCards),
//         distanceCards = (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)

// }
// window.onresize = infinitySlider ()

