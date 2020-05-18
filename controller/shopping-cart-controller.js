'use strict'
const { shoppingCartService } = require('../services')
const promiseHandler = require('../error/promiseHandler')

class ShoppingCartController {

    constructor() {
        this.err = null;
        this.data = null;
    }

    createCart = async (req, res) => {

        [this.err, this.data] = await promiseHandler(shoppingCartService.createCart(req.body, req.user._id));

        if (this.err) res.status(404).send({ success: false, message: "Bad request" });

        res.status(200).send({ success: true, message: 'cart created', data: this.data });
    }

    getCart = async (req, res) => {

        [this.err, this.data] = await promiseHandler(shoppingCartService.getCart(req.user._id));

        if (this.err) res.status(404).send({ success: false, message: "Bad request" });

        res.status(200).send({ success: true, message: 'Request successful', data: this.data });
    }

    clearCart = async (req, res) => {
        
        [this.err, this.data] = await promiseHandler(shoppingCartService.clearCart(req.params.id));

        if (this.err) res.status(404).send({ success: false, message: "Bad request" });

        res.status(200).send({ success: true, message: 'Cart delete', data: this.data });

    }
}
module.exports = new ShoppingCartController