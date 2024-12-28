import React, { useState } from "react";
import "./Category.css"; // Đảm bảo thêm CSS
import AddCategory from "./AddCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditCategory from "./EditCategory";
function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Nước ép", quantity: 11 },
    { id: 2, name: "Trà sữa", quantity: 11 },
    { id: 3, name: "Cà phê", quantity: 11 },
    { id: 4, name: "Sinh tố", quantity: 11 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]); // Thêm danh mục mới vào danh sách
  };

  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mở popup chỉnh sửa
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Đóng popup chỉnh sửa
  const handleCloseModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };

  // Cập nhật danh mục
  const handleUpdateCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
  };

  // Xóa danh mục
  const handleDeleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== id)
    );
  };
  return (
    <div className="category-management">
      <div className="navbar-category ">
        <h2>Quản lý danh mục</h2>
          <div className="icon-add-category">
            {/* Nút thêm danh mục */}
            <button
              className="add-category-icon"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} size="2x" />
            </button>

            {/* Giao diện thêm danh mục */}
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
