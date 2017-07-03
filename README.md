#Pricing a basket

Write a program and associated unit tests that can price a basket of goods taking into account
some special offers.

The goods that can be purchased, together with their normal prices are:

Markup : * Soup – 65p per tin
         * Bread – 80p per loaf
         * Milk – £1.30 per bottle
         * Apples – £1.00 per bag

Current special offers:

Markup : * Apples have a 10% discount off their normal price this week
         * Buy 2 tins of soup and get a loaf of bread for half price

The program should accept a list of items in the basket and output the subtotal, the special
offer discounts and the final price.

Input should be via the command line in the form `node index.js item1 item2 item3 ...`

For example:

`node index.js Apples Bread Milk`

Output should be to the console, for example:

```
Subtotal: £3.10
Apples 10% off: -10p
Total: £3.00
```

If no special offers are applicable the code should output:

```
Subtotal: £1.30
(No offers available)
Total price: £1.30
```


The code and design should meet these requirements, but be sufficiently flexible to allow future
changes to the product list and/or discounts applied.

The code should be well structured, commented, have error handling and be tested.

