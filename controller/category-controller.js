const {categoryService} = require('../services')

class CategoryController {

    createCategory = async (req, res) => await categoryService.createCategory(req, res);

    getCategory = async (req, res) => await categoryService.getCategory(req, res);

}

module.exports = new CategoryController