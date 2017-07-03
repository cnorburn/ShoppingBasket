'use strict'

//Used to build Offers
//Currently allows Discount and Combination offers
//More offer types can easily be added here

module.exports = class OfferBuilder {

    constructor(){

        let _discounts = []
        let _combinations = []

        this.buildDiscountOffer = function (item, value, type) {
            let discount = {item: item, value: value, type: type}
            _discounts.push(discount)
        }

        this.buildCombinationOffer = function (comboItem, quantity, discountItem, reduction, type) {
            let combination = {
                comboItem: comboItem,
                quantity: quantity,
                discountItem: discountItem,
                reduction: reduction,
                type: type,
                done: false
            }
            _combinations.push(combination)
        }

        this.getDiscounts=function () {
            return _discounts
        }
        this.getCombinations=function () {
            return _combinations
        }

    }


}