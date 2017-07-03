let expect = require("chai").expect;
let Cart = require("../app/cart.js");
let Item = require("../app/item.js");
let Offers = require("../app/offers.js");
let OfferBuilder = require("../app/offerBuilder.js");

describe("Cart processes", function() {
    describe("Add to cart works", function() {
        it("Can add to the cart", function() {
            let cart=new Cart()
            let apple=new Item('apple',10)
            let banana=new Item('banana',70)

            cart.add(apple)
            cart.add(banana)

            expect(cart.getCart()).to.not.be.empty
            expect(cart.getCart().length).to.equal(2)
        });
    });


    describe("Offer builder works", function() {
        it("Can build an offer", function() {
            let offerBuilder=new OfferBuilder()
            offerBuilder.buildDiscountOffer('apples',10,'percent')
            offerBuilder.buildDiscountOffer('milk',10,'percent')

            expect(offerBuilder.getDiscounts()).to.not.be.empty
            expect(offerBuilder.getDiscounts().length).to.equal(2)
        });
    });

    describe('Cart totals work',function(){
        it('Total works without offers',function () {

            let cart=new Cart()
            let bread=new Item('bread',0.80)
            let milk=new Item('milk',1.30)

            cart.add(bread)
            cart.add(milk)

            expect(cart.getBillSubTotal()).to.equal(2.1)
            expect(cart.getBillOffers(new Offers(), new OfferBuilder())).to.be.empty
            expect(cart.getBillTotal()).to.equal(2.1)

        });

        it('Total works with discount offers',function () {

            let offer=new Offers()
            let offerBuilder=new OfferBuilder()
            offerBuilder.buildDiscountOffer('apples',10,'percent')
            offerBuilder.buildDiscountOffer('milk',10,'percent')

            let cart=new Cart()
            let bread=new Item('bread',0.80)
            let milk=new Item('milk',1.30)
            let apples=new Item('apples',1.00)

            cart.add(bread)
            cart.add(milk)
            cart.add(apples)

            expect(cart.getBillSubTotal()).to.equal(3.1)

            cart.getBillOffers(offer,offerBuilder)

            expect(cart.getBillTotal()).to.equal(2.87)


        });

        it('Total works with combination offers',function () {

            let offer=new Offers()
            let offerBuilder=new OfferBuilder()
            offerBuilder.buildCombinationOffer('soup',2,'bread',50,'percent')

            let cart=new Cart()
            let soup=new Item('soup','0.65')
            let bread=new Item('bread','0.80')
            let apples=new Item('apples','1.00')

            cart.add(soup)
            cart.add(soup)
            cart.add(apples)
            cart.add(bread)

            expect(cart.getBillSubTotal()).to.equal(3.1)

            cart.getBillOffers(offer,offerBuilder)
            expect(cart.getBillTotal()).to.equal(2.7)


        });

        it('Total works with combination and discount offers',function () {

            let offer=new Offers()
            let offerBuilder=new OfferBuilder()
            offerBuilder.buildCombinationOffer('soup',2,'bread',50,'percent')
            offerBuilder.buildDiscountOffer('apples',10,'percent')
            offerBuilder.buildDiscountOffer('milk',10,'percent')

            let cart=new Cart()
            let soup=new Item('soup','0.65')
            let bread=new Item('bread','0.80')
            let apples=new Item('apples','1.00')
            let milk=new Item('milk','1.30')

            cart.add(soup)
            cart.add(soup)
            cart.add(apples)
            cart.add(bread)
            cart.add(milk)

            expect(cart.getBillSubTotal()).to.equal(4.4)
            cart.getBillOffers(offer,offerBuilder)
            expect(cart.getBillTotal()).to.equal(3.77)


        });


        it('Total works with combination and discount offers',function () {

            let offer=new Offers()
            let offerBuilder=new OfferBuilder()
            offerBuilder.buildCombinationOffer('soup',2,'bread',50,'percent')
            offerBuilder.buildDiscountOffer('apples',10,'percent')
            offerBuilder.buildDiscountOffer('milk',10,'percent')

            let cart=new Cart()
            let soup=new Item('soup','0.65')
            let bread=new Item('bread','0.80')
            let apples=new Item('apples','1.00')
            let milk=new Item('milk','1.30')

            cart.add(soup)
            cart.add(soup)
            cart.add(soup)
            cart.add(soup)
            cart.add(apples)
            cart.add(bread)
            cart.add(bread)
            cart.add(milk)
            cart.add(milk)

            expect(cart.getBillSubTotal()).to.equal(7.80)
            cart.getBillOffers(offer,offerBuilder)
            expect(cart.getBillTotal()).to.equal(6.64)


        });


    });


});