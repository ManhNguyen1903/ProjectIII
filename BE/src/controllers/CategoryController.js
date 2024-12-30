const CategoryService = require('../services/CategoryService');

// Lấy tất cả danh mục (chỉ lấy tên danh mục)
async function getAllCategories(req, res) {
  try {
    const categories = await CategoryService.getAllCategories();
    const categoryNames = categories.map(category => ({
      id: category.id,  // ID đã chuyển thành số thứ tự từ MongoDB ObjectID
      name: category.name,
      quantity: category.quantity,  // Bao gồm cả số lượng
    })); // Lấy ra danh sách {id, name, quantity}
    res.status(200).json(categoryNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Lấy một danh mục theo ID
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;  // ID từ params (chắc chắn là số)
    const category = await CategoryService.getCategoryById(id);  // Gọi dịch vụ lấy thông tin danh mục theo ID
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);  // Trả về danh mục với thông tin ID, name, và quantity
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Tạo danh mục mới
async function createCategory(req, res) {
  try {
    const data = req.body;  // Lấy dữ liệu từ body (lưu ý là { name, quantity })
    const category = await CategoryService.createCategory(data);  // Gọi dịch vụ tạo danh mục
    res.status(201).json(category);  // Trả về danh mục đã được tạo với format { id, name, quantity }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cập nhật danh mục theo ID
async function updateCategory(req, res) {
  try {
    const { id } = req.params;  // Lấy ID từ params
    const updates = req.body;  // Lấy dữ liệu cập nhật từ body
    const updatedCategory = await CategoryService.updateCategory(id, updates);  // Gọi dịch vụ cập nhật danh mục
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);  // Trả về danh mục đã cập nhật
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Xóa danh mục theo ID
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;  // Lấy ID từ params
    const deletedCategory = await CategoryService.deleteCategory(id);  // Gọi dịch vụ xóa danh mục
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });  // Trả về thông báo xóa thành công
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
