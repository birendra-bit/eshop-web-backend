'use strict'
const {productService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class ProductController {

    constructor(){
        this.err = null; this.data = null;
    }
    createProduct = async (req, res) =>{

        [this.err,this.data]= await promiseHandler(productService.createProduct(req.body));

        if(this.err) res.status(404).send('Bad Request');

        res.status(200).send('Product created');
    }

    getProduct = async (req, res) =>{ 

        [this.err,this.data] = await promiseHandler(productService.getProduct());

        if(this.err) res.status(400).send('No product found');

        res.status(200).send(this.data);
    }

}
module.exports = new ProductController