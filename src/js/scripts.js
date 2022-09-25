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

    if (timeInSite <= 5) {
        console.log ("З поверненням")
    } else if (timeInSite > 1440){
        console.log("Вітаємо знову на нашому сайті")
    } else if (timeInSite > 2880){
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

let positionCards = 0,
    cards = document.querySelectorAll(".cards"),
    slider = document.querySelector(".slider-card"),
    sliderWidth = slider.getBoundingClientRect().width,
    widthCards = cards[0].getBoundingClientRect().width,
    constCardWidth = widthCards,
    cardsCount = Math.floor(sliderWidth / constCardWidth),
    distanceCards = (cardsCount == 1) ? 20 : (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1),
    btnLeft = document.querySelector(".cards-slider.left"),
    btnRight = document.querySelector(".cards-slider.right"),
    firstEl = cards[cards.length - 1].cloneNode(true)
slider.insertAdjacentElement("afterbegin", firstEl)
positionCards = 0 - (distanceCards + widthCards)
   

function infinitySlider () {
    
    cards = document.querySelectorAll(".cards")
    sliderWidth = slider.getBoundingClientRect().width
    cardsCount = Math.floor(sliderWidth / constCardWidth)
    let heightCards = cards[0].getBoundingClientRect().height
    slider.style.height = heightCards + 'px'
    
    cards.forEach(card => {
        if(cardsCount == 1){
            card.style.width = 100 + '%'
        } else if(cardsCount == 2){
            card.style.width = 45 + '%'
        } else if(cardsCount == 3){
            card.style.width = 31 + '%'
        } else {
            card.style.width = 'auto'
        }
    })  
    
    console.log(heightCards)
    widthCards = cards[0].getBoundingClientRect().width
    
    distanceCards = (cardsCount == 1) ? 20 : (sliderWidth - (widthCards * cardsCount)) / (cardsCount - 1)
    
    function shuffleCard () {
        positionCards = 0 - (distanceCards + widthCards)
        if (cards.length - 1 > cardsCount) {
            btnLeft.style.display = "block"
            btnRight.style.display = "block"
        } else {
            btnLeft.style.display = "none"
            btnRight.style.display = "none"
        }

        cards = document.querySelectorAll(".cards")
        cards.forEach(card => {
            card.style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
           
        })
    }
    shuffleCard()

    function changeSlide (direction) {
        if (direction == "left") {
            cards[cards.length - 1].remove()
            let preLastEl = cards[cards.length - 2].cloneNode(true)
            slider.insertAdjacentElement("afterbegin", preLastEl)
        } else if (direction == "right") {
            cards[0].remove()
            let preFirstEl = cards[1].cloneNode(true)
            slider.insertAdjacentElement("beforeend", preFirstEl)
        }
        shuffleCard()
    }
    btnLeft.onclick = function () {
        changeSlide("left")
    }
    btnRight.onclick = function () {
        changeSlide("right")
    }
}

window.onresize = infinitySlider 
infinitySlider ()






// let offs = 0,
//     step = 0
//     slider = document.querySelector(".slider-card").offsetWidth,
//     btnLeft = document.querySelector(".cards-slider.left"),
//     btnRight = document.querySelector(".cards-slider.right"),
//     cards = document.querySelectorAll(".cards")
//     sliders = []
// for (let i = 0; i< cards.length; i++) {
//     sliders[i] = cards[i]
//     cards[i]
//     //console.log(sliderCard[i])
//     }
    
// function drawLeft(){
//     let slide = document.createElement('div')
    
//     slide.classList.add('cards')
//     slide.appendChild(sliders[step])
//     slide.style.left = offs * slider + 'px'
//     document.querySelector(".slider-card").appendChild(slide)
    
//     if (step + 1 == cards.length){
//         step = 0
//     } else {
//         step++
//     }
//     offs = 1
// }
// drawLeft()

// function left() {
//     btnLeft.removeEventListener('click', left)
    
//     let sliderLeft = document.querySelectorAll('.cards')
//     let offsetLeft = 0
    
//     for (let i = 0; i < sliderLeft.length; i++) {
//         sliderLeft[i].style.left = offsetLeft * slider -slider + 'px'
//         offsetLeft++
//     }
//     setTimeout(function() {
//         sliderLeft[0].remove()
//         drawLeft()
//         btnLeft.addEventListener('click', left)
//     }, 1000)  
// }


// btnLeft.addEventListener('click', left)




// document.querySelector(".cards-slider.left").addEventListener('click', function() {
//     offs += 263
//     if(offs > 1140) {
//         offs = 0
//     }
//     slider.style.left = -offs + 'px'
// })

// document.querySelector(".cards-slider.right").addEventListener('click', function() {
//     offs -= 263
//     if(offs < 0) {
//         offs = 1052
//     }
//     slider.style.left = -offs + 'px'
// })
