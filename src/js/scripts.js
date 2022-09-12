//humburger
let hamburger = document.querySelector(".hamburger")
let menu = document.querySelector(".navmenu")

hamburger.onclick = function () {
    menu.classList.toggle ("active-burger")
}

//parallax
// let parallaxStartPos,
//     shiftX,
//     shiftY
const parallaxBG = document.querySelectorAll(".parallax")

function moveBackground(e) {
        let offsetX = 50 + (e.pageX / window.innerWidth * 15);
        let offsetY = 50 + (e.pageY / window.innerHeight * 20);
        e.target.style.backgroundPosition = `${offsetX}% ${offsetY}%`
}

parallaxBG.forEach(element => {
    element.style.backgroundPosition = `center`
    element.style.backgroundSize = `150% auto`

    element.addEventListener("mousemove", function (e) { moveBackground(e); });
});