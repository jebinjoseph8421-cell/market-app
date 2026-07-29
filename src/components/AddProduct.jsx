import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    productImg: "",
    name: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productImg", product.productImg);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/products/add",
        formData,
      );

      console.log(response.data);

      alert("Product added successfully!");

      setProduct({
        productImg: "",
        name: "",
        category: "",
        price: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Add Product</h1>
          <p style={styles.subtitle}>Add a new product to your collection</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Product Image */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Image</label>

            <input
              type="file"
              name="productImg"
              accept="image/*"
              onChange={(e) =>
                setProduct({
                  ...product,
                  productImg: e.target.files[0],
                })
              }
              style={styles.fileInput}
            />
          </div>

          {/* Product Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Category */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Category</option>
              <option value="Electrical">Electrical</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Tools">Tools</option>
              <option value="Foods">Foods</option>
              <option value="Utilities">Utilities</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Price */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Price</label>

            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "50vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    border: "1px solid #e5e5e5",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    margin: "0",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111111",
  },

  subtitle: {
    color: "#777777",
    fontSize: "15px",
    marginTop: "8px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#222222",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 15px",
    fontSize: "15px",
    border: "1px solid #cccccc",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "#fafafa",
    color: "#111111",
  },

  fileInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px dashed #999999",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "10px",
    backgroundColor: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default AddProduct;
