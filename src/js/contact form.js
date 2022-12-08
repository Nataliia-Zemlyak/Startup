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