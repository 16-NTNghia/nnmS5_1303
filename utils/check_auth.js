let jwt = require('jsonwebtoken')
let constants = require('../utils/constants')
let userController = require('../controllers/user');
const express = require('express');
module.exports = {
    check_authentication: async function (req, res, next) {
        try{
            if (req.headers && req.headers.authorization) {
                let authorization = req.headers.authorization;
                if (authorization.startsWith("Bearer")) {
                    let token = authorization.split(" ")[1]
                    let result = jwt.verify(token, constants.SECRET_KEY);
                    if (result.expire > Date.now()) {
                        let user = await userController.getUserById(result.id);
                        req.user = user;
                        next();
                    } else {
                        throw new Error("ban chua dang nhap")
                    }
                } else {
                    throw new Error("ban chua dang nhap")
                }
            } else {
                throw new Error("ban chua dang nhap")
            }
        }
        catch(error){
            next(error)
        }
    },
    check_authorization: function (roles) {
        return async function (req, res, next) {
            try {
                let roleOfUser = req.user.role.name;
                if (roles.includes(roleOfUser)) {
                    next();
                } else {
                    throw new Error("ban khong co quyen")
                }
            } catch (error) {
                next(error)
            }
        }
    }
}