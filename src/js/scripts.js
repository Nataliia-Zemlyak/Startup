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



////ajax

let getStarted = document.querySelector('.getStarted')

getStarted.onclick = function (event) {
    event.preventDefault()

	let xhr = new XMLHttpRequest()
	xhr.open('POST', '../docs/php/getStarted.php', true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onload = () => {
        getStarted.innerHTML = xhr.responseText
    }
    xhr.send()
    
}
// let xhr = new XMLHttpRequest()


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