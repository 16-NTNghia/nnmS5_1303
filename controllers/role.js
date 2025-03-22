let roleModel = require('../schemas/role');

module.exports = {
    getAllRole: async function () {
        try {
            let role = await roleModel.find({});
            return role;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getRoleById: async function (id) {
        try {
            let role = await roleModel.findOne({
                _id: id
            });
            return role;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    CreateAnRole: async function (name, description) {
        try {
            let role = new roleModel({
                name: name,
                description: description,
            })
            return await role.save();
        } catch (error) {
            throw new Error(error.message)
        }
    },

    UpdateAnRole: async function (id, body) {
        try {
            let role = await roleModel.findById(id);
            if (body.name) {
                role.name = body.name;
            }
            if (body.description) {
                role.description = body.description;
            }
            return await role.save();
        } catch (error) {
            throw new Error(error.message)
        }
    },

    DeleteAnRole: async function (id) {
        try {
            let role = await roleModel.findById(id);
            if (!role) {
                throw new Error("khong tim thay")
            }
            role.isDeleted = true;
            return await role.save();
        } catch (error) {
            throw new Error(error.message)
        }
    },
}