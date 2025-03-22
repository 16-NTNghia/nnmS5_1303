var express = require('express');
var router = express.Router();
var roleModel = require('../schemas/role');
let roleController = require('../controllers/role');
var { CreateSuccessResponse } = require('../utils/responseHandler');
let { check_authentication, check_authorization } = require('../utils/check_auth');
let constants = require('../utils/constants');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    let  roles = await roleController.getAllRole();
    CreateSuccessResponse(res, roles, 200);
});

router.get('/:id', async function (req, res, next) {
    try {
        let role = await roleController.getRoleById(req.params.id);
        CreateSuccessResponse(res, role, 200);
    } catch (error) {
        next(error)
    }

});

router.post('/add', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    try {
        let body = req.body
        let newRole = await roleController.CreateAnRole(body.name, body.description);
        CreateSuccessResponse(res, newRole, 200);
    } catch (error) {
        next(error)
    }
});

router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    let id = req.params.id;
    try {
        let updateRole = await roleController.updateRole(id, req.body);
        CreateSuccessResponse(res, updateRole, 200);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    let id = req.params.id;
    try {
        let updateRole = await roleController.deleteRole(id);
        CreateSuccessResponse(res, updateRole, 200);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
