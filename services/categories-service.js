const mongoose = require('mongoose')
const {categoryModel} = require('../model')
const categorySchema = mongoose.Schema(categoryModel)

class CategoriesService {

    constructor() {
        this.model = mongoose.model('Category', categorySchema)
    }

    createCategory = async (data) => {

        return await this.model.create(data);
    }

    getCategory = async () => {

       return await this.model.find();
    }
}

module.exports = new CategoriesService