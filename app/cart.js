'use strict'

//Simple Cart class with pseudo private methods

module.exports = class Cart{

    constructor(){

        let _items=[]
        let _subTotal=0
        let _offers=[]

        this.add=function(item){
            _items.push(item)
        }

        this.getCart=function () {
            return _items;
        }

        this.getOffers=function () {
            return _offers;
        }

        this.getBillSubTotal = function (){
            this.getCart().forEach(function (item) {
                _subTotal+=parseFloat(item.getPrice())
            });
            return parseFloat(Math.round(_subTotal * 100) / 100)
        };

        this.getItemsArray=function(){
            var itemsArray=[]
            this.getCart().forEach(function (item) {
                itemsArray.push(item.getName())
            });
            return itemsArray
        }


        this.getBillOffers=function(offers, offerBuilder){
            if(offerBuilder != undefined){
                _offers=offers.calcOffers(this,offerBuilder)
            }
            return _offers
        }

        this.getBillTotal = function () {
            if(this.getOffers().length>0){
                this.getOffers().forEach(function(offer){
                    _subTotal-=parseFloat(offer.value)
                });
            }
            return parseFloat(Math.round(_subTotal * 100) / 100)
        }

    }

}