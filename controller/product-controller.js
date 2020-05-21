'use strict'
const {productService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class ProductController {

    constructor(){
        this.err = null; this.data = null;
    }
    createProduct = async (req, res) =>{

        [this.err,this.data]= await promiseHandler(productService.createProduct(req.body));

        if(this.err) res.status(404).send({success:false ,message:'Bad Request'});

        res.status(200).send({success:true, message:'Product added'});
    }

    getProduct = async (req, res) =>{ 

        [this.err,this.data] = await promiseHandler(productService.getProduct());

        if(this.err) res.status(400).send({success:false, message:'No product found'});

        res.status(200).send({ success:true, message:'product found',data:this.data});
    }

    getProductById = async (req,res)=>{
        
        [this.err,this.data] = await promiseHandler(productService.getProductById(req.params.id));

        if(this.err) res.status(404).send({success:false, message:'No product found'})

        res.status(200).send({success:true,message:'product found', data:this.data});
    }

    updateProduct = async (req, res ) => {

        [this.err,this.data] = await promiseHandler(productService.updateProduct(req.params.id, req.body));

        if(this.err) res.status(404).send({success:false, message:'No product found'})

        res.status(200).send({success:true,message:'Product updated',data:this.data});
    }

    deleteProduct = async (req, res )=>{

        [this.err,this.data] = await promiseHandler(productService.deleteProduct(req.params.id));

        if(this.err) res.status(404).send({success:false, message:'No product found'})

        res.status(200).send({success:true, message:'product deleted', data:this.data});
    }

}
module.exports = new ProductController