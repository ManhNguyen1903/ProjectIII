import React, { useState, useEffect } from "react";
import "./ProductDetailPopup.css";

const ProductDetailPopup = ({ product, onClose, onUpdate, onDelete }) => {
  const [editableProduct, setEditableProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (product) {
      setEditableProduct({ ...product });
      setImage(product.image);

      fetch("http://localhost:8017/api/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [product]);

  if (!editableProduct) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    let updatedProduct = { ...editableProduct, image };

    if (image && image !== product.image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const uploadResponse = await fetch("http://localhost:8017/api/upload/image", {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadResponse.json();
        updatedProduct.image = uploadResult.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsProcessing(false);
        return;
      }
    }

    fetch(`http://localhost:8017/api/products/${updatedProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((updated) => {
        onUpdate(updated);
        setIsProcessing(false);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        setIsProcessing(false);
      });
  };

  const handleDelete = () => {
    if (isProcessing) return;

    const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (!userConfirmed) return;

    setIsProcessing(true);

    fetch(`http://localhost:8017/api/products/${editableProduct._id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDelete(editableProduct._id);
        setIsProcessing(false);
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setIsProcessing(false);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-add_product">
        <div className="header">
          <h2>Chi tiết sản phẩm</h2>
          <button type="button" className="close-button-productdetail" onClick={onClose}>
            &times;
          </button>
        </div>

        <div>
          <label>Loại:</label>
          <select
            name="category"
            value={editableProduct.category._id || ""}
            onChange={(e) =>
              setEditableProduct({
                ...editableProduct,
                category: { _id: e.target.value },
              })
            }
          >
            <option value="">-- Chọn loại sản phẩm --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" value={editableProduct.name} onChange={handleChange} />
        </div>

        <div>
          <label>Giá:</label>
          <input type="number" name="price" value={editableProduct.price} onChange={handleChange} />
        </div>

        <div>
          <label>Chú thích:</label>
          <textarea name="note" value={editableProduct.note || ""} onChange={handleChange} />
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div
            className="image-placeholder"
            onClick={() => document.getElementById("imageInput").click()}
          >
            {image ? (
              <img
                src={image}
                alt="Product"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "Không có ảnh"
            )}
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="delete-button" onClick={handleDelete} disabled={isProcessing}>
            Xóa
          </button>
          <button type="button" className="save-button" onClick={handleSave} disabled={isProcessing}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;