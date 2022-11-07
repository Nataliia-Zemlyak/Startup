//const { init } = require("browser-sync")

//const { compileString } = require("sass");

class Shop {
    constructor (selector){
        this.shopBlock = document.querySelector(selector)
        // this.shop = this.shopBlock.querySelector(".shopBlock")
        this.cardsShop = this.shopBlock.children
    }
    initShop(){
        for (let i=0; i<this.cardsShop.length; i++) {
            // console.log(this.cardsShop[i]);
            
        }
    }
    addProduct(){

    }

    delProduct(){

    }

    checkOut(){

    }
}

new Shop ('.shopBlock').initShop()



