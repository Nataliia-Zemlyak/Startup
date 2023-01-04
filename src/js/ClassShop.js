class Shop {
    constructor() {
        this.basketItems = {},
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
        if (Object.keys(this.basketItems).length == 0) {
            this.basketCounter.style.opacity = "0"
            this.tableProduct.style.display = "none"
            this.popupInfo.style.display = "block"
            this.totalPriceProduct.style.display = "none"
           
        } else {
            this.counter = Object.keys(this.basketItems).length
            this.basketCounter.style.opacity = "1"
            this.basketCounter.innerText = this.counter
            this.tableProduct.style.display = "block"
            this.popupInfo.style.display = "none"
            this.totalPriceProduct.style.display = "flex"

            
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
                        this.basketCounter.style.opacity = '1'
                        this.basketCounter.innerText = this.counter
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
                this.showElement()
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
                this.showElement()
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