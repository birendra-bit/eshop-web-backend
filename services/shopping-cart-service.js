const mongoose = require('mongoose')
const { shoppingCartModel } = require('../model')
const shoppingCartSchema = mongoose.Schema(shoppingCartModel)

class SoppingCartService {

    constructor() {
        this.model = mongoose.model('ShoppingCart', shoppingCartSchema)
    }

    createCart = async (req, res) => {
        try {
            let user_id = req.user._id;

            let cart = await this.model.findOne({ user_id })

            if (cart) {

                let item = await this.model.updateOne({ "user_id": user_id, "items.product_id": req.body.items.product_id },
                    { $inc: { "items.$.quantity": 1 } })

                if (!item.nModified) {
                    await this.model.updateOne({ "user_id": user_id },
                        { $push: { items: req.body.items } })
                }
                res.status(200).send({ success: true, item });
            }

            req.body.user_id = user_id;

            await this.model.create(req.body, (err) => {

                if (err) res.status(400).send({ success: false, message: 'Bad Request' });

                res.status(200).send({ success: true, message: 'item added to shopping cart' });
            })
        } catch (error) {
            res.send(404).send({ success: false, message: 'Bad Request' });
        }
    }
    getCart = async (req, res) => {

        await this.model.find((err, cartData) => {

            if (err) res.status(200).send({ success: true, message: 'Cart is empty' });

            res.status(200).send({ success: true, cartData })
        })
    }
}
module.exports = new SoppingCartService