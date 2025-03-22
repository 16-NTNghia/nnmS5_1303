var express = require('express');
var router = express.Router();
let userController = require('../controllers/user');
let { CreateSuccessResponse } = require('../utils/responseHandler');
let jwt = require('jsonwebtoken')
let constants = require('../utils/constants')
let { check_authentication } = require('../utils/check_auth');

/* GET home page. */
router.post('/login', async function (req, res, next) {
    try {
        let body = req.body;
        let username = body.username;
        let password = body.password;
        let userID = await userController.CheckLogin(username, password);
        console.log(userID)
        CreateSuccessResponse(res, jwt.sign({
            id:userID,
            expire:(new Date(Date.now()+60*60*1000)).getTime()
        },constants.SECRET_KEY), 200)
    } catch (error) {
        next(error)
    }
});

router.post('/signup', async function (req, res, next) {
    try {
        let body = req.body;
        let newUser = await userController.CreateAnUser(
            body.username,body.password,body.email,'user'
        )
        CreateSuccessResponse(res,jwt.sign({
            id:newUser._id,
            expire:(new Date(Date.now()+60*60*1000)).getTime()
        },constants.SECRET_KEY),200);
    } catch (error) {
        next(error)
    }
})
router.post('/changepassword', check_authentication, async function (req, res, next) {
    try {
        let body = req.body;
        let oldpassword = body.oldpassword;
        let newpassword = body.newpassword;
        let result = await userController.ChangePassword(req.user,oldpassword,newpassword);
        CreateSuccessResponse(res,result,200);
    } catch (error) {
        next(error)
    }
    
})

router.get('/me', check_authentication, async function (req, res, next) {
    console.log(req.user);
    CreateSuccessResponse(res,req.user,200)
})

//67de10517282904fbca502ae
module.exports = router;