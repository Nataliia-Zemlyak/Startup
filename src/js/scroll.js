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

