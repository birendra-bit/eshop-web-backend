const mongoose = require('mongoose')
const {categoryModel} = require('../model')
const categorySchema = mongoose.Schema(categoryModel)

class CategoriesService {

    constructor() {
        this.model = mongoose.model('Category', categorySchema)
    }

    createCategory = async (req, res) => {

        await this.model.create(req.body, (err) => {

            if (err) res.status(400).send({success:false,message:'Bad Request'});

            res.status(200).send({ success: true, message: 'category created.' });
        })
    }

    getCategory = async (req, res) => {

        await this.model.find((err, category) => {

            if (err) res.status(400).send({ success: false, message: 'No category found' });

            res.status(200).send({ success: true, category });
        })
    }
}

module.exports = new CategoriesService