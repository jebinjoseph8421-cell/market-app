import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  // ==========================================
  // TEMPORARY USER ID
  // ==========================================

  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user?.userId;

  // ==========================================
  // STATE
  // ==========================================

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // SPRING BOOT API URL
  // ==========================================

  const BASE_URL = "https://market-backend-2-xcn9.onrender.com/api/products";

  // ==========================================
  // GET CART
  // ==========================================

  const getCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${BASE_URL}/cart/${userId}`);

      console.log("Cart data:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);

      setError("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {
    getCart();
  }, []);

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (productId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${userId}/increase/${productId}`,
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);

      alert("Unable to increase quantity.");
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = async (productId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${userId}/decrease/${productId}`,
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error decreasing quantity:", error);

      alert("Unable to decrease quantity.");
    }
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/cart/${userId}/remove/${productId}`,
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error removing product:", error);

      alert("Unable to remove product.");
    }
  };

  const FontLink = () => (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
    />
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <FontLink />
        <style>
          {`
      .cart-center {
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Space Grotesk', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background-color: #080C14;
        color: #F8FAFC;
      }

      @media (max-width: 600px) {
        .cart-center h2 {
          font-size: 20px;
        }
      }
    `}
        </style>
        <div className="cart-center">
          <h2>Loading Cart...</h2>
        </div>
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <>
        <FontLink />
        <style>
          {`
      .cart-center {
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Plus Jakarta Sans', Arial, sans-serif;
        padding: 20px;
        text-align: center;
        background-color: #080C14;
        color: #F8FAFC;
      }

      .cart-center h2 {
        font-family: 'Space Grotesk', sans-serif;
        text-transform: uppercase;
        font-weight: 600;
      }

      .retry-button {
        margin-top: 10px;
        padding: 12px 28px;
        background: linear-gradient(135deg, #06B6D4, #6366F1);
        color: #FFFFFF;
        border: none;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.5px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
      }
    `}
        </style>
        <div className="cart-center">
          <h2>{error}</h2>

          <button onClick={getCart} className="retry-button">
            Retry
          </button>
        </div>
      </>
    );
  }

  // ==========================================
  // CART ITEMS
  // ==========================================

  const cartItems = cart?.items || [];

  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);

  // ==========================================
  // TOTAL QUANTITY
  // ==========================================

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <>
      <FontLink />

      {/* ==========================================
      RESPONSIVE CSS
      ========================================== */}

      <style>
        {`
      /* ===== dark glassmorphism tokens =====
         bg #080C14   panel rgba(15,23,42,0.75)   text #F8FAFC
         muted #94A3B8   sky #38BDF8   emerald #34D399
         border rgba(255,255,255,0.1)   gradient linear-gradient(135deg,#06B6D4,#6366F1) */

      * {
        box-sizing: border-box;
      }

      .cart-page {
        min-height: 100vh;
        background-color: #080C14;
        padding: 50px 40px 70px;
        font-family: 'Plus Jakarta Sans', Arial, sans-serif;
        position: relative;
        overflow: hidden;
      }

      /* AMBIENT LIGHT MESH */
      .cart-ambient-orb-1 {
        position: absolute;
        top: -15%;
        left: -10%;
        width: 650px;
        height: 650px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%);
        filter: blur(80px);
        animation: cartFloatOrb 20s ease-in-out infinite alternate;
        pointer-events: none;
      }

      .cart-ambient-orb-2 {
        position: absolute;
        bottom: -15%;
        right: -10%;
        width: 700px;
        height: 700px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
        filter: blur(90px);
        animation: cartFloatOrb 24s ease-in-out infinite alternate-reverse;
        pointer-events: none;
      }

      @keyframes cartFloatOrb {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(50px, -50px) scale(1.1); }
      }

      .cart-heading {
        text-align: center;
        margin: 0 0 45px;
        color: #F8FAFC;
        font-family: 'Space Grotesk', sans-serif;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 34px;
        position: relative;
        z-index: 1;
      }

      .cart-wrapper {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
        align-items: start;
        position: relative;
        z-index: 1;
      }

      .items-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .cart-item {
        background-color: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 22px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 25px;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
        min-width: 0;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease;
      }

      .cart-item:hover {
        transform: translateY(-4px);
        border-color: #38BDF8;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 24px rgba(56, 189, 248, 0.12);
      }

      .product-image {
        width: 150px;
        height: 180px;
        object-fit: contain;
        border-radius: 8px;
        background-color: rgb(250, 251, 255);
        border: 1px solid rgba(255, 255, 255, 0.1);
        flex-shrink: 0;
      }

      .product-details {
        flex: 1;
        min-width: 0;
        border-left: 1px dashed rgba(255, 255, 255, 0.1);
        padding-left: 20px;
      }

      .product-name {
        margin: 0 0 8px;
        color: #F8FAFC;
        font-size: 20px;
        font-weight: 600;
        overflow-wrap: break-word;
      }

      .category {
        font-family: 'JetBrains Mono', monospace;
        color: #34D399;
        margin: 0 0 14px;
        font-size: 12px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
      }

      .price {
        font-family: 'JetBrains Mono', monospace;
        font-size: 20px;
        font-weight: 600;
        color: #38BDF8;
        margin: 0 0 16px;
      }

      .quantity-container {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-top: 5px;
      }

      .quantity-button {
        width: 34px;
        height: 34px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        background-color: rgba(255, 255, 255, 0.05);
        color: #F8FAFC;
        cursor: pointer;
        font-size: 18px;
        border-radius: 6px;
        transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }

      .quantity-button:hover {
        background: linear-gradient(135deg, #06B6D4, #6366F1);
        color: #FFFFFF;
        border-color: transparent;
      }

      .quantity {
        font-family: 'JetBrains Mono', monospace;
        font-size: 16px;
        font-weight: 600;
        min-width: 28px;
        text-align: center;
        color: #F8FAFC;
      }

      .remove-button {
        margin-top: 16px;
        padding: 9px 20px;
        border: 1px solid #F87171;
        background-color: transparent;
        color: #F87171;
        border-radius: 6px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.3px;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
      }

      .remove-button:hover {
        background-color: #F87171;
        color: #0B1120;
      }

      .summary {
        background-color: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 28px 26px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
        position: sticky;
        top: 20px;
      }

      .summary h2 {
        margin-top: 0;
        margin-bottom: 18px;
        color: #F8FAFC;
        font-family: 'Space Grotesk', sans-serif;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 700;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        color: #94A3B8;
        font-size: 14px;
      }

      .summary-row strong {
        font-family: 'JetBrains Mono', monospace;
        font-size: 17px;
        color: #38BDF8;
      }

      .checkout-button {
        width: 100%;
        margin-top: 22px;
        padding: 15px;
        background: linear-gradient(135deg, #06B6D4, #6366F1);
        color: #FFFFFF;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
        transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
      }

      .checkout-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.1);
        box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
      }

      .empty-cart {
        max-width: 460px;
        margin: 100px auto;
        padding: 50px 40px;
        text-align: center;
        background-color: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 1;
      }

      .empty-cart h2 {
        color: #F8FAFC;
        font-family: 'Space Grotesk', sans-serif;
        text-transform: uppercase;
        font-weight: 700;
        margin: 6px 0;
      }

      .empty-cart p {
        color: #94A3B8;
        font-size: 14px;
      }

      .cart-icon {
        font-size: 44px;
      }

      /* ==========================================
         TABLET
      ========================================== */

      @media (max-width: 1000px) {
        .cart-page {
          padding: 35px 25px;
        }

        .cart-wrapper {
          grid-template-columns: 1fr;
        }

        .summary {
          position: static;
        }
      }

      /* ==========================================
         MOBILE
      ========================================== */

      @media (max-width: 600px) {
        .cart-page {
          padding: 25px 15px;
        }

        .cart-heading {
          font-size: 26px;
          margin-bottom: 28px;
        }

        .cart-item {
          padding: 16px;
          gap: 15px;
          flex-direction: column;
        }

        .product-image {
          width: 100%;
          height: 220px;
        }

        .product-details {
          width: 100%;
          border-left: none;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
          padding-left: 0;
          padding-top: 16px;
        }

        .product-name {
          font-size: 19px;
        }

        .category {
          font-size: 11px;
        }

        .price {
          font-size: 18px;
        }

        .quantity-container {
          gap: 12px;
        }

        .remove-button {
          width: 100%;
          padding: 11px;
        }

        .summary {
          padding: 22px 18px;
        }

        .summary h2 {
          font-size: 19px;
        }

        .empty-cart {
          margin: 50px auto;
          padding: 35px 20px;
        }

        .empty-cart h2 {
          font-size: 20px;
        }

        .empty-cart p {
          font-size: 14px;
          line-height: 22px;
        }
      }

      /* ==========================================
         SMALL MOBILE
      ========================================== */

      @media (max-width: 380px) {
        .cart-page {
          padding: 20px 10px;
        }

        .cart-heading {
          font-size: 22px;
        }

        .cart-item {
          padding: 12px;
        }

        .product-image {
          height: 190px;
        }

        .product-name {
          font-size: 17px;
        }

        .quantity-container {
          justify-content: center;
        }

        .summary-row {
          font-size: 13px;
        }
      }
    `}
      </style>

      <div className="cart-page">
        {/* AMBIENT LIGHT MESH */}
        <div className="cart-ambient-orb-1" />
        <div className="cart-ambient-orb-2" />

        {/* ==========================================
        HEADING
    ========================================== */}

        <h1 className="cart-heading">My Shopping Cart</h1>

        {/* ==========================================
        EMPTY CART
    ========================================== */}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="cart-icon">🛒</div>

            <h2>Your Cart is Empty</h2>

            <p>Add products to your cart from the products page.</p>
          </div>
        ) : (
          /* ==========================================
         CART CONTENT
      ========================================== */

          <div className="cart-wrapper">
            {/* ==========================================
            CART PRODUCTS
        ========================================== */}

            <div className="items-section">
              {cartItems.map((item, index) => {
                const product = item.product;

                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={item.cartItemId || product.id || index}
                    className="cart-item"
                  >
                    {/* PRODUCT IMAGE */}

                    <img
                      src={`https://market-backend-2-xcn9.onrender.com/uploads/${product.productImg}`}
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    {/* PRODUCT DETAILS */}

                    <div className="product-details">
                      <h2 className="product-name">{product.name}</h2>

                      <p className="category">Category: {product.category}</p>

                      <p className="price">₹{product.price}</p>

                      {/* QUANTITY */}

                      <div className="quantity-container">
                        <button
                          onClick={() => decreaseQuantity(product.id)}
                          className="quantity-button"
                        >
                          −
                        </button>

                        <span className="quantity">{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(product.id)}
                          className="quantity-button"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ==========================================
            CART SUMMARY
        ========================================== */}

            <div className="summary">
              <h2>Cart Summary</h2>

              {/* TOTAL PRODUCTS */}

              <div className="summary-row">
                <span>Total Products</span>

                <span>{cartItems.length}</span>
              </div>

              {/* TOTAL ITEMS */}

              <div className="summary-row">
                <span>Total Items</span>

                <span>{totalQuantity}</span>
              </div>

              {/* TOTAL PRICE */}

              <div className="summary-row" style={{ borderBottom: "none" }}>
                <strong>Total Price</strong>

                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              {/* CHECKOUT */}

              <button
                className="checkout-button"
                onClick={() => alert("Checkout coming soon!")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
