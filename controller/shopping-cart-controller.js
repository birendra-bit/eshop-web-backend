const { shoppingCartService } = require('../services')

class ShoppingCartController{

    createCart = async (req, res) => await shoppingCartService.createCart(req,res);

    getCart = async (req, res) => await shoppingCartService.getCart(req,res);
}
module.exports = new ShoppingCartController