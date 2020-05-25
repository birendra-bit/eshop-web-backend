const { userController,
    categoryController,
    productController,
    shoppingCartController } = require('../controller')
const { authenticateToken } = require('../auth').authenticate

module.exports = (app) => {

    app.post('/signup', userController.signUp)
    app.post('/login', userController.login)

    app.get('/', userController.getUser)

    app.post('/category', authenticateToken, categoryController.createCategory)
    app.get('/category', categoryController.getCategory)

    app.post('/product', authenticateToken, productController.createProduct)
    app.get('/product', productController.getProduct)
    app.get('/product/:id', authenticateToken, productController.getProductById)
    app.patch('/product/:id', authenticateToken, productController.updateProduct)
    app.delete('/product/:id', authenticateToken, productController.deleteProduct)

    app.post('/shoppingCart', authenticateToken, shoppingCartController.createCart);
    app.get('/shoppingCart', authenticateToken, shoppingCartController.getCart);
    app.delete('/shoppingCart/:id', authenticateToken, shoppingCartController.clearCart);

}