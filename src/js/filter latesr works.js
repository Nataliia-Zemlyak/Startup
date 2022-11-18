// function app () {
//     const btnFilter = document.querySelectorAll(".filter-category")
//     const cardsFilter = document.querySelectorAll(".worksCards")

//     function filter (category, items) {
//         items.forEach((item) => {
//             const isItemFilter = !item.classList.contains(category)
//             const isShowAll = category.toLowerCase() === 'all'
//             if(isItemFilter && !isShowAll) {
//                 item.classList.add('anim-worksCards')
//             } else {
//                 item.classList.remove('anim-worksCards')
//             }
//         })
//     }

//     btnFilter.forEach((e) => {
//         e.addEventListener("click", (el) => {
//             const currentCategory = e.dataset.filter
//             filter(currentCategory, cardsFilter)
    
//             el.preventDefault()
//         })
//     })
// }
// app()