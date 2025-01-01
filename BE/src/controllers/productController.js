const productService = require('../services/productService');
const path = require('path');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file ? req.file.path : ''; // Đọc file ảnh từ form-data

    const newProductData = {
      name,
      price,
      description,
      category,
      image,
    };

    const newProduct = await productService.createProduct(newProductData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const updatedProductData = {
      name,
      price,
      description,
      category,
      image: image || req.file?.path, // Sử dụng đường dẫn ảnh mới nếu có
    };

    const updatedProduct = await productService.updateProduct(req.params.id, updatedProductData);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
const Product = require("../models/Product");

// Tạo sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, category, status } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !price || !image || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = new Product({ name, price, image, category, status });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách sản phẩm
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Lấy thông tin đầy đủ category
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
