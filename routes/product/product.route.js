const router = require('express').Router();


const controller = require('../../controllers/product/product.controller')





router.get('/', controller.getProducts)

router.get('/:productId', controller.getProductById)

router.post('/', controller.createProduct)








module.exports = router;