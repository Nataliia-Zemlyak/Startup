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