'use strict'
const mongoose = require('mongoose')
const { shoppingCartModel } = require('../model')
const shoppingCartSchema = mongoose.Schema(shoppingCartModel)
const { getProductById } = require('./product-service')
const { errorHandler } = require('../error/errorHandler')

class SoppingCartService {

    constructor() {
        this.model = mongoose.model('ShoppingCart', shoppingCartSchema)
    }

    createCart = async (data, id) => {

        data.user_id = id;
        let cart = await this.model.findOne({ "user_id": id });
        if (cart) {
            let item = await this.model.updateOne({ "user_id": id, "items.product_id": data.items.product_id },
                { $inc: { "items.$.quantity": data.items.change } })

            return !item.nModified ?
                await this.model.updateOne({ "user_id": id }, { $push: { items: data.items } }) : item;
        }
        else {
            return await this.model.create(data);
        }
    }

    getCart = async (id) => {
        return await this.model.find({ user_id: id })
    }

    clearCart = async (id) => {
        return await this.model.deleteOne({ _id: id });
    }
}
module.exports = new SoppingCartService