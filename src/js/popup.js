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