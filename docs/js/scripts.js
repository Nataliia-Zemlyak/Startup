// function ajaxForm(form, method, requesrURL) {
//     const promise = new Promise((resolve, reject) => {
//         let data = new FormData(form)
//         fetch(requesrURL, {
//             method: method,
//             body: data
//         }).then(response => {
//             if (response.ok) {
//                 form.reset()
//                 return resolve(response)
//             } else {
//                 return reject(response)
//             }
//         })
//     })
//     return promise
// }
// document.querySelector('#contactForm').onsubmit = function (e) { //id форми
//     e.preventDefault()
//     ajaxForm(this, 'post', "../docs/php/getStarted.php") //method, action
//         .then(response => { //може бути 1 then. все що після відправки
//             return response.text()
//         }).then(response => {
//             console.log(response)
//         })
// }






// const form = document.querySelector('form')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const formData = new FormData(form)
//     for (item of formData) {
//         console.log(item[0], item[1]);
//     }
//     fetch('../docs/php/getStarted.php', {
//         method: "POST",
//         body: formData
//         // headers: {
//         //     "Content-Type": "application/json"
//         // }
//     })
//     .then(response => {
//         if (response.ok) return response
//         return response.then(error => {
//             console.log(error)
//         })
//     })
// })
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
zoomPhotoBlogPost('.img-zoom')

function zoomPhotoBlogPost(classImg) {
    const zoomCont = document.querySelectorAll(classImg)
    if (zoomCont.length) {
        zoomCont.forEach(element => {
            const zoomImg = element.querySelector('img')
            element.style.overflow = 'hidden'
            element.onmouseenter = function (e) {
                zoomImg.style.transform = 'scale(2)'
            }
            element.onmousemove = function (e) {
                let originX = (e.clientX - element.getBoundingClientRect().left) / element.getBoundingClientRect().width * 100,
                    originY = (e.clientY - element.getBoundingClientRect().top) / element.getBoundingClientRect().height * 100

                zoomImg.style.transformOrigin = originX + '% ' + originY + '%'
            }
            element.onmouseleave = function (e) {
                zoomImg.style.transform = 'scale(1)'
            }
        })
    }
}
class Shop {
    constructor() {
        this.basketItems,
            this.counter,
            this.basketCounter = document.querySelector('.basket-counter'),
            this.tableProduct = document.querySelector('.tableProduct'),
            this.popupInfo = document.querySelector('.popupInfo'),
            this.totalPriceProduct = document.querySelector('.totalPriceProduct'),
            this.totalPrice = document.querySelector('.totalPrice')
    }

    init() {
        fetch("goods.json")
            .then(response => {
                return response.json();
            })
            .then(response => {
                for (let [key, value] of Object.entries(response)) {
                    let shopBlock = document.querySelector('.shopBlock'),
                        shopCard = document.createElement("div"),
                        cardsHover = document.createElement("div"),
                        nameCards = document.createElement("p"),
                        categoryCards = document.createElement("p"),
                        costCards = document.createElement("p"),
                        btnCards = document.createElement("a"),
                        imgCards = document.createElement('img')

                    shopCard.style.position = 'relative'
                    shopCard.className = "worksCards"
                    shopCard.dataset.filter = value.category
                    cardsHover.className = "worksCardsHover flex"
                    nameCards.className = "name"
                    categoryCards.className = "category"
                    costCards.className = "cost"
                    btnCards.className = 'addToCard'
                    imgCards.src = value.src
                    imgCards.alt = value.alt
                    shopCard.appendChild(imgCards)
                    nameCards.innerText = value.name
                    categoryCards.innerText = value.category

                    costCards.innerText = value.cost + ' $'
                    btnCards.innerText = "Add to card"
                    btnCards.href = value.href
                    btnCards.dataset.id = key

                    cardsHover.appendChild(nameCards)
                    cardsHover.appendChild(categoryCards)
                    cardsHover.appendChild(costCards)
                    cardsHover.appendChild(btnCards)
                    shopCard.appendChild(cardsHover)
                    shopBlock.appendChild(shopCard)

                    this.translateToCard(btnCards)
                }
                this.filterCardCategory()
            })
        if (localStorage["basketItems"]) {
            this.basketItems = JSON.parse(localStorage["basketItems"])
            this.showElement()
            this.totalPriceCard()
        } else {
            this.basketItems = {}
        }
        this.showToCardsInBasket()
    }

    showElement() {
        if (Object.keys(this.basketItems).length) {
            this.counter = Object.keys(this.basketItems).length
            this.basketCounter.innerHTML = this.counter
            this.basketCounter.style.opacity = "1"
            this.tableProduct.style.display = "block"
            this.popupInfo.style.display = "none"
            this.totalPriceProduct.style.display = "flex"
        } else {
            this.basketCounter.style.opacity = "0"
            this.tableProduct.style.display = "none"
            this.popupInfo.style.display = "block"
            this.totalPriceProduct.style.display = "none"
        }
    }

    translateToCard(event) {
        event.onclick = (event) => {
            event.preventDefault()
            let worksShopCard = event.target.closest(".worksCards"),
                cloneTop = worksShopCard.getBoundingClientRect().top,
                cloneLeft = worksShopCard.getBoundingClientRect().left,
                basket = document.querySelector('.basket'),
                basketTop = basket.getBoundingClientRect().top,
                basketLeft = basket.getBoundingClientRect().left,
                cloneShopCard = worksShopCard.cloneNode(true),
                imgCloneCard,
                nameCloneCard,
                costCloneCard,
                idCloneCard,
                altCloneCard

            cloneShopCard.style.position = "fixed"
            cloneShopCard.style.transition = 'all .5s ease'
            cloneShopCard.style.left = cloneLeft + 'px'
            cloneShopCard.style.top = cloneTop + 'px'

            document.body.appendChild(cloneShopCard)

            setTimeout(() => {
                cloneShopCard.style.left = basketLeft + 'px'
                cloneShopCard.style.top = basketTop + 'px'
                setTimeout(() => {
                    cloneShopCard.remove()
                    imgCloneCard = cloneShopCard.querySelector('img').src
                    altCloneCard = cloneShopCard.querySelector('img').alt
                    nameCloneCard = cloneShopCard.querySelector('.name').innerHTML
                    costCloneCard = cloneShopCard.querySelector('.cost').innerHTML
                    idCloneCard = cloneShopCard.querySelector('.addToCard').dataset.id

                    if (idCloneCard in this.basketItems) {
                        this.basketItems[idCloneCard].counter++
                    } else {
                        this.basketItems[idCloneCard] = {
                            "img": imgCloneCard,
                            "name": nameCloneCard,
                            "cost": costCloneCard,
                            "alt": altCloneCard,
                            "counter": 1
                        }
                        this.counter = Object.keys(this.basketItems).length
                        this.basketCounter.innerHTML = this.counter
                    }

                    localStorage["basketItems"] = JSON.stringify(this.basketItems)
                    this.showToCardsInBasket()
                    this.showElement()
                    this.totalPriceCard()
                }, 500);
            }, 100);
        }
    }

    showToCardsInBasket() {
        let productInBasket = document.querySelector('.productInBasket'),
            tableBody = ""

        for (const [key, value] of Object.entries(this.basketItems)) {
            tableBody += `
            <tr class="prodBasket">
                <td class="photo-product"><img src="${value.img}" alt="${value.alt}"></td>
                <td>${value.name}</td>
                <td>${value.cost}</td>
                <td class="count-product">
                    <div class="flex">
                        <input type="button" value="-" class="minusProduct" data-id="${key}">
                        <input type="number" value="${value.counter}" class="counter-product" data-id="${key}">
                        <input type="button" value="+" class="plusProduct" data-id="${key}">
                    </div>
                </td>
                <td class="priceCard">
                    ${parseInt(value.counter) * parseInt(value.cost) + ' $'}</td>
                <td><a href="#" class='deleteCard' data-id="${key}">+</a></td>
            </tr>
        `
            localStorage['basketItems'] = JSON.stringify(this.basketItems)
        }
        this.totalPriceCard()
        productInBasket.innerHTML = tableBody

        let plusButton = document.querySelectorAll('.plusProduct'),
            minusButton = document.querySelectorAll('.minusProduct'),
            deleteCard = document.querySelectorAll('.deleteCard'),
            counterProducts = document.querySelectorAll('.counter-product')

        plusButton.forEach(e => {
            e.onclick = () => {
                let cardShop = e.closest('.prodBasket'),
                    cardId = e.getAttribute("data-id"),
                    counterProduct = cardShop.querySelector('.counter-product'),
                    priceCard = cardShop.querySelector('.priceCard');

                this.basketItems[cardId].counter++
                counterProduct.value = this.basketItems[cardId].counter
                priceCard.innerHTML = `${parseInt(this.basketItems[cardId].counter) * parseInt(this.basketItems[cardId].cost)} $`
                this.totalPriceCard()
                localStorage['basketItems'] = JSON.stringify(this.basketItems)
            }
        })

        minusButton.forEach(e => {
            e.onclick = () => {
                let cardShop = e.closest('.prodBasket'),
                    cardId = e.getAttribute("data-id"),
                    counterProduct = cardShop.querySelector('.counter-product'),
                    priceCard = cardShop.querySelector('.priceCard');

                if (this.basketItems[cardId].counter > 1) {
                    this.basketItems[cardId].counter--
                    counterProduct.value = this.basketItems[cardId].counter
                }
                priceCard.innerHTML = `${parseInt(this.basketItems[cardId].counter) * parseInt(this.basketItems[cardId].cost)} $`
                this.totalPriceCard()
                localStorage['basketItems'] = JSON.stringify(this.basketItems)
            }
        })

        deleteCard.forEach(e => {
            e.onclick = (el) => {
                el.stopPropagation()
                let cardShop = e.closest('.prodBasket'),
                    cardId = e.getAttribute("data-id")

                delete this.basketItems[cardId]
                cardShop.remove()
                localStorage['basketItems'] = JSON.stringify(this.basketItems)
                this.showElement()
                this.totalPriceCard()
            }
        })

        counterProducts.forEach(e => {
            e.oninput = () => {
                let cardShop = e.closest('.prodBasket'),
                    cardId = e.getAttribute("data-id"),
                    priceCard = cardShop.querySelector('.priceCard')
                this.basketItems[cardId].counter = e.value
                e.value = this.basketItems[cardId].counter
                priceCard.innerHTML = `${parseInt(this.basketItems[cardId].counter) * parseInt(this.basketItems[cardId].cost)}$`
                localStorage["basketItems"] = JSON.stringify(this.basketItems)
                this.showElement()
                this.totalPriceCard()
            }
        })
    }

    totalPriceCard() {
        let sumPrice = 0
        for (const [key, value] of Object.entries(this.basketItems)) {
            sumPrice += parseInt(value.counter) * parseInt(value.cost)
        }
        this.totalPrice.innerHTML = sumPrice + ' $'
    }

    filterCardCategory() {
        const btnFilter = document.querySelectorAll(".filter-category")
        const cardsFilter = document.querySelectorAll(".worksCards")
        if (localStorage['selectedCategory']) {
            this.filter(localStorage['selectedCategory'], cardsFilter)
            btnFilter.forEach(el => {
                if (el.dataset.filter == localStorage['selectedCategory']) {
                    el.classList.add('active_color')
                }
            })
        }

        btnFilter.forEach((el) => {
            el.addEventListener("click", (e) => {
                btnFilter.forEach(el => {
                    el.classList.remove('active_color')
                })
                e.preventDefault()
                el.classList.add('active_color')

                const currentCategory = el.dataset.filter
                this.filter(currentCategory, cardsFilter)
                localStorage['selectedCategory'] = currentCategory
            })
        })
    }

    filter(category, items) {
        items.forEach((item) => {
            const filterCategory = item.querySelector('p.category').innerHTML.toLowerCase() == category
            const isShowAll = category.toLowerCase() === 'all'
            if (!filterCategory && !isShowAll) {
                item.classList.add('anim-worksCards')
            } else {
                item.classList.remove('anim-worksCards')
                this.animationCardsShop(item)
            }
        })
    }

    animationCardsShop(obj) {
        let img = obj.querySelector('img'),
            gridX = 10,
            gridY = 10,
            imgW = img.getBoundingClientRect().width,
            imgH = img.getBoundingClientRect().height

        function createSpan() {
            // let hoverCart = obj.querySelectorAll('.worksCardsHover')
            for (let x = 0; x < gridX; x++) {
                for (let y = 0; y < gridY; y++) {
                    let span = document.createElement('span'),
                        width = imgW / gridX + 'px',
                        height = imgH / gridY + 'px',
                        top = imgH / gridY * y + 'px',
                        left = imgW / gridX * x + 'px',
                        bgPosX = -(imgW / gridX * x) + 'px',
                        bgPosY = -(imgH / gridY * y) + 'px'

                    span.style.backgroundImage = `url(${img.src})`
                    span.style.display = 'inline-block'
                    span.style.backgroundRepeat = 'no-repeat'
                    span.style.position = 'absolute'
                    span.style.top = top
                    span.style.left = left
                    span.style.width = width
                    span.style.height = height
                    span.style.backgroundPosition = bgPosX + " " + bgPosY
                    span.style.transition = `all ${(rand(0, 10))/10}s ease ${(rand(0, 10))/10}s`
                    span.style.top = `${rand(-window.innerHeight, window.innerHeight)}px`
                    span.style.left = `${rand(-window.innerHeight, window.innerHeight)}px`
                    img.style.opacity = '0'
                    // hoverCart.style.opacity = '0'

                    obj.appendChild(span)

                    setTimeout(() => {
                        span.remove()
                        img.style.opacity = '1'
                        // hoverCart.style.opacity = '1'
                    }, 3000);

                }
            }
        }
        createSpan()

        const spans = obj.querySelectorAll('span');
        setInterval(() => {
            let index = 0;
            for (let i = 0; i < gridX; i++) {
                for (let j = 0; j < gridY; j++) {
                    const span = spans[index];
                    index++;
                    span.style.top = imgH / gridY * j + 'px'
                    span.style.left = imgW / gridX * i + 'px'
                    span.style.opacity = "1";
                }
            }
        }, 100);
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

new Shop().init()
window.onload = function () {

}
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
function formInfo() {
    let sendMessage = document.querySelector('#sendMessage'),
        popupAgree = document.querySelector('.popupAgree'),
        userName = document.querySelector('.userName'),
        userMail = document.querySelector('.userMail'),
        userPhone = document.querySelector('.userPhone'),
        usercompany = document.querySelector('.usercompany'),
        userMessage = document.querySelector('.userMessage'),
        userInfo = {}

    sendMessage.onclick = function (e) {
        e.preventDefault()
        userInfo = {
            formName: document.querySelector('#formName').value,
            formMail: document.querySelector('#formMail').value,
            formTel: document.querySelector('#formTel').value,
            formCompany: document.querySelector('#formCompany').value,
            formMessage: document.querySelector('#formMessage').value
        }
        userName.innerHTML = userInfo.formName
        userMail.innerHTML = userInfo.formMail
        userPhone.innerHTML = userInfo.formTel
        usercompany.innerHTML = userInfo.formCompany
        userMessage.innerHTML = userInfo.formMessage
    }

    popupAgree.onclick = function (e) {
        e.preventDefault()
        localStorage['userInformation'] = JSON.stringify(userInfo)
    }
}

formInfo()
// async function geo () {
//     await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
    
//     }).then(result => {
//         console.log(result);
//     })
// }
// geo()
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).LazyLoad=t()}(this,(function(){"use strict";function n(){return n=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i])}return n},n.apply(this,arguments)}var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),a=t&&window.devicePixelRatio>1,r={elements_selector:".lazy",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_bg_set:"bg-set",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1,restore_on_error:!1},c=function(t){return n({},r,t)},l=function(n,t){var e,i="LazyLoad::Initialized",o=new n(t);try{e=new CustomEvent(i,{detail:{instance:o}})}catch(n){(e=document.createEvent("CustomEvent")).initCustomEvent(i,!1,!1,{instance:o})}window.dispatchEvent(e)},u="src",s="srcset",d="sizes",f="poster",_="llOriginalAttrs",g="data",v="loading",b="loaded",m="applied",p="error",h="native",E="data-",I="ll-status",y=function(n,t){return n.getAttribute(E+t)},k=function(n){return y(n,I)},w=function(n,t){return function(n,t,e){var i="data-ll-status";null!==e?n.setAttribute(i,e):n.removeAttribute(i)}(n,0,t)},A=function(n){return w(n,null)},L=function(n){return null===k(n)},O=function(n){return k(n)===h},x=[v,b,m,p],C=function(n,t,e,i){n&&(void 0===i?void 0===e?n(t):n(t,e):n(t,e,i))},N=function(n,t){o?n.classList.add(t):n.className+=(n.className?" ":"")+t},M=function(n,t){o?n.classList.remove(t):n.className=n.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},z=function(n){return n.llTempImage},T=function(n,t){if(t){var e=t._observer;e&&e.unobserve(n)}},R=function(n,t){n&&(n.loadingCount+=t)},G=function(n,t){n&&(n.toLoadCount=t)},j=function(n){for(var t,e=[],i=0;t=n.children[i];i+=1)"SOURCE"===t.tagName&&e.push(t);return e},D=function(n,t){var e=n.parentNode;e&&"PICTURE"===e.tagName&&j(e).forEach(t)},H=function(n,t){j(n).forEach(t)},V=[u],F=[u,f],B=[u,s,d],J=[g],P=function(n){return!!n[_]},S=function(n){return n[_]},U=function(n){return delete n[_]},$=function(n,t){if(!P(n)){var e={};t.forEach((function(t){e[t]=n.getAttribute(t)})),n[_]=e}},q=function(n,t){if(P(n)){var e=S(n);t.forEach((function(t){!function(n,t,e){e?n.setAttribute(t,e):n.removeAttribute(t)}(n,t,e[t])}))}},K=function(n,t,e){N(n,t.class_applied),w(n,m),e&&(t.unobserve_completed&&T(n,t),C(t.callback_applied,n,e))},Q=function(n,t,e){N(n,t.class_loading),w(n,v),e&&(R(e,1),C(t.callback_loading,n,e))},W=function(n,t,e){e&&n.setAttribute(t,e)},X=function(n,t){W(n,d,y(n,t.data_sizes)),W(n,s,y(n,t.data_srcset)),W(n,u,y(n,t.data_src))},Y={IMG:function(n,t){D(n,(function(n){$(n,B),X(n,t)})),$(n,B),X(n,t)},IFRAME:function(n,t){$(n,V),W(n,u,y(n,t.data_src))},VIDEO:function(n,t){H(n,(function(n){$(n,V),W(n,u,y(n,t.data_src))})),$(n,F),W(n,f,y(n,t.data_poster)),W(n,u,y(n,t.data_src)),n.load()},OBJECT:function(n,t){$(n,J),W(n,g,y(n,t.data_src))}},Z=["IMG","IFRAME","VIDEO","OBJECT"],nn=function(n,t){!t||function(n){return n.loadingCount>0}(t)||function(n){return n.toLoadCount>0}(t)||C(n.callback_finish,t)},tn=function(n,t,e){n.addEventListener(t,e),n.llEvLisnrs[t]=e},en=function(n,t,e){n.removeEventListener(t,e)},on=function(n){return!!n.llEvLisnrs},an=function(n){if(on(n)){var t=n.llEvLisnrs;for(var e in t){var i=t[e];en(n,e,i)}delete n.llEvLisnrs}},rn=function(n,t,e){!function(n){delete n.llTempImage}(n),R(e,-1),function(n){n&&(n.toLoadCount-=1)}(e),M(n,t.class_loading),t.unobserve_completed&&T(n,e)},cn=function(n,t,e){var i=z(n)||n;on(i)||function(n,t,e){on(n)||(n.llEvLisnrs={});var i="VIDEO"===n.tagName?"loadeddata":"load";tn(n,i,t),tn(n,"error",e)}(i,(function(o){!function(n,t,e,i){var o=O(t);rn(t,e,i),N(t,e.class_loaded),w(t,b),C(e.callback_loaded,t,i),o||nn(e,i)}(0,n,t,e),an(i)}),(function(o){!function(n,t,e,i){var o=O(t);rn(t,e,i),N(t,e.class_error),w(t,p),C(e.callback_error,t,i),e.restore_on_error&&q(t,B),o||nn(e,i)}(0,n,t,e),an(i)}))},ln=function(n,t,e){!function(n){return Z.indexOf(n.tagName)>-1}(n)?function(n,t,e){!function(n){n.llTempImage=document.createElement("IMG")}(n),cn(n,t,e),function(n){P(n)||(n[_]={backgroundImage:n.style.backgroundImage})}(n),function(n,t,e){var i=y(n,t.data_bg),o=y(n,t.data_bg_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage='url("'.concat(r,'")'),z(n).setAttribute(u,r),Q(n,t,e))}(n,t,e),function(n,t,e){var i=y(n,t.data_bg_multi),o=y(n,t.data_bg_multi_hidpi),r=a&&o?o:i;r&&(n.style.backgroundImage=r,K(n,t,e))}(n,t,e),function(n,t,e){var i=y(n,t.data_bg_set);if(i){var o=i.split("|"),a=o.map((function(n){return"image-set(".concat(n,")")}));n.style.backgroundImage=a.join(),""===n.style.backgroundImage&&(a=o.map((function(n){return"-webkit-image-set(".concat(n,")")})),n.style.backgroundImage=a.join()),K(n,t,e)}}(n,t,e)}(n,t,e):function(n,t,e){cn(n,t,e),function(n,t,e){var i=Y[n.tagName];i&&(i(n,t),Q(n,t,e))}(n,t,e)}(n,t,e)},un=function(n){n.removeAttribute(u),n.removeAttribute(s),n.removeAttribute(d)},sn=function(n){D(n,(function(n){q(n,B)})),q(n,B)},dn={IMG:sn,IFRAME:function(n){q(n,V)},VIDEO:function(n){H(n,(function(n){q(n,V)})),q(n,F),n.load()},OBJECT:function(n){q(n,J)}},fn=function(n,t){(function(n){var t=dn[n.tagName];t?t(n):function(n){if(P(n)){var t=S(n);n.style.backgroundImage=t.backgroundImage}}(n)})(n),function(n,t){L(n)||O(n)||(M(n,t.class_entered),M(n,t.class_exited),M(n,t.class_applied),M(n,t.class_loading),M(n,t.class_loaded),M(n,t.class_error))}(n,t),A(n),U(n)},_n=["IMG","IFRAME","VIDEO"],gn=function(n){return n.use_native&&"loading"in HTMLImageElement.prototype},vn=function(n,t,e){n.forEach((function(n){return function(n){return n.isIntersecting||n.intersectionRatio>0}(n)?function(n,t,e,i){var o=function(n){return x.indexOf(k(n))>=0}(n);w(n,"entered"),N(n,e.class_entered),M(n,e.class_exited),function(n,t,e){t.unobserve_entered&&T(n,e)}(n,e,i),C(e.callback_enter,n,t,i),o||ln(n,e,i)}(n.target,n,t,e):function(n,t,e,i){L(n)||(N(n,e.class_exited),function(n,t,e,i){e.cancel_on_exit&&function(n){return k(n)===v}(n)&&"IMG"===n.tagName&&(an(n),function(n){D(n,(function(n){un(n)})),un(n)}(n),sn(n),M(n,e.class_loading),R(i,-1),A(n),C(e.callback_cancel,n,t,i))}(n,t,e,i),C(e.callback_exit,n,t,i))}(n.target,n,t,e)}))},bn=function(n){return Array.prototype.slice.call(n)},mn=function(n){return n.container.querySelectorAll(n.elements_selector)},pn=function(n){return function(n){return k(n)===p}(n)},hn=function(n,t){return function(n){return bn(n).filter(L)}(n||mn(t))},En=function(n,e){var o=c(n);this._settings=o,this.loadingCount=0,function(n,t){i&&!gn(n)&&(t._observer=new IntersectionObserver((function(e){vn(e,n,t)}),function(n){return{root:n.container===document?null:n.container,rootMargin:n.thresholds||n.threshold+"px"}}(n)))}(o,this),function(n,e){t&&(e._onlineHandler=function(){!function(n,t){var e;(e=mn(n),bn(e).filter(pn)).forEach((function(t){M(t,n.class_error),A(t)})),t.update()}(n,e)},window.addEventListener("online",e._onlineHandler))}(o,this),this.update(e)};return En.prototype={update:function(n){var t,o,a=this._settings,r=hn(n,a);G(this,r.length),!e&&i?gn(a)?function(n,t,e){n.forEach((function(n){-1!==_n.indexOf(n.tagName)&&function(n,t,e){n.setAttribute("loading","lazy"),cn(n,t,e),function(n,t){var e=Y[n.tagName];e&&e(n,t)}(n,t),w(n,h)}(n,t,e)})),G(e,0)}(r,a,this):(o=r,function(n){n.disconnect()}(t=this._observer),function(n,t){t.forEach((function(t){n.observe(t)}))}(t,o)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),t&&window.removeEventListener("online",this._onlineHandler),mn(this._settings).forEach((function(n){U(n)})),delete this._observer,delete this._settings,delete this._onlineHandler,delete this.loadingCount,delete this.toLoadCount},loadAll:function(n){var t=this,e=this._settings;hn(n,e).forEach((function(n){T(n,t),ln(n,e,t)}))},restoreAll:function(){var n=this._settings;mn(n).forEach((function(t){fn(t,n)}))}},En.load=function(n,t){var e=c(t);ln(n,e)},En.resetStatus=function(n){A(n)},t&&function(n,t){if(t)if(t.length)for(var e,i=0;e=t[i];i+=1)l(n,e);else l(n,t)}(En,window.lazyLoadOptions),En}));
const popupLinks = document.querySelectorAll('.popup-link'),
    body = document.querySelector('body'),
    lockPadding = document.querySelectorAll('.lock-padding'),
    timeout = 300
let unlock = true
if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
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

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('section').offsetWidth + 'px'
    for (let i = 0; i < lockPadding.length; i++) {
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
                const el = lockPadding[i]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout);

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

//blog-startup
const blogReadMore = document.querySelector('.button-more-show')
const blogStartup = document.querySelector('.blog-startup')

blogReadMore.addEventListener("click", function (e) {
    e.preventDefault()
    blogStartup.classList.toggle('active')
    if (blogStartup.classList.contains('active')) {
        blogReadMore.innerHTML = "Hide"
    } else {
        blogReadMore.innerHTML = "Read more"
    }
})
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
    if (scolTop > lastScrollTop) {
        headerSection.classList.add("header-hidden")
        
    } else {
        headerSection.classList.remove("header-hidden")
        menu.classList.remove("active-burger")
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
const parallaxBG = document.querySelectorAll(".parallax")
function moveBackground(e) {
    let Y = e.pageY - window.pageYOffset - e.target.getBoundingClientRect().top + 1
    let offsetX = 50 + (e.pageX / window.innerWidth * 15)
    let offsetY = 50 + (Y / window.innerHeight * 20)
    e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`
}
parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`
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
        console.log("З поверненням на сайт!")
    }
    window.onblur = function () {
        localStorage.lastVisit = new Date()
    }
    lastVisit = localStorage.lastVisit
}

// //tripple click
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

//let svgFigure = document.querySelector()
// tripleClick.addEventListener('dblclick', function (e){
//     //if (e.detail === 3) {
//     changeText.forEach(element => {
//         element.innerHTML = "Cliiiick!"
//      
//     })
//     //}
// })



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


// //slider
// // function $(selector){
// //     let elem = document.querySelectorAll(selector)
// //     if(elem.length == 1){
// //         return elem[0]
// //     }
// //     return elem
// // }

// /**
//  * .slider -           обов'язковий клас для слайдера
// * id -                 обов'язково задати id
// * .slider-card -       обов'язковий клас для контейнера слайдів
// * .cards-slider -      клас стилів css для кнопок .left . right
//  * const sliderProps = {
//         slideToScrollAll: true,     скролити одразу всі видимі слайди
//         gap: 20,                    відстань між слайдами
//         autoplay: true,             автоскрол
//         arrows: false,              наявність стрілочок
//         autoplayspeed: 3000         швидкість автоскролу
//     } 
//     infinitySlider(selector, settings) selector шлях до слайдера а settings не стандартні налаштування sliderProps
    
//  */
// const sliderProps = {
//     arrows: true,
//     baseCardWidth: "263rem",
//     slideToScrollAll: true,
//     autoplay: false,
//     gap: 20

// }

// const sliderProppsBrands = {
//     gap: 45,
//     slideToScrollAll: true,
//     baseCardWidth: "127rem",
//     autoplay: false
// }
// const sliderQuotes = {
//     autoplay: false,
//     autoplayspeed: 4000,
//     fadeOut: true,
//     dots: true,
//     distanceDots: 40,
//     arrows: false
// }

// window.onresize = function () {
//     infinitySlider(".slider", sliderProps)
//     infinitySlider(".sliderBrands", sliderProppsBrands)
//     infinitySlider(".sliderQuotes", sliderQuotes)

// }

// infinitySlider(".slider", sliderProps)
// infinitySlider(".sliderBrands", sliderProppsBrands)
// infinitySlider(".sliderQuotes", sliderQuotes)

// function infinitySlider(selector, settings) {
//     let positionCards = 0,
//         slider = document.querySelector(selector),
//         sliderCard = slider.querySelector(".slider-card"),
//         sliderWidth = sliderCard.getBoundingClientRect().width,
//         cards = sliderCard.children,
//         heightCards = 0,
//         realCardsLenth = cards.length,
//         widthCards, btnLeft, btnRight, distanceCards, cloneCard, cardsCount, sliderInterval, maxHeight, sliderDots, touchPoint,
//         defoltSettings = {
//             slideToScrollAll: false,
//             dots: false,
//             distanceDots: 0,
//             fadeOut: false,
//             gap: 0,
//             autoplay: false,
//             arrows: false,
//             autoplayspeed: 3000,
//             baseCardWidth: sliderWidth + "px",
//             transitionslider: "all 1.3s cubic-bezier(.44,-0.13,.43,1.13)"
//         }


//     slider.querySelectorAll(".clone").forEach(clone => {
//         clone.remove()
//     })

//     if ((localStorage[slider.id + "interval"])) {
//         clearInterval(localStorage[slider.id + "interval"])
//     }

//     slider.style.position = "relative"
//     sliderCard.style.position = "relative"
//     sliderCard.style.width = "100%"
//     sliderCard.style.overflow = "hidden"

//     // let connect = Object.assign(settings, defoltSettings)
//     settings = {
//         ...defoltSettings,
//         ...settings
//     } //берем всі аргументи обох об'єктів і сетінгс в кінці щоб перекрити елементи яких не вистачає

//     cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
//     distanceCards = settings.gap
//     widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
//     positionCards = 0 - (distanceCards + widthCards)

//     if (settings.arrows) createArrows()
//     btnLeft = slider.querySelector(".left")
//     btnRight = slider.querySelector(".right")

//     if (settings.arrows && cards.length <= cardsCount) {
//         btnLeft.style.display = "none"
//         btnRight.style.display = "none"
//     } else if (settings.arrows) {
//         btnLeft.style.display = "block"
//         btnRight.style.display = "block"
//     }

//     if (settings.dots && realCardsLenth > 1) {
//         createDots()
//         dot = document.querySelectorAll('.dot')
//         for (let i = 0; i < cards.length; i++) {
//             if (cards[i].classList.contains("activeFadeSlide")) {
//                 dot[i].classList.remove("activeFadeSlide")
//                 cards[i].classList.remove("activeFadeSlide")
//             }
//         }
//         dot[0].classList.add("activeFadeSlide")
//         cards[0].classList.add("activeFadeSlide")
//     }

//     if (!settings.fadeOut) {
//         createClone()
//         shuffleCard()
//     }

//     function createClone() {
//         let counter = 1
//         do {
//             cloneCard = cards[cards.length - counter].cloneNode(true)
//             cloneCard.classList.add("clone")
//             cloneCard.style.transition = "none"
//             sliderCard.insertAdjacentElement("afterbegin", cloneCard)
//             realCardsLenth = cards.length - slider.querySelectorAll(".clone").length
//             counter++
//         } while (counter <= realCardsLenth && settings.slideToScrollAll)

//         if (settings.slideToScrollAll) {
//             counter = 0
//             while (counter < realCardsLenth) {
//                 cloneCard = cards[counter].cloneNode(true)
//                 cloneCard.classList.add("clone")
//                 cloneCard.style.transition = "none"
//                 sliderCard.insertAdjacentElement("beforeend", cloneCard)
//                 counter++
//             }
//         }
//     }

//     cards = sliderCard.children

//     for (let i = 0; i < cards.length; i++) {
//         cards[i].style.width = widthCards + 'px'
//         cards[i].style.position = "absolute"
//         maxHeight = cards[i].getBoundingClientRect().height
//         if (maxHeight > heightCards) {
//             heightCards = maxHeight
//         }

//         setTimeout(() => {
//             cards[i].style.transition = settings.transitionslider
//         }, 1300);

//     }

//     sliderCard.style.height = heightCards + 'px'

//     function createArrows() {
//         const arrowsExist = slider.querySelectorAll(".cards-slider").length

//         if (arrowsExist < 1) {
//             btnLeft = document.createElement("span")
//             btnRight = document.createElement("span")
//             btnLeft.className = "cards-slider left"
//             btnRight.className = "cards-slider right"
//             slider.insertAdjacentElement("afterbegin", btnLeft)
//             slider.insertAdjacentElement("beforeend", btnRight)

//             let clickAllowed = true
//             btnLeft.onclick = function () {
            
//                 if (clickAllowed) {
//                     changeSlide("left")
//                     clickAllowed = false

//                     setTimeout(() => {
//                         clickAllowed = true 
//                     }, parseFloat(cards[0].style.transitionDuration)  * 1000);
//                 }
//             }

//             btnRight.onclick = function () {
//                 if (clickAllowed) {
//                     changeSlide("right")
//                     clickAllowed = false

//                     setTimeout(() => {
//                         clickAllowed = true 
//                     }, parseFloat(cards[0].style.transitionDuration)  * 1000);
//                 }
//             }
//         }
//     }

//     function createDots() {
//         const dotsExist = slider.querySelectorAll(".dot-container").length
//         if (dotsExist < 1) {
//             sliderDots = document.createElement("div")
//             sliderDots.className = "dot-container"
//             sliderDots.style.position = "absolute"
//             slider.insertAdjacentElement("beforeend", sliderDots)
//             for (let i = 0; i < realCardsLenth; i++) {
//                 const dot = document.createElement("span")
//                 dot.className = "dot"
//                 dot.dataset.order = i
//                 sliderDots.insertAdjacentElement("beforeend", dot)
//             }
//         }
//     }

//     // if (settings.dots) {
//     //     createDots()
//     // }

//     function shuffleCard() {
//         positionCards = 0 - (distanceCards + widthCards)
//         cards = sliderCard.children
//         if (settings.slideToScrollAll) {
//             positionCards = 0 - (distanceCards + widthCards) * realCardsLenth
//         }
//         for (let i = 0; i < cards.length; i++) {
//             cards[i].style.left = positionCards + 'px'
//             positionCards += (distanceCards + widthCards)
//         }
//     }

//     function changeSlide(direction) {
//         sliderWidth = sliderCard.getBoundingClientRect().width
//         cardsCount = Math.floor(sliderWidth / (parseInt(settings.baseCardWidth) + settings.gap))
//         widthCards = (sliderWidth - ((cardsCount - 1) * distanceCards)) / cardsCount
//         cards = sliderCard.children

//         let numGuote = 0
//         for (let i = 0; i < cards.length; i++) {
//             if (cards[i].classList.contains("activeFadeSlide")) {
//                 numGuote = i
//             }
//         }
//         if (direction == "left") {
//             if (settings.slideToScrollAll) {
//                 for (let i = 0; i < cardsCount; i++) {
//                     sliderCard.insertAdjacentElement("afterbegin", cards[cards.length - 1])
//                 }
//             } else if (settings.fadeOut) {
//                 setTimeout(() => cards[numGuote].classList.add("activeFadeSlide"), 1000)
//                 setTimeout(() => dot[numGuote].classList.add("activeFadeSlide"), 1000)
//                 cards[numGuote].classList.remove("activeFadeSlide")
//                 dot[numGuote].classList.remove("activeFadeSlide")
//                 if (cards[numGuote - 1]) {
//                     numGuote--
//                 } else {
//                     numGuote = cards.length - 1
//                 } 
//             } else {
//                 cards[cards.length - 1].remove()
//                 let preLastEl = cards[cards.length - 1].cloneNode(true)
//                 preLastEl.classList.add("clone")
//                 sliderCard.insertAdjacentElement("afterbegin", preLastEl)
//                 cards[1].classList.remove("clone")
//             }
//         } else if (direction == "right") {
//             if (settings.slideToScrollAll) {
//                 for (let i = 0; i < cardsCount; i++) {
//                     sliderCard.insertAdjacentElement("beforeend", cards[0])
//                 }

//             } else if (settings.fadeOut) {
//                 setTimeout(() => cards[numGuote].classList.add("activeFadeSlide"), 1000)
//                 setTimeout(() => dot[numGuote].classList.add("activeFadeSlide"), 1000)
//                 cards[numGuote].classList.remove("activeFadeSlide")
//                 dot[numGuote].classList.remove("activeFadeSlide")
//                 if (cards[numGuote + 1]) {
//                     numGuote++
//                 } else {
//                     numGuote = 0
//                 }
                
//             } else {
//                 cards[0].remove()
//                 let preFirstEl = cards[0].cloneNode(true)
//                 preFirstEl.classList.add("clone")
//                 sliderCard.insertAdjacentElement("beforeend", preFirstEl)
//                 cards[cards.length - 2].classList.remove("clone")
//             }
//         }
//         if (!settings.fadeOut) {
//             shuffleCard()
//         }
//     }

//     function autoPlaySlider() {
//         clearInterval(localStorage[slider.id + "interval"])
//         if (settings.fadeOut) {
//             let numGuote = 0
//             for (let i = 0; i < cards.length; i++) {
//                 if (cards[i].classList.contains("activeFadeSlide")) {
//                     numGuote = i
//                 }
//             }
//             const setActive = (index) => {
//                 setTimeout(() => cards[index].classList.add("activeFadeSlide"), 1000)
//                 setTimeout(() => dot[index].classList.add("activeFadeSlide"), 1000)
//             }
//             sliderInterval = setInterval(() => {
//                 cards[numGuote].classList.remove("activeFadeSlide")
//                 dot[numGuote].classList.remove("activeFadeSlide")
//                 if (cards[numGuote + 1]) {
//                     numGuote++
//                 } else {
//                     numGuote = 0
//                 }
//                 setActive(numGuote)
//             }, settings.autoplayspeed)
//         } else {
//             sliderInterval = setInterval(() => {
//                 changeSlide("right")
//                 console.log("next slide")
//             }, settings.autoplayspeed)
//         }
//         localStorage[slider.id + "interval"] = sliderInterval
//     }

//     if (settings.autoplay && realCardsLenth > cardsCount) {
//         autoPlaySlider()
//     }

//     dot = document.querySelectorAll('.dot')
//     dot.forEach(element => {
//         element.onclick = function () {
//             clearInterval(localStorage[slider.id + "interval"])
//             for (let i = 0; i < realCardsLenth; i++) {
//                 dot[i].classList.remove("activeFadeSlide")
//                 cards[i].classList.remove("activeFadeSlide")
//             }
//             cards[element.dataset.order].classList.add("activeFadeSlide")
//             element.classList.add("activeFadeSlide")
//         }
//     })

//     if (settings.autoplay && realCardsLenth > cardsCount) {
//         autoPlaySlider()
//     }

//     function touchSlider (e) {
//         if ((touchPoint + 20) < e.touches[0].pageX ) {
//             changeSlide('left')
//             this.removeEventListener('touchmove', touchSlider)

//         } else if ((touchPoint - 20) > e.touches[0].pageX ) {
//             changeSlide('right')
//             this.removeEventListener('touchmove', touchSlider)
//         }
//     }

//     slider.addEventListener('touchend', function () {
//         if (settings.autoplay && realCardsLenth > cardsCount) {
//             autoPlaySlider()
//         }
//     })
    
//     slider.addEventListener('touchstart', function(e) {

//         touchPoint = e.touches[0].pageX
//         this.addEventListener('touchmove', touchSlider)
//         clearInterval(localStorage[slider.id + "interval"])
//     })
    


//     // window.onscroll = () => {
//     //     clearInterval(localStorage[slider.id + "interval"])
//     //     if (slider.classList.contains("_active-anim")) {
//     //         autoPlaySlider()
//     //     }
//     // }

//     slider.onmouseenter = () => {
//         clearInterval(localStorage[slider.id + "interval"])
//     }
//     slider.onmouseleave = () => {
//         if (settings.autoplay && realCardsLenth > cardsCount) {
//             autoPlaySlider()
//         }
//     }


// }

// //ontouchmove
// //onwhill
// //onscroll

