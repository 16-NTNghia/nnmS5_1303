var productModel = require('../schemas/product');
let categoryModel = require('../schemas/category');
let productAttributeController = require('../controllers/productAttribute');
var supplierModel = require('../schemas/supplier');
var { generateSlug } = require('../utils/generate_slug');

module.exports = {
    getAllProduct: async () => {
        try {
            let products = await productModel.find({
                is_deleted: false
            })
                .populate({ path: 'category', select: 'name' })
                .populate({ path: 'supplier', select: 'company_name' })
                .populate({ path: 'productAttributes', select: 'weight original_price discount_price discount_percent quantity color' });
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    },

    getProductBySlug: async (slugcategory, slugproduct) => {
        try {
            let category = await categoryModel.findOne({ slug: slugcategory, isDeleted: false });
            if (!category) {
                throw new Error("khong tim thay category");
            }
            let product = await productModel.findOne({ slug: slugproduct, category: category._id, is_deleted: false })
                .populate({ path: 'category', select: 'name' })
                .populate({ path: 'supplier', select: 'company_name' })
                .populate({ path: 'productAttributes', select: 'weight original_price discount_price discount_percent quantity color' });
            if (!product) {
                throw new Error("khong tim thay product");
            }
            return product;
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    getProductById: async (id) => {
        try {
            let product = await productModel.findOne({
                _id: id,
                is_deleted: false
            })
                .populate({ path: 'category', select: 'name' })
                .populate({ path: 'supplier', select: 'company_name' })
                .populate({ path: 'productAttributes', select: 'weight original_price discount_price discount_percent quantity color' });
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
                supplier = await supplierModel.findOne({
                    company_name: body.supplier
                })
                if (!supplier) {
                    throw new Error("khong tim thay supplier")
                }
                let newProduct = new productModel({
                    name: body.name,
                    slug: generateSlug(body.name),
                    description: body.description,
                    origin: body.origin,
                    supplier: supplier._id, // Đảm bảo đây là ObjectId hợp lệ
                    category: category._id, // Đảm bảo đây là ObjectId hợp lệ
                    thumbnail_url: body.thumbnail_url,
                    images: body.images,
                });
                await newProduct.save();
                try {
                    // Tạo ProductAttribute ngay sau khi tạo sản phẩm
                    await productAttributeController.CreateNewProductAttribute(newProduct._id);
                } catch (err) {
                    // Nếu tạo ProductAttribute thất bại, xóa sản phẩm để tránh dữ liệu dư thừa
                    await productModel.findByIdAndDelete(newProduct._id);
                    throw new Error("Lỗi khi tạo ProductAttribute: " + err.message);
                }
                return await newProduct.populate([
                    { path: 'category', select: 'name' },
                    { path: 'supplier', select: 'company_name' }
                ]);
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
                    product.slug = generateSlug(body.name);
                }
                if (body.description) {
                    product.description = body.description;
                }
                if (body.origin) {
                    product.origin = body.origin;
                }
                if (body.supplier) {
                    let supplier = await supplierModel.findOne({ company_name: body.supplier }); // Đảm bảo đây là ObjectId hợp lệ
                    if (!supplier) {
                        throw new Error("khong tim thay supplier")
                    }
                    product.supplier = supplier._id;
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
    },

    DeleteProduct: async (id) => {
        try {
            let product = await productModel.findById(id);
            if (!product) {
                throw new Error("khong tim thay product")
            }
            product.isDeleted = true;
            return await product.save();
        } catch (error) {
            throw new Error(error.message)
        }
    }

}