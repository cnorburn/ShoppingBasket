'use strict'

module.exports = class Item{

    constructor(name,price){
        let _name = name
        let _price = price

        this.getName = function() {
            return _name;
        }
        this.getPrice = function() {
            return _price;
        }

    }


}