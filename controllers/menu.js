var menuModel = require('../schemas/menu');
const { generateSlug } = require('../utils/generate_slug');

module.exports = {
    getAllMenu: async function () {
        try {
            const menus = await menuModel.find({ isDeleted: false }).lean(); // Lấy toàn bộ menu
    
            // Tạo object lưu các menu theo _id
            const menuMap = {};
            menus.forEach(menu => menuMap[menu._id] = { ...menu, children: [] });
    
            // Tạo cây menu
            const rootMenus = [];
            menus.forEach(menu => {
                if (menu.parent) {
                    // Nếu có parent, thêm vào danh sách con của menu cha
                    if (menuMap[menu.parent]) {
                        menuMap[menu.parent].children.push(menuMap[menu._id]);
                    }
                } else {
                    // Nếu không có parent, đây là menu gốc
                    rootMenus.push(menuMap[menu._id]);
                }
            });
    
            return rootMenus;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    createNewMenu: async function (body) {
        try {

            if(body.parent_id != null){
                let menu = await menuModel.findOne({_id: body.parent, isDeleted: false});
                if(!menu){
                    throw new Error("khong tim thay menu");
                }
            }
            let newMenu = new menuModel({
                name: body.name,
                URL: '/' + generateSlug(body.name),
                parent: body.parent
            });
            
            return await newMenu.save();
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
}