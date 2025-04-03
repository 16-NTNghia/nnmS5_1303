var express = require('express');
var router = express.Router();
let productController = require('../controllers/product');
let { CreateSuccessResponse } = require('../utils/responseHandler');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let constants = require('../utils/constants');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let products = await productController.getAllProduct();
  CreateSuccessResponse(res, products, 200);
});

router.get('/:id', async function (req, res, next) {
  let products = await productController.getProductById(req.params.id);
  CreateSuccessResponse(res, products, 200);
});

router.get("/:slugcategory/:slugproduct", async function (req, res, next) {
  try{
    let slugcategory = req.params.slugcategory;
    let slugproduct = req.params.slugproduct;
    let product = await productController.getProductBySlug(slugcategory, slugproduct);
    CreateSuccessResponse(res, product, 200);
  }
  catch (error) {
    next(error)
  }

})

router.post('/add', async function (req, res, next) {
  try {
    let body = req.body;
    let newProduct = await productController.CreateNewProduct(body);
    CreateSuccessResponse(res, newProduct, 200);
  }
  catch (error) {
    next(error)
  }
});

router.put('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updateProduct = await productController.ModifyProduct(id, body);
    CreateSuccessResponse(res, updateProduct, 200);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let updateProduct = await productController.DeleteProduct(id);
    CreateSuccessResponse(res, updateProduct, 200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
