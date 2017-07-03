'use strict'

let Cart = require("./app/cart.js")
let Item = require("./app/item.js")
let Offers = require("./app/offers.js")
let OfferBuilder = require("./app/offerBuilder.js")


//Use a pretty currency formatting module
const formatCurrency = require('format-currency')
let opts = { format: '%s%v %c', code: '', symbol: '£' }

//Items that are allowed in the cart
let allowed=['soup','apples','milk','bread']
let items=[];

//Validate and build up an array of items from the command line
process.argv.forEach(function (val,index) {
    if(index<2) return;

    if(allowed.indexOf(val.toLowerCase())<0){
        console.log('Unknown item in the cart: ' + val)
        process.exit()
    }
    items.push(val.toLowerCase())
});

//Initialise classes
let offer=new Offers()
let offerBuilder=new OfferBuilder()
let cart=new Cart()

//Build the specified combination offer
offerBuilder.buildCombinationOffer('soup',2,'bread',50,'percent')
//Build the specified discount offers
offerBuilder.buildDiscountOffer('apples',10,'percent')
offerBuilder.buildDiscountOffer('milk',10,'percent')

//Build a simple class for each supplied item and add to the Cart class
//The prices would come from a datasource, i've hard coded them here
items.forEach(function(item){
    switch (item){
        case 'apples':
            cart.add(new Item('apples',1.00))
            break
        case 'soup':
            cart.add(new Item('soup',0.65))
            break
        case 'milk':
            cart.add(new Item('milk',1.30))
            break
        case 'bread':
            cart.add(new Item('bread',0.80))
            break
    }
})

//Calculate and display Subtotal, Offers and Total
//The display logic is the job of this controller function.
//The worker classes only deal with numbers, this facilitates localization.


console.log('Subtotal: ' + formatCurrency(cart.getBillSubTotal(),opts))

let offers=cart.getBillOffers(offer,offerBuilder)
let msg=''

if(offers.length>0){
    offers.forEach(function(offer){
        msg+=(offer.item[0].toUpperCase() + offer.item.slice(1)) + ' ' + offer.discount + ': -' + formatCurrency(offer.value,opts) + '\n'
    })
}
console.log((offers.length>0) ? msg.slice(0, -1) : '(No offers available)')

console.log('Total: ' + formatCurrency(cart.getBillTotal(),opts))

