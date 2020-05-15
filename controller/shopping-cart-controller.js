'use strict'
const { shoppingCartService } = require('../services')
const promiseHandler = require('../error/promiseHandler')

class ShoppingCartController{

    constructor(){
        this.err = null;
        this.data = null;
    }

    createCart = async (req, res) =>{ 
        
       [this.err,this.data] = await promiseHandler(shoppingCartService.createCart(req.body,req.user._id));

       if(this.err) res.status(404).send({message:"Bad request"});

       res.status(200).send(this.data);
    }

    getCart = async (req, res) =>{

        [this.err,this.data] = await promiseHandler(shoppingCartService.getCart(req.user._id));

        if(this.err) res.status(404).send({message:"Bad request"});
 
        res.status(200).send(this.data);
    }

}
module.exports = new ShoppingCartController