class InfinitySlider {
    constructor(selector, settings = {}) {
        this.settings = {
            ...InfinitySlider.defoltSettings,
            ...settings
        }
        this.positionCards = 0
        this.slider = document.querySelector(selector)
        this.sliderCard = this.slider.querySelector(".slider-card")
        this.sliderWidth,
        this.cards = this.sliderCard.children
        this.heightCards,
        this.realCardsLenth = this.cards.length
        this.widthCards
        this.btnLeft
        this.btnRight
        this.distanceCards
        this.cloneCard
        this.cardsCount
        this.sliderInterval
        this.maxHeight
        this.sliderDots
        this.touchPoint
        this.dot
    }

    static defoltSettings = {
        slideToScrollAll: false,
        dots: false,
        distanceDots: 0,
        fadeOut: false,
        gap: 0,
        autoplay: false,
        arrows: false,
        autoplayspeed: 3000,
        baseCardWidth: null,
        transitionslider: "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
    }


    init() {
        this.sliderWidth = this.sliderCard.getBoundingClientRect().width

        if (this.settings.baseCardWidth == null) {
            this.settings.baseCardWidth = this.sliderWidth + 'px'
        }

        this.slider.querySelectorAll(".clone").forEach(clone => {
            clone.remove()
        })

        if ((localStorage[this.slider.id + "interval"])) {
            clearInterval(localStorage[this.slider.id + "interval"])
        }

        this.slider.style.position = "relative"
        this.sliderCard.style.position = "relative"
        this.sliderCard.style.width = "100%"
        this.sliderCard.style.overflow = "hidden"

        this.cardsCount = Math.floor(this.sliderWidth / (parseInt(this.settings.baseCardWidth) + this.settings.gap))
        if (this.cardsCount == 0) this.cardsCount = 1
        
        this.distanceCards = this.settings.gap
        this.widthCards = (this.sliderWidth - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount

        this.positionCards = 0 - (this.distanceCards + this.widthCards)

        if (this.settings.arrows) this.createArrows()
        this.btnLeft = this.slider.querySelector(".left")
        this.btnRight = this.slider.querySelector(".right")

        if (this.settings.arrows && this.cards.length <= this.cardsCount) {
            this.btnLeft.style.display = "none"
            this.btnRight.style.display = "none"
        } else if (this.settings.arrows) {
            this.btnLeft.style.display = "block"
            this.btnRight.style.display = "block"
        }

        if (this.settings.dots && this.realCardsLenth > 1) {
            this.createDots()
            this.dot = this.slider.querySelectorAll('.dot')
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].classList.contains("activeFadeSlide")) {
                    this.dot[i].classList.remove("activeFadeSlide")
                    this.cards[i].classList.remove("activeFadeSlide")
                }
            }
            this.dot[0].classList.add("activeFadeSlide")
            this.cards[0].classList.add("activeFadeSlide")
        }

        if (!this.settings.fadeOut) {
            this.createClone()
            this.shuffleCard()
        }
        this.cards = this.sliderCard.children
        
        this.heightCards = 0

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].style.width = this.widthCards + 'px'
            this.cards[i].style.position = "absolute"
            this.maxHeight = this.cards[i].getBoundingClientRect().height
            if (this.maxHeight > this.heightCards) {
                this.heightCards = this.maxHeight
            }

            this.cards[i].style.transition = 'none'
            setTimeout(() => {
                this.cards[i].style.transition = this.settings.transitionslider
            }, 1);
        }

        this.sliderCard.style.height = this.heightCards + 'px'
    

        if (this.settings.dots) {
            this.createDots()
        }

        this.dot = this.slider.querySelectorAll('.dot')

        this.dot.forEach(element => {
            element.onclick = () => {
                clearInterval(localStorage[this.slider.id + "interval"])
                for (let i = 0; i < this.realCardsLenth; i++) {
                    this.dot[i].classList.remove("activeFadeSlide")
                    this.cards[i].classList.remove("activeFadeSlide")
                }
                this.cards[element.dataset.order].classList.add("activeFadeSlide")
                element.classList.add("activeFadeSlide")
            }
        })


        if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
            this.autoPlaySlider()
        }

        this.slider.addEventListener('touchend', () => {
            if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
                this.autoPlaySlider()
            }
        })

        this.touchSlider = this.touchSlider.bind(this)

        this.slider.addEventListener('touchstart', (e) => {
            this.touchPoint = e.touches[0].pageX
            this.slider.addEventListener('touchmove', this.touchSlider)
            clearInterval(localStorage[this.slider.id + "interval"])
        })

        this.slider.onmouseenter = () => {
            clearInterval(localStorage[this.slider.id + "interval"])
        }
        this.slider.onmouseleave = () => {
            if (this.settings.autoplay && this.realCardsLenth > this.cardsCount) {
                this.autoPlaySlider()
            }
        }
    }

    createArrows() {
        const arrowsExist = this.slider.querySelectorAll(".cards-slider").length

        if (arrowsExist < 1) {
            let clickAllowed = true
            this.btnLeft = document.createElement("span")
            this.btnRight = document.createElement("span")
            this.btnLeft.className = "cards-slider left"
            this.btnRight.className = "cards-slider right"
            this.slider.insertAdjacentElement("afterbegin", this.btnLeft)
            this.slider.insertAdjacentElement("beforeend", this.btnRight)

            this.btnLeft.onclick = () => {

                if (clickAllowed) {

                    this.changeSlide('left')
                    clickAllowed = false

                    setTimeout(() => {
                        clickAllowed = true
                    }, parseFloat(this.cards[0].style.transitionDuration) * 1000);
                }
            }

            this.btnRight.onclick = () => {
                if (clickAllowed) {
                    this.changeSlide("right")

                    clickAllowed = false
                    setTimeout(() => {
                        clickAllowed = true
                    }, parseFloat(this.cards[0].style.transitionDuration) * 1000);
                }
            }
        }

    }

    createClone() {
        let counter = 1
        do {
            this.cloneCard = this.cards[this.cards.length - counter].cloneNode(true)
            this.cloneCard.classList.add("clone")
            this.cloneCard.style.transition = "none"
            this.sliderCard.insertAdjacentElement("afterbegin", this.cloneCard)
            this.realCardsLenth = this.cards.length - this.slider.querySelectorAll(".clone").length
            counter++
        } while (counter <= this.realCardsLenth && this.settings.slideToScrollAll)

        if (this.settings.slideToScrollAll) {
            counter = 0
            while (counter < this.realCardsLenth) {
                this.cloneCard = this.cards[counter].cloneNode(true)
                this.cloneCard.classList.add("clone")
                this.cloneCard.style.transition = "none"
                this.sliderCard.insertAdjacentElement("beforeend", this.cloneCard)
                counter++
            }
        }
    }

    createDots() {
        const dotsExist = this.slider.querySelectorAll(".dot-container").length
        if (dotsExist < 1) {
            this.sliderDots = document.createElement("div")
            this.sliderDots.className = "dot-container"
            this.sliderDots.style.position = "absolute"
            this.slider.insertAdjacentElement("beforeend", this.sliderDots)
            for (let i = 0; i < this.realCardsLenth; i++) {
                const dot = document.createElement("span")
                dot.className = "dot"
                dot.dataset.order = i
                this.sliderDots.insertAdjacentElement("beforeend", dot)
            }
        }
    }
    shuffleCard() {
        this.positionCards = 0 - (this.distanceCards + this.widthCards)
        this.cards = this.sliderCard.children

        if (this.settings.slideToScrollAll) {
            this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLenth
        }
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].style.left = this.positionCards + 'px'
            this.positionCards += (this.distanceCards + this.widthCards)
        }
    }

    changeSlide(direction) {
        this.sliderWidth = this.sliderCard.getBoundingClientRect().width
        this.cardsCount = Math.floor(this.sliderWidth / (parseInt(this.settings.baseCardWidth) + this.settings.gap))
        
        if (this.cardsCount == 0) this.cardsCount = 1
        this.widthCards = (this.sliderWidth - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount
        this.cards = this.sliderCard.children

        let numGuote = 0
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].classList.contains("activeFadeSlide")) {
                numGuote = i
            }
        }
        if (direction == "left") {
            if (this.settings.slideToScrollAll) {
                for (let i = 0; i < this.cardsCount; i++) {
                    this.sliderCard.insertAdjacentElement("afterbegin", this.cards[this.cards.length - 1])
                }
            } else if (this.settings.fadeOut) {
                setTimeout(() => this.cards[numGuote].classList.add("activeFadeSlide"), 1000)
                setTimeout(() => this.dot[numGuote].classList.add("activeFadeSlide"), 1000)
                this.cards[numGuote].classList.remove("activeFadeSlide")
                this.dot[numGuote].classList.remove("activeFadeSlide")
                if (this.cards[numGuote - 1]) {
                    numGuote--
                } else {
                    numGuote = this.cards.length - 1
                }
            } else {
                this.cards[this.cards.length - 1].remove()
                let preLastEl = this.cards[this.cards.length - 1].cloneNode(true)
                preLastEl.classList.add("clone")
                this.sliderCard.insertAdjacentElement("afterbegin", preLastEl)
                this.cards[1].classList.remove("clone")
            }
        } else if (direction == "right") {
            if (this.settings.slideToScrollAll) {
                for (let i = 0; i < this.cardsCount; i++) {
                    this.sliderCard.insertAdjacentElement("beforeend", this.cards[0])
                }

            } else if (this.settings.fadeOut) {
                setTimeout(() => this.cards[numGuote].classList.add("activeFadeSlide"), 1000)
                setTimeout(() => this.dot[numGuote].classList.add("activeFadeSlide"), 1000)
                this.cards[numGuote].classList.remove("activeFadeSlide")
                this.dot[numGuote].classList.remove("activeFadeSlide")
                if (this.cards[numGuote + 1]) {
                    numGuote++
                } else {
                    numGuote = 0
                }

            } else {
                this.cards[0].remove()
                let preFirstEl = this.cards[0].cloneNode(true)
                preFirstEl.classList.add("clone")
                this.sliderCard.insertAdjacentElement("beforeend", preFirstEl)
                this.cards[this.cards.length - 2].classList.remove("clone")
            }
        }
        if (!this.settings.fadeOut) {
            this.shuffleCard()
        }
    }

    autoPlaySlider() {
        clearInterval(localStorage[this.slider.id + "interval"])

        if (this.settings.fadeOut) {
            let numGuote = 0
            for (let i = 0; i < this.cards.length; i++) {
                if (this.cards[i].classList.contains("activeFadeSlide")) {
                    numGuote = i
                }
            }
            const setActive = (index) => {
                setTimeout(() => this.cards[index].classList.add("activeFadeSlide"), 1000)
                setTimeout(() => this.dot[index].classList.add("activeFadeSlide"), 1000)
            }
            this.sliderInterval = setInterval(() => {
                this.cards[numGuote].classList.remove("activeFadeSlide")
                this.dot[numGuote].classList.remove("activeFadeSlide")
                if (this.cards[numGuote + 1]) {
                    numGuote++
                } else {
                    numGuote = 0
                }
                setActive(numGuote)
            }, this.settings.autoplayspeed)
        } else {
            this.sliderInterval = setInterval(() => {
                this.changeSlide("right")
            }, this.settings.autoplayspeed)
        }
        localStorage[this.slider.id + "interval"] = this.sliderInterval
    }

    touchSlider(e) {
        if ((this.touchPoint + 20) < e.touches[0].pageX) {
            this.changeSlide('left')
            this.slider.removeEventListener('touchmove', this.touchSlider)

        } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
            this.changeSlide('right')
            this.slider.removeEventListener('touchmove', this.touchSlider)
        }
    }
}

window.onresize = function () {
    sliderPeople.init()
    sliderBrands.init()
    sliderQuotes.init()
}

let sliderPeople = new InfinitySlider(".slider", {
    arrows: true,
    baseCardWidth: "263rem",
    slideToScrollAll: true,
    autoplay: false,
    gap: 20
})
let sliderBrands = new InfinitySlider(".sliderBrands", {
    gap: 45,
    slideToScrollAll: true,
    baseCardWidth: "127rem",
    autoplay: true,
    arrows: false
})
let sliderQuotes = new InfinitySlider(".sliderQuotes", {
    autoplay: true,
    autoplayspeed: 4000,
    fadeOut: true,
    dots: true,
    distanceDots: 40,
    arrows: false
})

sliderPeople.init()
sliderBrands.init()
sliderQuotes.init()