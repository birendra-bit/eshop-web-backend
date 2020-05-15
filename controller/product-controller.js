'use strict'
const {productService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class ProductController {

    constructor(){
        this.err = null; this.data = null;
    }
    createProduct = async (req, res) =>{

        [this.err,this.data]= await promiseHandler(productService.createProduct(req.body));

        if(this.err) res.status(404).send({message:'Bad Request'});

        res.status(200).send({message:'Product created'});
    }

    getProduct = async (req, res) =>{ 

        [this.err,this.data] = await promiseHandler(productService.getProduct());

        if(this.err) res.status(400).send({message:'No product found'});

        res.status(200).send(this.data);
    }

    getProductById = async (req,res)=>{
        
        [this.err,this.data] = await promiseHandler(productService.getProductById(req.params.id));

        if(this.err) res.status(404).send({message:'No product found'})

        res.status(200).send(this.data);
    }

    updateProduct = async (req, res ) => {

        [this.err,this.data] = await promiseHandler(productService.updateProduct(req.params.id, req.body));

        if(this.err) res.status(404).send({message:'No product found'})

        res.status(200).send(this.data);
    }

    deleteProduct = async (req, res )=>{

        [this.err,this.data] = await promiseHandler(productService.deleteProduct(req.params.id));

        if(this.err) res.status(404).send({message:'No product found'})

        res.status(200).send(this.data);
    }

}
module.exports = new ProductController