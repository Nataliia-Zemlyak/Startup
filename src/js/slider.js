const sliderProps = {
    arrows: true
}


function infinitySlider(selector, settings) { //селектор шлях до слайдера а сетінгс не стандартні налаштування

    let btnLeft,
        btnRight,
        slider = document.querySelector(selector)
    window.onload = function () {
        if (settings.arrows) {
            btnLeft = document.createElement("span")
            btnRight = document.createElement("span")
            btnLeft.className = "cards-slider left"
            btnRight.className = "cards-slider right"
            slider.insertAdjacentElement("afterbegin", btnLeft)
            slider.insertAdjacentElement("beforeend", btnRight)
            // btnLeft = slider.querySelector(".left")
            // btnRight = slider.querySelector(".right")
            
            btnLeft.onclick = function () {
                changeSlide("left")
            }
            btnRight.onclick = function () {
                changeSlide("right")
            }
        }
    }
    btnLeft = slider.querySelector(".left")
    btnRight = slider.querySelector(".right")
    
    // console.log(sled, btnRight)
    
    let positionCards = 0,
        sliderCard = slider.querySelector(".slider-card"),
        sliderWidth = sliderCard.getBoundingClientRect().width,
        cards = sliderCard.children,
        widthCards,
        distanceCards,
        cloneCard,
        heightCards,
        constCardWidth,
        cardsCount,
        defoltSettings = {
            slideToScrollAll: false,
            gap: 20, //vidstan
            autoplay: true,
            arrows: false, //strilochka
            autoplayspeed: 3000
        }

    if (localStorage[slider.id]) {
        constCardWidth = localStorage[slider.id]
    } else {
        constCardWidth = cards[0].getBoundingClientRect().width
        localStorage[slider.id] = constCardWidth
    }
    cardsCount = Math.floor(sliderWidth / constCardWidth)
    slider.querySelectorAll(".clone").forEach(clone => {
        clone.remove()
    })
    // let connect = Object.assign(settings, defoltSettings)
    settings = {
        ...defoltSettings,
        ...settings
    } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає
    distanceCards = settings.gap
    widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
    positionCards = 0 - (distanceCards + widthCards)
    let counter = 1
    do {
        cloneCard = cards[cards.length - counter].cloneNode(true)
        cloneCard.classList.add("clone")
        cloneCard.style.transition = "none"
        sliderCard.insertAdjacentElement("afterbegin", cloneCard)
        counter++
    } while (counter <= cardsCount && settings.slideToScrollAll)

    // console.log(cardsCount)

    cards = sliderCard.children
    if (cloneCard.classList.contains("clone")) {
        setTimeout(() => {
            cloneCard.style.transition = "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
        }, 1)
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = widthCards + 'px'
    }
    heightCards = cards[0].getBoundingClientRect().height
    sliderCard.style.height = heightCards + 'px'

    
    if (settings.arrows && (cards.length - 1) <= cardsCount) {
        btnLeft.style.display = "none"
        btnRight.style.display = "none"
    } else if (settings.arrows) {
        btnLeft.style.display = "block"
        btnRight.style.display = "block"

    }


    function shuffleCard() {
        positionCards = 0 - (distanceCards + widthCards)
        cards = sliderCard.children
        //console.log(cardsCount)
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.left = positionCards + 'px'
            positionCards += (distanceCards + widthCards)
        }
    }
    shuffleCard()

    function changeSlide(direction) {
        if (direction == "left") {
            cards[cards.length - 1].remove()
            let preLastEl = cards[cards.length - 1].cloneNode(true)
            preLastEl.classList.add("clone")
            sliderCard.insertAdjacentElement("afterbegin", preLastEl)
            cards[1].classList.remove("clone")
        } else if (direction == "right") {
            cards[0].remove()
            let preFirstEl = cards[0].cloneNode(true)
            preFirstEl.classList.add("clone")
            sliderCard.insertAdjacentElement("beforeend", preFirstEl)
            cards[cards.length - 2].classList.remove("clone")
            //console.log()
        }
        shuffleCard()
    }
}

window.onresize = function () {
    infinitySlider(".slider", sliderProps)
}

infinitySlider(".slider", sliderProps)