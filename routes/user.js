var express = require('express');
var router = express.Router();
var { CreateSuccessResponse } = require('../utils/responseHandler');
var userController = require('../controllers/user');
let constants = require('../utils/constants');
let { check_authentication, check_authorization } = require('../utils/check_auth');
/* GET users listing. */
router.get('/', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let users = await userController.GetAllUsers();
    CreateSuccessResponse(res, users, 200);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', check_authentication, check_authorization(constants.MOD_PERMISSION), async function (req, res, next) {
  try {
    let user = await userController.GetUserById(req.params.id);
    CreateSuccessResponse(res, user, 200);
  } catch (error) {
    next(error)
  }

});

router.post('/add', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let body = req.body;
    let newUser = await userController.CreateAnUser(body.username, body.password, body.email, body.fullName, body.avatarUrl, body.role);
    CreateSuccessResponse(res, newUser, 200);
  }
  catch (error) {
    next(error)
  }
});

router.post('/status', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  try {
    let result = await userController.checkUserStatus(req.body.username, req.body.email);
    CreateSuccessResponse(res, result, 200);
  }
  catch (error) {
    next(error)
  }
});

router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body
    let updateUser = await userController.UpdateAnUser(id, body);
    CreateSuccessResponse(res, updateUser, 200);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
  let id = req.params.id;
  try {
    let updateUser = await userController.DeleteAnUser(id);
    CreateSuccessResponse(res, updateUser, 200);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
