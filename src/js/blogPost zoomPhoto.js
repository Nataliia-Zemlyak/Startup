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