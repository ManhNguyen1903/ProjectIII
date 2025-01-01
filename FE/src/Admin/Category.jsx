import React, { useState, useEffect } from "react";
import "./Category.css";
import AddCategory from "./AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./EditCategory";
import axios from "axios";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Lấy danh sách categories khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8017/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Thêm danh mục
  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        "http://localhost:8017/api/categories",
        newCategory
      );
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Mở modal chỉnh sửa
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true); // Mở modal chỉnh sửa
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
        `http://localhost:8017/api/categories/${updatedCategory._id}`,
        updatedCategory
      );
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === updatedCategory._id ? response.data : cat
        )
      );
      handleCloseModal(); // Đóng modal sau khi cập nhật
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    try {
      if (!id) {
        console.error("Invalid category ID for deletion.");
        return;
      }
      await axios.delete(`http://localhost:8017/api/categories/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== id) // Xóa danh mục trong list
      );
      handleCloseModal(); // Đóng modal khi xóa thành công
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
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="category-name-button"
                    onClick={() => handleEditClick(category)} // Khi click vào tên danh mục, mở modal
                  >
                    {category.name}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditCategory
        isOpen={isEditModalOpen}
        category={selectedCategory} // Truyền selectedCategory vào EditCategory
        onClose={handleCloseModal}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}

export default CategoryManagement;
