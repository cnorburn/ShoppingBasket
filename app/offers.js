'use strict'

//Used to calculate offers
//At the moment can calculate Discount and Combination offers, more types can be added here to correspond to what is in teh OfferBuilder
//TODO Stop multiple displays of a discount offer, total them instead
module.exports = class Offers{

//Buy 2 tins of soup and get a loaf of bread for half price
//Bread 50% off: -50p
//Apples 10% off: -10p

    constructor(){

        this.calcOffers=function(cart, offerBuilder){
            let discounts=this.getDiscount(cart,offerBuilder)
            let combinations=this.getCombinations(cart,offerBuilder)

            //Return array of offers found
            return discounts.concat(combinations)

        }
        
        
        this.getCombinations=function(cart,offerBuilder) {
            let combinations=[]

            cart.getCart().forEach(function (item) {

                function findCombinationtItem(_item) {
                    return _item.comboItem === item.getName()
                }
                let found=offerBuilder.getCombinations().find(findCombinationtItem)

                if(found != undefined && !found.done){

                    //Calculate if number items in cart match the combination offer
                    var count = cart.getItemsArray().reduce(function(n, val) {
                        return n + (val === item.getName())
                    }, 0);

                    while(count>=found.quantity){

                        //get the price of the item to reduce
                        let price;
                        cart.getCart().forEach(function (__item) {
                            if(__item.getName()==found.discountItem){
                                price=__item.getPrice()
                            }
                        });

                        if(price != undefined){
                            //Offer deduction type can be calculated here
                            if(found.type == 'percent'){
                                combinations.push({item: found.discountItem, discount: found.reduction + '% off', value: price * (found.reduction / 100)})
                            }
                            if(found.type == 'deduction'){
                                combinations.push({item: found.discountItem, discount: found.reduction + 'p off', value: price - found.reduction})
                            }

                            //TODO Remove this display logic and maybe add to a OffersDisplay class?

                            count=count-found.quantity;
                        }

                    }

                    found.done=true

                }
            });

            return combinations

        }


        this.getDiscount=function(cart,offerBuilder){
            let discounts=[]
            
            cart.getCart().forEach(function (item) {

                function findDiscountItem(_item) {
                    return _item.item === item.getName()
                }

                let found = offerBuilder.getDiscounts().find(findDiscountItem)

                if (found != undefined) {
                    //Offer deduction type can be calculated here
                    if (found.type == 'percent') {
                        discounts.push({
                            item: found.item,
                            discount: found.value + '% off',
                            value: item.getPrice() * (found.value / 100)
                        })
                    }
                    if (found.type == 'deduction') {
                        discounts.push({
                            item: found.item,
                            discount: found.value + 'p off',
                            value: item.getPrice() - found.value
                        })
                    }
                    //TODO Remove this display logic and maybe add to a OffersDisplay class?
                }
            })

            return discounts

        }


    }



}