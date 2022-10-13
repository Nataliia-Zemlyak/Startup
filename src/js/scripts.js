//humburger
let hamburger = document.querySelector(".hamburger")
let menu = document.querySelector(".navmenu")

hamburger.onclick = function () {
    menu.classList.toggle("active-burger")
}

const headerSection = document.querySelector('.header-section')
let lastScrollTop = 0


function menuBackground() {
    let scolTop = window.pageYOffset || document.documentElement.scrollTop
    if (scolTop > lastScrollTop){
        headerSection.classList.add("header-hidden")
    } else {
        headerSection.classList.remove("header-hidden")
    }
    lastScrollTop = scolTop <= 0 ? 0 : scolTop

    if (window.pageYOffset > (window.innerHeight / 4)) {
        headerSection.style.backgroundColor = "#c0301c"
    } else {
        headerSection.style.backgroundColor = "transparent"
    }
    

}
window.addEventListener(`scroll`, menuBackground)

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
    //element.style.backgroundSize = `130% auto`
    element.addEventListener("mousemove", function (e) {
        moveBackground(e);
    })
})

//localStorage

let firstVisit,
    lastVisit,
    timeInSite,
    firstTimeInSite

window.onload = function () {
    if (!localStorage.firstVisit || localStorage.firstVisit == "undefined") {
        localStorage.firstVisit = new Date()
    }

    firstVisit = localStorage.firstVisit

    if (!localStorage.lastVisit) {
        localStorage.lastVisit = firstVisit
    }

    timeInSite = ((new Date() - new Date(localStorage.lastVisit)) / 1000 / 60)

    if (timeInSite <= 5) {
        console.log("З поверненням")
    } else if (timeInSite > 1440) {
        console.log("Вітаємо знову на нашому сайті")
    } else if (timeInSite > 2880) {
        console.log("З поверненням")
    }

    window.onblur = function () {
        localStorage.lastVisit = new Date()

    }
    lastVisit = localStorage.lastVisit
}

//scroll
let menun = document.querySelectorAll(".top-menu a"),
    interval

function scrollToBlock(href) {
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
    interval = setInterval(() => {

        pixelsLeft = Math.abs(targetLocation - window.pageYOffset)

        if (pixelScroll <= 55 && pixelsLeft > (window.innerHeight * 0.4)) {
            pixelScroll *= 1.2
            //console.log("down")
        } else if (pixelsLeft < (window.innerHeight * 0.4) && pixelScroll > 3) {
            pixelScroll *= 0.8
            //console.log("up")
        }
        if (direction == "down") {
            window.scrollTo(0, window.pageYOffset + pixelScroll)

        } else {
            window.scrollTo(0, window.pageYOffset - pixelScroll)
        }

        if (Math.abs(window.pageYOffset - targetLocation) <= 3) {
            window.scrollTo(0, targetLocation)
            clearInterval(interval)
        } else if (Math.abs(window.pageYOffset + window.innerHeight - document.body.getBoundingClientRect().height) < 5) {
            clearInterval(interval)

        }
        //console.log (pixelScroll)
    }, 20)
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

function changeTex() {
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
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    setTimeout(() => {
        animOnScroll()
    }, 200)
}






//slider
// function $(selector){
//     let elem = document.querySelectorAll(selector)
//     if(elem.length == 1){
//         return elem[0]
//     }
//     return elem
// }

/**
 * .slider -           обов'язковий клас для слайдера
* id -                 обов'язково задати id
* .slider-card -       обов'язковий клас для контейнера слайдів
* .cards-slider -      клас стилів css для кнопок .left . right
 * const sliderProps = {
        slideToScrollAll: true,     скролити одразу всі видимі слайди
        gap: 20,                    відстань між слайдами
        autoplay: true,             автоскрол
        arrows: false,              наявність стрілочок
        autoplayspeed: 3000         швидкість автоскролу
    } 
    infinitySlider(selector, settings) selector шлях до слайдера а settings не стандартні налаштування sliderProps
    
 */
const sliderProps = {
    arrows: true
}

const sliderProppsBrands = {
    gap: 60,
    slideToScrollAll: false,
    
}

function infinitySlider(selector, settings) { 
    window.onresize = function () {
        infinitySlider(selector, settings)
    } 

    let positionCards = 0,
        slider = document.querySelector(selector),
        sliderCard = slider.querySelector(".slider-card"),
        sliderWidth = sliderCard.getBoundingClientRect().width,
        cards = sliderCard.children,
        widthCards,
        btnLeft,
        btnRight,
        distanceCards,
        cloneCard,
        heightCards,
        constCardWidth,
        cardsCount,
        sliderInterval,
        realCardsLenth,
        defoltSettings = {
            slideToScrollAll: true,
            gap: 20, 
            autoplay: true,
            arrows: false,
            autoplayspeed: 3000
        }

    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    })
    if (localStorage[slider.id]) {

        clearInterval(localStorage[slider.id + "interval"])
        constCardWidth = localStorage[slider.id]
    } else {
        constCardWidth = cards[0].getBoundingClientRect().width
        localStorage[slider.id] = constCardWidth
    }
    cardsCount = Math.floor(sliderWidth / constCardWidth)
    // let connect = Object.assign(settings, defoltSettings)
    settings = {
        ...defoltSettings,
        ...settings
    } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає

    distanceCards = settings.gap
    widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    positionCards = 0 - (distanceCards + widthCards)

    if (settings.arrows) createArrows()
    btnLeft = slider.querySelector(".left")
    btnRight = slider.querySelector(".right")

    if (settings.arrows && cards.length <= cardsCount) {
        btnLeft.style.display = "none"
        btnRight.style.display = "none"
    } else if (settings.arrows) {
        btnLeft.style.display = "block"
        btnRight.style.display = "block"
    }

    let counter = 1
    do {
        cloneCard = cards[cards.length - counter].cloneNode(true)
        cloneCard.classList.add("clone")
        cloneCard.style.transition = "none"
        sliderCard.insertAdjacentElement("afterbegin", cloneCard)
        realCardsLenth = cards.length - slider.querySelectorAll(".clone").length
        counter++
    } while (counter <= realCardsLenth && settings.slideToScrollAll)
    
    if (settings.slideToScrollAll) {
        counter = 0
        while (counter < realCardsLenth) {
            cloneCard = cards[counter].cloneNode(true)
            cloneCard.classList.add("clone")
            cloneCard.style.transition = "none"
            sliderCard.insertAdjacentElement("beforeend", cloneCard)
            counter++
        }
    }

    cards = sliderCard.children
    if (cloneCard.classList.contains("clone")) {
        slider.querySelectorAll(".clone").forEach(cloneCard => {
            setTimeout(() => {
                cloneCard.style.transition = "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
            }, 1) 
        })
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
    }
    heightCards = cards[0].getBoundingClientRect().height
    sliderCard.style.height = heightCards + 'px'

    function createArrows() {
        const arrowsExist = document.querySelectorAll(".cards-slider").length
        if (arrowsExist < 1) {
            btnLeft = document.createElement("span")
            btnRight = document.createElement("span")
            btnLeft.className = "cards-slider left"
            btnRight.className = "cards-slider right"
            slider.insertAdjacentElement("afterbegin", btnLeft)
            slider.insertAdjacentElement("beforeend", btnRight)

            btnLeft.onclick = function () {
                changeSlide("left")
            }
            btnRight.onclick = function () {
                changeSlide("right")
            }
        }
    }

    function shuffleCard() {
        positionCards = 0 - (distanceCards + widthCards)
        cards = sliderCard.children
        if (settings.slideToScrollAll) {
            positionCards = 0 - (distanceCards + widthCards) * realCardsLenth   
        }
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
        }
    }
    shuffleCard()

    function changeSlide(direction) {
        sliderWidth = sliderCard.getBoundingClientRect().width
        cardsCount = Math.floor(sliderWidth / constCardWidth)
        widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
        cards = sliderCard.children

        if (direction == "left") {
            if (settings.slideToScrollAll) {
                for ( let i = 0; i < cardsCount; i++) {
                    sliderCard.insertAdjacentElement("afterbegin", cards[cards.length - 1])
                }

            } else {
                cards[cards.length - 1].remove()
                let preLastEl = cards[cards.length - 1].cloneNode(true)
                preLastEl.classList.add("clone")
                sliderCard.insertAdjacentElement("afterbegin", preLastEl)
                cards[1].classList.remove("clone")

            }
        } else if (direction == "right") {
            if (settings.slideToScrollAll) {
                for ( let i = 0; i < cardsCount; i++) {
                    sliderCard.insertAdjacentElement("beforeend", cards[0])
                }
                
            } else {
                cards[0].remove()
                let preFirstEl = cards[0].cloneNode(true)
                preFirstEl.classList.add("clone")
                sliderCard.insertAdjacentElement("beforeend", preFirstEl)
                cards[cards.length - 2].classList.remove("clone")
            }
        }
        shuffleCard()
    }

    function autoPlaySlider() {
        if (settings.autoplay && (cards.length - 1) > cardsCount) {
            sliderInterval = setInterval(() => {
                changeSlide("right")
                console.log("next slide")
            }, settings.autoplayspeed);
            localStorage[slider.id + "interval"] = sliderInterval
        }
    }
    if (settings.autoplay) {
        autoPlaySlider()
    }

    window.onscroll = () => {
        clearInterval(localStorage[slider.id + "interval"])
        if (slider.classList.contains("_active-anim")) {
            autoPlaySlider()
        }
    }

    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "interval"])
    }
    slider.onmouseleave = () => {
        autoPlaySlider()
    }
}

infinitySlider(".slider", sliderProps)
infinitySlider(".sliderBrands", sliderProppsBrands)







//popup
const popupLinks = document.querySelectorAll('.popup-link'),
    body = document.querySelector('body'),
    lockPadding = document.querySelectorAll('.lock-padding'),
    timeout = 800
    
    let unlock = true
    
    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++){
            const popupLink = popupLinks[i]
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '')
                const curentPopup = document.getElementById(popupName)
                popupOpen(curentPopup)
                e.preventDefault()
            })
        }
    }
    
    
const popupCloseIkon = document.querySelectorAll('.close-popup')
if (popupCloseIkon.length > 0) {
    for (let i = 0; i < popupCloseIkon.length; i++) {
        const el = popupCloseIkon[i]
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
            e.preventDefault()
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open')
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup-content')) {
                popupClose(e.target.closest(".popup"))
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px'

    for ( let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i]
        el.style.paddingRight = lockPaddingValue
    }
    body.style.paddingRight = lockPaddingValue
    body.classList.add('lock')

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


