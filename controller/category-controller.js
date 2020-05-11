const {categoryService} = require('../services')
const promiseHandler = require('../error/promiseHandler')

class CategoryController {

    constructor(){
        this.err = null; this.data = null;
    }

    createCategory = async (req, res) =>{ 

        [this.err,this.data] = await promiseHandler(categoryService.createCategory(req, res))

        if(this.err) res.status(404).send('Bad Request');

        res.status(200).send('category created.');
    }

    getCategory = async (req, res) => {

        [this.err,this.data] = await promiseHandler(categoryService.getCategory())

        if(this.err) res.status(400).send('No category found');

        res.status(200).send(this.data);
    }

}

module.exports = new CategoryController