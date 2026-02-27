const express=require('express');

const productsApiController = require('../controller/productApiController');


const router =express.Router()

router.post('/create/products', productsApiController.createProduct)
router.get('/products', productsApiController.getProduct)
router.get('/edit/:id', productsApiController.getEditProduct)
router.put('/update/:id', productsApiController.updateProduct)
router.delete('/delete/:id', productsApiController.deleteProduct)
router.get('/filter/products', productsApiController.filterProduct)
router.get('/search/products', productsApiController.searchProducts)
router.put('/restore/:id', productsApiController.restoreProducts)

module.exports=router




