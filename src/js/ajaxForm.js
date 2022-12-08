// function ajaxForm(form, method, requesrURL) {
//     const promise = new Promise((resolve, reject) => {
//         let data = new FormData(form)
//         fetch(requesrURL, {
//             method: method,
//             body: data
//         }).then(response => {
//             if (response.ok) {
//                 form.reset()
//                 return resolve(response)
//             } else {
//                 return reject(response)
//             }
//         })
//     })
//     return promise
// }
// document.querySelector('#contactForm').onsubmit = function (e) { //id форми
//     e.preventDefault()
//     ajaxForm(this, 'post', "../docs/php/getStarted.php") //method, action
//         .then(response => { //може бути 1 then. все що після відправки
//             return response.text()
//         }).then(response => {
//             console.log(response)
//         })
// }






// const form = document.querySelector('form')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const formData = new FormData(form)
//     for (item of formData) {
//         console.log(item[0], item[1]);
//     }
//     fetch('../docs/php/getStarted.php', {
//         method: "POST",
//         body: formData
//         // headers: {
//         //     "Content-Type": "application/json"
//         // }
//     })
//     .then(response => {
//         if (response.ok) return response
//         return response.then(error => {
//             console.log(error)
//         })
//     })
// })