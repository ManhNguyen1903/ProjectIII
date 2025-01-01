const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

// Tạo mới sản phẩm
const createProduct = async (productData) => {
  try {
    // Kiểm tra xem category có tồn tại hay không
    const category = await Category.findById(productData.category);
    if (!category) {
      throw new Error("Category not found");
    }

    const newProduct = new Product({
      ...productData,
      image: productData.image, // Image path có thể được truyền từ frontend (lưu trong file)
    });

    return await newProduct.save();
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Lấy tất cả sản phẩm
const getAllProducts = async () => {
  try {
    return await Product.find().populate('category');
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

// Cập nhật sản phẩm
const updateProduct = async (id, productData) => {
  try {
    // Tìm và cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

// Tìm sản phẩm theo ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).populate('category');
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error fetching product by id: " + error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
