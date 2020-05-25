const {categoryService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class CategoryController {

    constructor(){
        this.err = null; this.data = null;
    }

    createCategory = async (req, res) =>{ 

        [this.err,this.data] = await promiseHandler(categoryService.createCategory(req.body))

        if(this.err) res.status(404).send({success:false,message:'Bad Request'});

        res.status(200).send({success:true,message:'category created.'});
    }

    getCategory = async (req, res) => {

        [this.err,this.data] = await promiseHandler(categoryService.getCategory())

        if(this.err) res.status(400).send({success:false, message:'No category found'});

        res.status(200).send({success:true, message:'category found',data:this.data});
    }

}

module.exports = new CategoryController