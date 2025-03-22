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

router.post('/add', check_authentication, check_authorization(constants.MOD_PERMISSION),async function (req, res, next) {
  try {
    let body = req.body;
    let newProduct = await productController.CreateNewProduct(body);
    CreateSuccessResponse(res, newProduct, 200);
  }
  catch (error) {
    next(error)
  }
});

router.put('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updateProduct = await productController.ModifyProduct(id, body);
    CreateSuccessResponse(res, updateProduct, 200);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updateProduct = await productModel.findByIdAndUpdate(
      id, {
      isDeleted: true
    }, { new: true }
    )
    CreateSuccessResponse(res, updateProduct, 200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
