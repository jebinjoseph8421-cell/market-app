import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  // Product state (UNCHANGED)
  const [product, setProduct] = useState({
    productImg: "",
    name: "",
    category: "",
    price: "",
  });

  // Loading state
  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGES (UNCHANGED)
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // =====================================================
  // HANDLE SUBMIT (UNCHANGED LOGIC & ENDPOINT)
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // GET LOGGED-IN USER ID
    const userId = localStorage.getItem("userId");

    console.log("User ID in AddProduct:", userId);

    // CHECK LOGIN
    if (!userId) {
      alert("Please login first");
      return;
    }

    setSubmitting(true);

    // CREATE FORM DATA
    const formData = new FormData();
    formData.append("productImg", product.productImg);
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("userId", userId);

    // DEBUG FORM DATA
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      // SEND PRODUCT TO SPRING BOOT (UNCHANGED ENDPOINT)
      const response = await axios.post(
        "https://industries-harold-developer-those.trycloudflare.com/api/products/add",
        formData,
      );

      console.log("Added product:", response.data);
      alert("Product added successfully!");

      // CLEAR FORM
      setProduct({
        productImg: "",
        name: "",
        category: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else {
        console.log(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
      />

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .add-page {
            min-height: 100vh;
            background-color: #080C14;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 20px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            position: relative;
            overflow: hidden;
            color: #F8FAFC;
          }

          /* MATURE AMBIENT LIGHTING MESH */
          .ambient-orb-1 {
            position: absolute;
            top: -20%;
            left: -10%;
            width: 650px;
            height: 650px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(124, 58, 237, 0.05) 50%, transparent 70%);
            filter: blur(80px);
            animation: floatOrb 20s ease-in-out infinite alternate;
            pointer-events: none;
          }

          .ambient-orb-2 {
            position: absolute;
            bottom: -20%;
            right: -10%;
            width: 700px;
            height: 700px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.16) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%);
            filter: blur(90px);
            animation: floatOrb 24s ease-in-out infinite alternate-reverse;
            pointer-events: none;
          }

          @keyframes floatOrb {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(50px, -50px) scale(1.1); }
          }

          /* GLASS CARD WITH GRADIENT BORDER */
          @keyframes cardReveal {
            from {
              opacity: 0;
              transform: translateY(32px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .add-card-wrap {
            position: relative;
            width: 100%;
            max-width: 520px;
            border-radius: 20px;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(6, 182, 212, 0.25), rgba(99, 102, 241, 0.15));
            box-shadow: 0 35px 80px rgba(0, 0, 0, 0.65), 0 0 40px rgba(6, 182, 212, 0.1);
            animation: cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            z-index: 1;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .add-card-wrap:hover {
            transform: translateY(-4px);
            box-shadow: 0 45px 90px rgba(0, 0, 0, 0.75), 0 0 50px rgba(6, 182, 212, 0.15);
          }

          .add-card {
            width: 100%;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            padding: 48px 40px 40px;
            border-radius: 19px;
            position: relative;
          }

          .add-eyebrow {
            position: absolute;
            top: 24px;
            right: 28px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.5px;
            color: #38BDF8;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25);
            padding: 4px 10px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #38BDF8;
            box-shadow: 0 0 8px #38BDF8;
          }

          .add-header {
            margin-bottom: 28px;
            padding-bottom: 22px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .add-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0 0 8px;
          }

          .add-subtitle {
            color: #94A3B8;
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
          }

          .add-input-group {
            margin-bottom: 22px;
          }

          .add-label {
            display: block;
            font-family: 'JetBrains Mono', monospace;
            color: #CBD5E1;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
          }

          .add-input, .add-select {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            font-size: 14px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            outline: none;
            background-color: rgba(2, 6, 23, 0.6);
            color: #F8FAFC;
            transition: all 0.25s ease;
          }

          .add-select option {
            background-color: #0F172A;
            color: #F8FAFC;
          }

          .add-input::placeholder {
            color: #64748B;
          }

          .add-input:focus, .add-select:focus {
            border-color: #38BDF8;
            background-color: rgba(2, 6, 23, 0.85);
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
          }

          /* FILE INPUT DROPZONE */
          .file-dropzone {
            position: relative;
            width: 100%;
            padding: 20px;
            border: 1.5px dashed rgba(56, 189, 248, 0.4);
            border-radius: 10px;
            background-color: rgba(2, 6, 23, 0.4);
            text-align: center;
            cursor: pointer;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }

          .file-dropzone:hover {
            border-color: #38BDF8;
            background-color: rgba(56, 189, 248, 0.05);
          }

          .file-dropzone input[type="file"] {
            position: absolute;
            inset: 0;
            opacity: 0;
            cursor: pointer;
            width: 100%;
            height: 100%;
          }

          .file-icon {
            font-size: 24px;
            color: #38BDF8;
          }

          .file-text {
            font-size: 13px;
            color: #CBD5E1;
            font-weight: 500;
          }

          .file-subtext {
            font-size: 11px;
            color: #64748B;
            font-family: 'JetBrains Mono', monospace;
          }

          /* PRICE WRAPPERS */
          .price-wrap {
            display: flex;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background-color: rgba(2, 6, 23, 0.6);
            overflow: hidden;
            transition: all 0.25s ease;
          }

          .price-wrap:focus-within {
            border-color: #38BDF8;
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
            background-color: rgba(2, 6, 23, 0.85);
          }

          .price-symbol {
            font-family: 'JetBrains Mono', monospace;
            font-size: 16px;
            font-weight: 600;
            color: #38BDF8;
            padding-left: 16px;
          }

          .price-input {
            flex: 1;
            padding: 14px 16px 14px 8px;
            font-size: 14px;
            font-family: 'JetBrains Mono', monospace;
            border: none;
            outline: none;
            background: transparent;
            color: #F8FAFC;
          }

          /* BUTTON & SHIMMER */
          .add-button {
            position: relative;
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #06B6D4, #6366F1);
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: 0.5px;
            cursor: pointer;
            margin-top: 10px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(6, 182, 212, 0.25);
          }

          .add-button::after {
            content: "";
            position: absolute;
            top: 0; left: -60%;
            width: 40%; height: 100%;
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: skewX(-20deg);
            transition: left 0.6s ease;
          }

          .add-button:hover:not(:disabled)::after {
            left: 140%;
          }

          .add-button:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.01);
            box-shadow: 0 14px 30px rgba(6, 182, 212, 0.4);
            filter: brightness(1.1);
          }

          .add-button:disabled {
            background: #334155;
            color: #94A3B8;
            cursor: not-allowed;
            box-shadow: none;
          }

          .button-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #FFFFFF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="add-page">
        {/* AMBIENT LIGHT MESH */}
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />

        <div className="add-card-wrap">
          <div className="add-card">
            {/* CORNER BADGE */}
            <div className="add-eyebrow">
              <span className="badge-dot" /> NEW ENTRY
            </div>

            {/* HEADER */}
            <div className="add-header">
              <h1 className="add-title">Add Product</h1>
              <p className="add-subtitle">
                Upload a new product to your marketplace collection
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* PRODUCT IMAGE DROPZONE */}
              <div className="add-input-group">
                <label className="add-label">Product Image</label>
                <div className="file-dropzone">
                  <div className="file-icon">📸</div>
                  <div className="file-text">
                    {product.productImg?.name ? (
                      <span style={{ color: "#38BDF8", fontWeight: "600" }}>
                        ✓ {product.productImg.name}
                      </span>
                    ) : (
                      "Click or drop image file here"
                    )}
                  </div>
                  <div className="file-subtext">JPG, PNG, WEBP (Max 5MB)</div>

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
                    required
                  />
                </div>
              </div>

              {/* PRODUCT NAME */}
              <div className="add-input-group">
                <label className="add-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Wireless Noise-Canceling Headphones"
                  value={product.name}
                  onChange={handleChange}
                  className="add-input"
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="add-input-group">
                <label className="add-label">Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="add-select"
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

              {/* PRICE */}
              <div className="add-input-group">
                <label className="add-label">Price</label>
                <div className="price-wrap">
                  <span className="price-symbol">₹</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={product.price}
                    onChange={handleChange}
                    className="price-input"
                    required
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="add-button"
                disabled={submitting}
              >
                {submitting && <span className="button-spinner" />}
                {submitting ? "Adding Product..." : "Add Product →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
