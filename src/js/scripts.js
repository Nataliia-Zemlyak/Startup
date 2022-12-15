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


