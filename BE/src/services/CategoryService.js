const Category = require('../models/Category');

// Lấy tất cả danh mục và chuyển đổi thành dữ liệu theo form { id, name, quantity }
async function getAllCategories() {
  try {
    const categories = await Category.find().select('name quantity -_id');
    // Chuyển thành dạng { id, name, quantity }
    return categories.map((category, index) => ({
      id: index + 1,  // Dùng index + 1 làm ID (thứ tự)
      name: category.name,
      quantity: category.quantity || 0,  // Nếu không có quantity, mặc định là 0
    }));
  } catch (error) {
    console.error('Error getting categories:', error);
    throw new Error('Unable to fetch categories');
  }
}

// Lấy một danh mục theo ID và trả về với dạng { id, name, quantity }
async function getCategoryById(id) {
  try {
    const category = await Category.findById(id).select('name quantity -_id');
    if (category) {
      return {
        id: id,  // Dùng ObjectId làm id
        name: category.name,
        quantity: category.quantity || 0,  // Nếu không có quantity, mặc định là 0
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw new Error('Unable to fetch category by ID');
  }
}

// Tạo danh mục mới
async function createCategory(data) {
  try {
    const category = new Category(data);
    const savedCategory = await category.save();
    return {
      id: savedCategory._id,  // Trả về _id từ MongoDB
      name: savedCategory.name,
      quantity: savedCategory.quantity || 0,  // Nếu không có quantity, mặc định là 0
    };
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Unable to create category');
  }
}

// Cập nhật danh mục theo ID
async function updateCategory(id, updates) {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updates, { new: true }).select('name quantity -_id');
    if (updatedCategory) {
      return {
        id: id,  // Dùng ObjectId làm id
        name: updatedCategory.name,
        quantity: updatedCategory.quantity || 0,  // Nếu không có quantity, mặc định là 0
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating category:', error);
    throw new Error('Unable to update category');
  }
}

// Xóa danh mục theo ID
async function deleteCategory(id) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      return {
        id: id,  // Trả về ID đã xóa
        name: deletedCategory.name,
        quantity: deletedCategory.quantity || 0,  // Nếu không có quantity, mặc định là 0
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Unable to delete category');
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
