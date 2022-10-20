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
    arrows: true,
    baseCardWidth: "263rem",
    slideToScrollAll: true,
    autoplay: true,
    gap: 20

}

const sliderProppsBrands = {
    gap: 45,
    slideToScrollAll: true,
    baseCardWidth: "127rem",
    autoplay: true
}
const sliderQuotes = {
    autoplay: true,
    autoplayspeed: 4000,
    fadeOut: true,
    dots: true,
    distanceDots: 40
}

window.onresize = function () {
    infinitySlider(".slider", sliderProps)
    infinitySlider(".sliderBrands", sliderProppsBrands)
    infinitySlider(".sliderQuotes", sliderQuotes)

}

infinitySlider(".slider", sliderProps)
infinitySlider(".sliderBrands", sliderProppsBrands)
infinitySlider(".sliderQuotes", sliderQuotes)

function infinitySlider(selector, settings) {
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
        heightCards = 0,
        cardsCount,
        sliderInterval,
        realCardsLenth = cards.length,
        maxHeight,
        sliderDots,
        defoltSettings = {
            slideToScrollAll: false,
            dots: false,
            distanceDots: 0,
            fadeOut: false,
            gap: 0,
            autoplay: false,
            arrows: false,
            autoplayspeed: 3000,
            baseCardWidth: sliderWidth + "px",
            transitionslider: "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
        }


    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    })

    if ((localStorage[slider.id + "interval"])) {
        clearInterval(localStorage[slider.id + "interval"])
    }

    slider.style.position = "relative"
    sliderCard.style.position = "relative"
    sliderCard.style.width = "100%"
    sliderCard.style.overflow = "hidden"

    // let connect = Object.assign(settings, defoltSettings)
    settings = {
        ...defoltSettings,
        ...settings
    } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає

    cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
    console.log(cardsCount)

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

    if (settings.dots && realCardsLenth > 1) {
        createDots()
        dot = document.querySelectorAll('.dot')
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains("activeFadeSlide")) {
                dot[i].classList.remove("activeFadeSlide")
                cards[i].classList.remove("activeFadeSlide")
            }
        }
        dot[0].classList.add("activeFadeSlide")
        cards[0].classList.add("activeFadeSlide")
    }

    if (!settings.fadeOut) {
        createClone()
        shuffleCard()
    }

    function createClone() {
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
    }


    cards = sliderCard.children

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
        cards[i].style.position = "absolute"
        maxHeight = cards[i].getBoundingClientRect().height
        if (maxHeight > heightCards) {
            heightCards = maxHeight
        }

        setTimeout(() => {
            cards[i].style.transition = settings.transitionslider
        }, 1300);

    }

    sliderCard.style.height = heightCards + 'px'

    function createArrows() {
        const arrowsExist = slider.querySelectorAll(".cards-slider").length

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

    function createDots() {
        const dotsExist = slider.querySelectorAll(".dot-container").length
        if (dotsExist < 1) {
            sliderDots = document.createElement("div")
            sliderDots.className = "dot-container"
            sliderDots.style.position = "absolute"
            slider.insertAdjacentElement("beforeend", sliderDots)
            for (let i = 0; i < realCardsLenth; i++) {
                const dot = document.createElement("span")
                dot.className = "dot"
                dot.dataset.order = i
                sliderDots.insertAdjacentElement("beforeend", dot)
            }
        }
    }

    // if (settings.dots) {
    //     createDots()
    // }

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




    function changeSlide(direction) {
        sliderWidth = sliderCard.getBoundingClientRect().width
        cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
        widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
        cards = sliderCard.children

        if (direction == "left") {
            if (settings.slideToScrollAll) {
                for (let i = 0; i < cardsCount; i++) {
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
                for (let i = 0; i < cardsCount; i++) {
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


    // function autoPlaySlider() {
    //     clearInterval(localStorage[slider.id + "interval"])

    //     if (settings.fadeOut) {
    //         let numGuote = 0
    //         for (let i = 0; i < cards.length; i++) {
    //             if (cards[i].classList.contains("activeFadeSlide")) {
    //                 numGuote = i
    //             }
    //         }
    //         const setActive = (i) => {
    //             setTimeout(() => cards[i].classList.add("activeFadeSlide"), 1000)
    //             setTimeout(() => dot[i].classList.add("activeFadeSlide"), 1000)
    //         }

    //         sliderInterval = setInterval(() => {
    //             cards[numGuote].classList.remove("activeFadeSlide")
    //             dot[numGuote].classList.remove("activeFadeSlide")

    //             if (cards[numGuote + 1]) {
    //                 numGuote++
    //             } else {
    //                 numGuote = 0
    //             }
    //             setActive(numGuote)
    //         }, settings.autoplayspeed)
    //     } else {
    //         sliderInterval = setInterval(() => {
    //             changeSlide("right")
    //         }, settings.autoplayspeed);

    //     }
    //     localStorage[slider.id + "interval"] = sliderInterval
    // }

    function autoPlaySlider() {
        clearInterval(localStorage[slider.id + "interval"])
        if (settings.fadeOut) {
            let numGuote = 0
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains("activeFadeSlide")) {
                    numGuote = i
                }
            }
            const setActive = (index) => {
                setTimeout(() => cards[index].classList.add("activeFadeSlide"), 1000)
                setTimeout(() => dot[index].classList.add("activeFadeSlide"), 1000)
            }
            sliderInterval = setInterval(() => {
                cards[numGuote].classList.remove("activeFadeSlide")
                dot[numGuote].classList.remove("activeFadeSlide")
                if (cards[numGuote + 1]) {
                    numGuote++
                } else {
                    numGuote = 0
                }
                setActive(numGuote)
            }, settings.autoplayspeed)
        } else {
            sliderInterval = setInterval(() => {
                changeSlide("right")
                console.log("next slide")
            }, settings.autoplayspeed)
        }
        localStorage[slider.id + "interval"] = sliderInterval
    }
    if (settings.autoplay && realCardsLenth > cardsCount) {
        autoPlaySlider()
    }

    dot = document.querySelectorAll('.dot')
    dot.forEach(element => {
        element.onclick = function () {
            clearInterval(localStorage[slider.id + "interval"])
            for (let i = 0; i < realCardsLenth; i++) {
                dot[i].classList.remove("activeFadeSlide")
                cards[i].classList.remove("activeFadeSlide")
            }
            cards[element.dataset.order].classList.add("activeFadeSlide")
            element.classList.add("activeFadeSlide")
        }
    })



    if (settings.autoplay && realCardsLenth > cardsCount) {
        autoPlaySlider()
    }


    // window.onscroll = () => {
    //     clearInterval(localStorage[slider.id + "interval"])
    //     if (slider.classList.contains("_active-anim")) {
    //         autoPlaySlider()
    //     }
    // }

    slider.onmouseenter = () => {
        clearInterval(localStorage[slider.id + "interval"])
    }
    slider.onmouseleave = () => {
        if (settings.autoplay && realCardsLenth > cardsCount) {
            autoPlaySlider()
        }
    }
}