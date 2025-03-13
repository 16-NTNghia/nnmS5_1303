var express = require('express');
var router = express.Router();
var productModel = require('../schemas/product');
var {CreateErrorResponse, CreateSuccessResponse} = require('../utils/responseHandler');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let products = await productModel.find({});
  CreateSuccessResponse(res, products, 200);
  res.send(products);
});

router.get('/:id', async function (req, res, next) {
  let products = await productModel.findById(req.params.id);
  CreateSuccessResponse(res, products, 200);
  res.send(products);
});

router.post('/add', async function (req, res, next) {
  try {
    let body = req.body;

    let newProduct = new productModel({
      name: body.name,
      description: body.description,
      quantity: body.quantity,
      price: body.price,
      urlImg: body.urlImg,
      category: body.category
    });

    await newProduct.save();
    CreateSuccessResponse(res, newProduct, 200);
  }
  catch (error) {
    CreateErrorResponse(res, error, 404);
  }
});

module.exports = router;
