const {productService} = require('../services')

class ProductController {

    createProduct = async (req, res) => await productService.createProduct(req, res);

    getProduct = async (req, res) => await productService.getProduct(req, res);

}
module.exports = new ProductController