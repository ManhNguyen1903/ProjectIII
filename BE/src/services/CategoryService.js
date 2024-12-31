const Category = require('../models/Category');

const CategoryService = {
  // Tạo danh mục mới
  async createCategory(data) {
    try {
      const newCategory = new Category(data);
      return await newCategory.save(); // Lưu danh mục mới
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Lấy tất cả danh mục
  async getAllCategories() {
    try {
      return await Category.find(); // Tìm tất cả danh mục
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Lấy danh mục theo ID
  async getCategoryById(id) {
    try {
      return await Category.findById(id); // Tìm danh mục theo ID
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Cập nhật danh mục theo ID
  async updateCategory(id, updates) {
    try {
      return await Category.findByIdAndUpdate(id, updates, {
        new: true, // Trả về giá trị đã cập nhật
        runValidators: true, // Chạy validators trên giá trị mới
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Xóa danh mục theo ID
  async deleteCategory(id) {
    try {
      return await Category.findByIdAndDelete(id); // Xóa danh mục theo ID
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = CategoryService;
