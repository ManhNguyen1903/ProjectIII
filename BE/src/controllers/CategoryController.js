const CategoryService = require('../services/CategoryService');

const CategoryController = {
  // Tạo danh mục mới
  async createCategory(req, res) {
    try {
      const newCategory = await CategoryService.createCategory(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy tất cả danh mục
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh mục theo ID
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cập nhật danh mục theo ID
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const updatedCategory = await CategoryService.updateCategory(id, req.body);
      if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Xóa danh mục theo ID
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await CategoryService.deleteCategory(id);
      if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CategoryController;
