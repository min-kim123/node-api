const express = require('express');
const Product = require('../models/productModel');
const {getProducts, getOneProduct, getOneProductId, createProduct, updateProduct, deleteProduct} = require('../controllers/productController');


const router = express.Router();
//get all products
router.get('/', getProducts);
//get one product with slug
router.get('/slug/:slug', getOneProduct);
//get one product with id
router.get('/:id', getOneProductId);
//create a product
router.post('/', createProduct)
//update a product
router.put('/:id', updateProduct)
//delete a product
router.delete('/:id', deleteProduct);


module.exports = router;