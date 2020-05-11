const { userController, 
    categoryController, 
    productController,
    shoppingCartController } = require('../controller')
const {authenticateToken} = require('../auth').authenticate

module.exports = (app) => {
    
    app.post('/signup', userController.signUp)
    app.post('/login', userController.login)

    app.get('/', authenticateToken, userController.getUser)

    app.post('/category', authenticateToken, categoryController.createCategory)
    app.get('/category', categoryController.getCategory)

    app.post('/product', authenticateToken, productController.createProduct)
    app.get('/product', productController.getProduct)

    app.post('/shoppingCart',authenticateToken, shoppingCartController.createCart);
    app.get('/shoppingCart',authenticateToken, shoppingCartController.getCart);

}