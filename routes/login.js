let express = require('express');
let router = express.Router();
let userController = require('../controllers/user');
let { CreateSuccessResponse } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');

router.post('/login', async function (req, res, next) {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;
        let result = await userController.CheckLogin(username, password);
        CreateSuccessResponse(res, result, 200);
    } catch (error) {
        next(error)
    }

})

module.exports = router;