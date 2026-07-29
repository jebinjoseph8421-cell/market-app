import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  // ==========================================
  // TEMPORARY USER ID
  // ==========================================

  const userId = 1;

  // ==========================================
  // STATE
  // ==========================================

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // SPRING BOOT API URL
  // ==========================================

  const BASE_URL = "http://localhost:8080/api/products";

  // ==========================================
  // GET CART
  // GET /api/products/cart/{userId}
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
  // LOAD CART WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    getCart();
  }, []);

  // ==========================================
  // INCREASE QUANTITY
  // PUT /api/products/cart/{userId}/increase/{productId}
  // ==========================================

  const increaseQuantity = async (productId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${userId}/increase/${productId}`,
      );

      console.log("Cart after increase:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error increasing quantity:", error);

      alert("Unable to increase quantity.");
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // PUT /api/products/cart/{userId}/decrease/{productId}
  // ==========================================

  const decreaseQuantity = async (productId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${userId}/decrease/${productId}`,
      );

      console.log("Cart after decrease:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error decreasing quantity:", error);

      alert("Unable to decrease quantity.");
    }
  };

  // ==========================================
  // REMOVE PRODUCT
  // DELETE /api/products/cart/{userId}/remove/{productId}
  // ==========================================

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/cart/${userId}/remove/${productId}`,
      );

      console.log("Cart after removing:", response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error removing product:", error);

      alert("Unable to remove product.");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div style={styles.center}>
        <h2>{error}</h2>

        <button onClick={getCart} style={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  // ==========================================
  // CART ITEMS
  // IMPORTANT:
  // Your Spring Boot Cart entity has:
  // private List<CartItem> items
  //
  // Therefore use cart.items
  // NOT cart.cartItems
  // ==========================================

  const cartItems = cart?.items || [];

  // ==========================================
  // CALCULATE TOTAL PRICE
  // ==========================================

  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0;

    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Shopping Cart</h1>

      {cartItems.length === 0 ? (
        // =====================================
        // EMPTY CART
        // =====================================

        <div style={styles.emptyCart}>
          <div style={styles.icon}>🛒</div>

          <h2>Your Cart is Empty</h2>

          <p>Add products to your cart from the products page.</p>
        </div>
      ) : (
        // =====================================
        // CART CONTENT
        // =====================================

        <div style={styles.cartWrapper}>
          {/* =====================================
          CART PRODUCTS
      ===================================== */}

          <div style={styles.itemsSection}>
            {cartItems.map((item, index) => {
              const product = item.product;

              // If product doesn't exist
              // don't render the item

              if (!product) {
                return null;
              }

              return (
                <div
                  key={item.cartItemId || product.id || index}
                  style={styles.cartItem}
                >
                  {/* PRODUCT IMAGE */}

                  <img
                    src={`http://localhost:8080/uploads/${product.productImg}`}
                    alt={product.name}
                    style={styles.productImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* PRODUCT DETAILS */}

                  <div style={styles.productDetails}>
                    <h2 style={styles.productName}>{product.name}</h2>

                    <p style={styles.category}>Category: {product.category}</p>

                    <p style={styles.price}>₹{product.price}</p>

                    {/* QUANTITY CONTROLS */}

                    <div style={styles.quantityContainer}>
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        style={styles.quantityButton}
                      >
                        −
                      </button>

                      <span style={styles.quantity}>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(product.id)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE BUTTON */}

                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================
          CART SUMMARY
      ===================================== */}

          <div style={styles.summary}>
            <h2>Cart Summary</h2>

            {/* TOTAL PRODUCTS */}

            <div style={styles.summaryRow}>
              <span>Total Products</span>

              <span>{cartItems.length}</span>
            </div>

            {/* TOTAL QUANTITY */}

            <div style={styles.summaryRow}>
              <span>Total Items</span>

              <span>
                {cartItems.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0,
                )}
              </span>
            </div>

            {/* TOTAL PRICE */}

            <div style={styles.summaryRow}>
              <strong>Total Price</strong>

              <strong>₹{totalPrice.toFixed(2)}</strong>
            </div>

            {/* CHECKOUT */}

            <button
              style={styles.checkoutButton}
              onClick={() => alert("Checkout coming soon!")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "40px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#111",
    fontSize: "36px",
  },

  center: {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  cartWrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
    alignItems: "start",
  },

  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  cartItem: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    display: "flex",
    gap: "25px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },

  productImage: {
    width: "150px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: "#eeeeee",
  },

  productDetails: {
    flex: 1,
  },

  productName: {
    marginTop: "0",
    color: "#111",
  },

  category: {
    color: "#777",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
  },

  quantityContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "15px",
  },

  quantityButton: {
    width: "35px",
    height: "35px",
    border: "1px solid #111",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: "20px",
    borderRadius: "5px",
  },

  quantity: {
    fontSize: "18px",
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
  },

  removeButton: {
    marginTop: "15px",
    padding: "9px 20px",
    border: "none",
    backgroundColor: "#aa0c0c",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },

  summary: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "20px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #ddd",
  },

  checkoutButton: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

  emptyCart: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "50px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },

  icon: {
    fontSize: "50px",
  },

  retryButton: {
    padding: "10px 25px",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Cart;
