const mongoose = require('mongoose')
const { productModel } = require('../model')
const productSchema = mongoose.Schema(productModel)


class ProductService {

    constructor() {
        this.model = mongoose.model('Product', productSchema);
    }

    createProduct = async (data) => {
        return await this.model.insertMany(data)
    }

    getProduct = async () => {
        return await this.model.find();
    }

    getProductById = async (id) => {
        return await this.model.findById(id);
    }

    updateProduct = async (id, data) => {
        let result = await this.model.updateOne({"_id":id},data);
        return result.nModified ? {message:'product update'}:{message:'nothing to update'}
    }

    deleteProduct = async (id) =>{
        let result = await this.model.deleteOne({"_id":id});
        return result.deletedCount ? {message:'product deleted'}:{message:'no product to delete'}
    }
}

module.exports = new ProductService;