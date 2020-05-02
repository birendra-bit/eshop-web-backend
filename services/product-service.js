const mongoose = require('mongoose')
const {productModel} = require('../model')
const productSchema = mongoose.Schema(productModel)


class ProductService{

    constructor(){
        this.model = mongoose.model('Product',productSchema);
    }

    createProduct = async ( req, res )=>{

        await this.model.insertMany(req.body,(err)=>{

            if(err) res.status(400).send({success:false,message:'Bad request'});
            
            res.status(200).send({success:true, message:'Product created'});
        })
    }

    getProduct = async (req, res)=>{
    
        await this.model.find((err, product)=>{

            if(err) res.status(400).send({success:false, message:'No product found'});

            res.status(200).send({success:true,product})
        })
    }
}

module.exports = new ProductService;