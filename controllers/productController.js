const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// get a single product
const getOneProduct = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params; //get the slug and find the id of the slug and use findbyid
    const product = await Product.find({ slug: slug });
    const id = product[0].id;
    const outProduct = await Product.findById(id);
    res.status(200).json(outProduct);
  } catch (error) {
    res.status(404).send({message : 'Product Not Found'});

    // res.status(500);
    // throw new Error(error.message);
  }
});

const getOneProductId = asyncHandler(async(req, res) =>{
  try {
      const {id} = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
  } catch (error) {
      res.status(500);
      throw new Error(error.message);
  }
})



const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//edit product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404);
      throw new Error(`cannot find any product with ID ${id}`);
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`cannot find any product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getProducts,
  getOneProduct,
  getOneProductId,
  createProduct,
  updateProduct,
  deleteProduct,
};
