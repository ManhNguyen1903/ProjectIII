import React, { useState, useEffect } from "react";
import "./Category.css"; // Đảm bảo thêm CSS
import AddCategory from "./AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./EditCategory";
import axios from "axios";

function CategoryManagement() {
  const [categories, setCategories] = useState([]); // Chưa lấy danh mục từ API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Hàm gọi API để lấy danh mục khi component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8017/api/categories"); // Đảm bảo API server đang chạy và đường dẫn đúng
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // useEffect chạy khi component lần đầu tiên render

  // Thêm danh mục
  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post("http://localhost:8017/api/categories", newCategory);
      setCategories([...categories, response.data]); // Cập nhật danh sách danh mục mới
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Mở modal chỉnh sửa
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Đóng modal chỉnh sửa
  const handleCloseModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };

  // Cập nhật danh mục
  const handleUpdateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:8017/api/categories/${updatedCategory.id}`,
        updatedCategory
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === updatedCategory.id ? response.data : cat
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8017/api/categories/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="category-management">
      <div className="navbar-category">
        <h2>Quản lý danh mục</h2>
        <div className="icon-add-category">
          <button
            className="add-category-icon"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </button>

          <AddCategory
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleAddCategory}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Số sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="category-name-button"
                    onClick={() => handleEditClick(category)}
                  >
                    {category.name}
                  </button>
                </td>
                <td>{category.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditCategory
        isOpen={isEditModalOpen}
        category={selectedCategory}
        onClose={handleCloseModal}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}

export default CategoryManagement;
