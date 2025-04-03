var express = require('express');
var router = express.Router();
let menuController = require('../controllers/menu');
let { CreateSuccessResponse } = require('../utils/responseHandler');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let menus = await menuController.getAllMenu();
  CreateSuccessResponse(res, menus, 200);
});

// router.get('/:id', async function (req, res, next) {
//   let products = await productController.getProductById(req.params.id);
//   CreateSuccessResponse(res, products, 200);
// });

router.post('/add', async function (req, res, next) {
  try {
    let body = req.body;
    let newMenu = await menuController.createNewMenu(body);
    CreateSuccessResponse(res, newMenu, 200);
  }
  catch (error) {
    next(error)
  }
});

// router.put('/:id', async function (req, res, next) {
//   let id = req.params.id;
//   try {
//     let body = req.body
//     let updateProduct = await productController.ModifyProduct(id, body);
//     CreateSuccessResponse(res, updateProduct, 200);
//   } catch (error) {
//     next(error)
//   }
// });

// router.delete('/:id', async function (req, res, next) {
//   let id = req.params.id;
//   try {
//     let updateProduct = await productController.DeleteProduct(id);
//     CreateSuccessResponse(res, updateProduct, 200);
//   } catch (error) {
//     next(error)
//   }
// });

module.exports = router;
