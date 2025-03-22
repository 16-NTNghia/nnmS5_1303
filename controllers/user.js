let userModel = require('../schemas/user')
let roleModel = require('../schemas/role')
let bcrypt = require('bcrypt');

module.exports = {
    GetAllUsers: async function (query) {
        let users = await userModel.find({
            isDeleted: false,
        });

        console.log(query)

        if (query['username']) {
            users = users.filter(p => p.username.includes(query['username']))
        }

        if (query['fullName']) {
            users = users.filter(p => p.fullName.includes(query['fullName']))
        }

        if (query.loginCount) {
            //view: { '$gte': '200', '$lte': '200' } 
            //newPost = newPost.filter(p=>p.views>=req.query.view)
            if (query.loginCount.$gte) {
                users = users.filter(p => p.loginCount >= query.loginCount.$gte)
            }
            if (query.loginCount.$lte) {
                users = users.filter(p => p.loginCount <= query.loginCount.$lte)
            }
        }
        return users;
    },

    getUserById: async function (id) {
        try {
            let user = await userModel.findOne({
                _id: id
            });
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getUserByUsername: async function (username) {
        try {
            let user = await userModel.findOne({
                username: username
            });
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    CreateAnUser: async function (username, password, email, fullName, avatarUrl, rolename) {
        try {
            let role = await roleModel.findOne({
                name: rolename
            })
            if (role) {
                let user = new userModel({
                    username: username,
                    password: password,
                    email: email,
                    fullName: fullName,
                    avatarUrl: avatarUrl,
                    role: role._id
                })
                return await user.save();
            } else {
                throw new Error("khong tim thay")
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },


    UpdateAnUser: async function (id, body) {
        try {
            let user = await userModel.findById(id);
            let allowField = ["password", "email", "fullName", "avatarUrl", "role"]
            for (const key of Object.keys(body)) {
                if (allowField.includes(key)) {
                    user[key] = body[key];
                }
            }
            return await user.save();
        } catch (error) {
            throw new Error(error.message)
        }
    },

    DeleteAnUser: async function (id) {
        try {
            let user = await userModel.findById(id);
            if (!user) {
                throw new Error("khong tim thay")
            }
            user.isDeleted = true;
            return await user.save();
        } catch (error) {
            throw new Error(error.message)
        }
    },

    checkUserStatus: async function (username, email) {
        try {
            if (email && username) {
                let checkUser = await userModel.findOne({
                    email: email,
                    username: username
                })
                if (checkUser) {
                    let updateUser = await userModel.findByIdAndUpdate(
                        checkUser._id, {
                        status: true
                    }, { new: true })
                    return updateUser;
                } else {
                    throw new Error("không tìm thấy username tồn tại email này!")
                }
            } else {
                throw new Error("email hoặc username bị rỗng!")
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    CheckLogin: async function (username, password) {
        try {
            let user = await this.getUserByUsername(username);
            if (!user) {
                throw new Error("Username khong ton tai")
            }
            else {
                if (bcrypt.compareSync(password, user.password)) {
                    return user._id;
                }
                else {
                    throw new Error("Password khong dung")
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },

    ChangePassword: async function(user,oldpassword,newpassword){
        if(bcrypt.compareSync(oldpassword,user.password)){
            user.password = newpassword;
            return await user.save();
        }else{
            throw new Error('oldpassword khong dung')
        }
    }
}