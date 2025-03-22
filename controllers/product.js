var productModel = require('../schemas/product');
let categoryModel = require('../schemas/category');

module.exports = {
    getAllProduct: async () => {
        try {
            let products = await productModel.find({});
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getProductById: async (id) => {
        try {
            let product = await productModel.findOne({
                _id: id
            });
            return product;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    CreateNewProduct: async (body) => {
        try {
            category = await categoryModel.findOne({
                name: body.category
            })
            if (category) {

                let newProduct = new productModel({
                    name: body.name,
                    slug: body.slug,
                    description: body.description,
                    origin: body.origin,
                    supplier: body.supplier, // Đảm bảo đây là ObjectId hợp lệ
                    category: category._id, // Đảm bảo đây là ObjectId hợp lệ
                    thumbnail_url: body.thumbnail_url,
                    images: body.images,
                });
                await newProduct.save();
                return newProduct;
            }
            else {
                throw new Error("khong tim thay category")
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },

    ModifyProduct: async (id, body) => {
        try {
            let product = await productModel.findById(id);
            if (product) {
                if (body.name) {
                    product.name = body.name;
                }
                if (body.slug) {
                    product.slug = body.slug;
                }
                if (body.description) {
                    product.description = body.description;
                }
                if (body.origin) {
                    product.origin = body.origin;
                }
                if (body.supplier) {
                    product.supplier = body.supplier; // Đảm bảo đây là ObjectId hợp lệ
                }
                if (body.category) {
                    let category = await categoryModel.findOne({
                        name: body.category
                    });
                    if (!category) {
                        throw new Error("khong tim thay category")
                    }
                    product.category = category._id; // Đảm bảo đây là ObjectId hợp lệ
                }
                if (body.thumbnail_url) {
                    product.thumbnail_url = body.thumbnail_url;
                }
                if (body.images) {
                    product.images = body.images;
                }
                return await product.save();
            }
            else {
                throw new Error("khong tim thay product")
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    
}