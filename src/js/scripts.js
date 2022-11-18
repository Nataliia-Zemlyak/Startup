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
        console.log("З поверненням на сайт!")
    }

    window.onblur = function () {
        localStorage.lastVisit = new Date()

    }
    lastVisit = localStorage.lastVisit


    ////shop
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
                    imgCards = document.createElement('img'),

                    tableProduct = document.querySelector('.tableProduct');
                popupInfo = document.querySelector('.popupInfo');
                imgProduct = document.querySelector('.imgProduct'),
                    nameProduct = document.querySelector('.nameProduct'),
                    costProduct = document.querySelector('.costProduct');

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

                translateToCard(btnCards)

                // btnCards.onclick = function (e) {
                //     e.preventDefault()

                //     popupInfo.style.opacity = "0"
                //     tableProduct.style.opacity = "1"
                //     imgProduct.appendChild(imgCards.cloneNode(true))
                //     nameProduct.appendChild(nameCards.cloneNode(true))
                //     costProduct.appendChild(costCards.cloneNode(true))

                //     let cloneShopCard = shopCard.cloneNode(true)
                //     // shopCard.getBoundingClientRect()
                //     console.log(cloneShopCard);

                // }
            }
            app()
        })

    function translateToCard(event) {
        event.onclick = function (event) {
            event.preventDefault()
            let worksShopCard = event.target.closest(".worksCards"),
                cloneTop = worksShopCard.getBoundingClientRect().top,
                cloneLeft = worksShopCard.getBoundingClientRect().left,
                basket = document.querySelector('.basket'),
                basketTop = basket.getBoundingClientRect().top,
                basketLeft = basket.getBoundingClientRect().left,
                cloneShopCard = worksShopCard.cloneNode(true)

            cloneShopCard.style.position = "fixed"
            cloneShopCard.style.transition = 'all .5s ease'
            cloneShopCard.style.left = cloneLeft + 'px'
            cloneShopCard.style.top = cloneTop + 'px'

            document.body.appendChild(cloneShopCard)

            setTimeout(() => {
                cloneShopCard.style.left = basketLeft + 'px'
                cloneShopCard.style.top = basketTop + 'px'
                setTimeout(function() {
                    cloneShopCard.remove()
                }, 500);
            }, 100);



            console.log(basketTop);
            console.log(basketLeft);



        }
    }

    ////filter category
    function app() {
        const btnFilter = document.querySelectorAll(".filter-category")
        const cardsFilter = document.querySelectorAll(".worksCards")

        function filter(category, items) {
            items.forEach((item) => {
                const filterCategory = item.querySelector('.category').innerHTML.toLowerCase() == category
                const isShowAll = category.toLowerCase() === 'all'
                if (!filterCategory && !isShowAll) {
                    item.classList.add('anim-worksCards')
                } else {
                    item.classList.remove('anim-worksCards')
                }
            })
        }
        btnFilter.forEach((e) => {
            e.addEventListener("click", (el) => {
                const currentCategory = e.dataset.filter
                filter(currentCategory, cardsFilter)

                el.preventDefault()
            })
        })
    }

}


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



////ajax

// let getStarted = document.querySelector('.getStarted')

// getStarted.onclick = function (event) {
//     event.preventDefault()

// 	let xhr = new XMLHttpRequest()
// 	xhr.open('POST', '../docs/php/getStarted.php', true)
// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

//     xhr.onload = () => {
//         getStarted.innerHTML = xhr.responseText
//     }

//     let params = "rol=admin"
//     xhr.send(params)

// }

///promise

// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("preparing data...")
//         const backendData = {name: 'Dmitriy', company:"Hashtag academy"}
//         resolve(backendData)
//     }, 2000)
// })

// myPromise.then((backendData) => {
//     return new Promise ((resolve, reject) => {
//         setTimeout(() => {
//             backendData.type = "Education"
//             resolve(backendData)

//         },2000)
//     })
// }).then((backendData) => {console.log('Promise done')})


////Універсальна функція базована на Promise
// function sendAjax(method, requesrURL, params = null) {
//     return new Promise ((resolve, reject) => {
//         const xhr = new XMLHttpRequest()
//         xhr.open(method, requesrURL)
//         xhr.responseType = 'json'
//         xhr.onerror = () => {
//             reject(xhr.response)
//         }
//         xhr.onload =() => {
//             if(xhr.status !== 200) {reject(xhr.reject)}
//             else {resolve(xhr.response)}
//         }
//         xhr.send(params)
//     })
// }

///Fetch
// fetch(url)
//     .then(data => {
//         console.log(data.json())
//     })

///Універсальна функція Fetch

// function sendAjax (url) {
//     return fetch(url).then(data => {
//         return data.json()
//     })
// }

let getStarted = document.querySelector('.getStarted')

getStarted.onclick = function (event) {
    event.preventDefault()

    sendAjax('post', "../docs/php/getStarted.php")
        .then(result => {
            console.log(result)
            getStarted.innerHTML = result
        })
}

///Метод Fetch

function sendAjax(method, url, params = {
    'rol': "admin"
}) {
    const headers = {
        // "Content-Type": "multipart/form-data"
        "Content-Type": "text/html"
    }
    return fetch(url, {
        method: method,
        body: params,
        headers: headers
    }).then(response => {
        if (response.ok) return response.text()
        return response.then(error => {})
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


//slider quotes

// let slideIndex = 1,
//     intervalSl,
//     speedInt = 1000
//     showSlides(slideIndex)

//     function currentSlide(n) {
//     showSlides(slideIndex = n)
// }

// function showSlides(n) {
//     let quote = document.querySelectorAll(".quote"),
//         dots = document.querySelectorAll(".dot"),
//         numGuote = 0

//     if (n > quote.length) {
//         slideIndex = 1
//     } else if (n < 1) {
//         slideIndex = quote.length
//     }

//     for (let i = 0; i < quote.length; i++) {
//         quote[i].classList.remove('active')
//     }
//     for (let i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "")
//     }
//     quote[slideIndex - 1].classList.add('active')
//     dots[slideIndex - 1].className += " active"
//     quote[slideIndex - 1].style.transition = "all 1s ease"

//     function changeSlideQuote () {
//         clearInterval()
//         for (let i = 0; i < quote.length; i++) {
//             if (quote[i].classList.contains("active")) {
//                 numGuote = i
//             }
//         }
//         const setActive = (i) => {
//             setTimeout(() => quote[i].classList.add("active"), 800)            
//             setTimeout(() => dots[i].className += (" active"), 800)
//         } 
//         setInterval(() => {
//             quote[numGuote].classList.remove("active")
//             dots[numGuote].classList.remove("active")

//             if (quote[numGuote + 1]){
//                 numGuote++
//             } else{
//                 numGuote = 0
//             }
//             setActive(numGuote)
//         }, 4000)
//     }
//     changeSlideQuote()
//     // if (autoPlayGuote){
//     //     changeSlideQuote()
//     // }

// }




//popup









// function quotesSlider(selector) {
//     window.onresize = function(){
//         quotesSlider(selector)
//     }
//     let quotesContainer = document.querySelector(selector),
//         quote = quotesContainer.querySelectorAll('.quote')
//         quoteDots = document.querySelectorAll('.quote-dot')
//         heightQuotes = 0,
//         // positionGuotes,
//         autoStart = false,
//         speedQuotes = 2000
//         // cards = sliderCard.children
//     quote[0].classList.add("active");
//     function changeQuote() {
//         clearInterval()
//         let positionQuotes = 0
//         for (let i = 0; i < quote.length; i++) {
//             if (quote[i].classList.contains("active")) {
//                 positionQuotes = i
//             }
//             setTimeout(() => {
//                 quote[i].classList.add("active")
//             }, 1000)
//             setInterval(() => {
//             quote[positionQuotes].classList.remove("active")
//             quote[positionQuotes + 1] ? positionQuotes++ : positionQuotes = 0
//             }, 800)
//         }
//     }
//     changeQuote()
// }

// quotesSlider('.quotes')