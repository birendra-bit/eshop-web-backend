const mongoose = require('mongoose')
const {productModel} = require('../model')
const productSchema = mongoose.Schema(productModel)


class ProductService{

    constructor(){
        this.model = mongoose.model('Product',productSchema);
    }

    createProduct = async ( data )=>{
        return await this.model.insertMany(data)
    }

    getProduct = async ()=>{
        return await this.model.find();
    }
}

module.exports = new ProductService;