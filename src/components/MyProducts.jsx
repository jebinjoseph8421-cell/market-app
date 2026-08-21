import React, { useEffect, useState } from "react";
import axios from "axios";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LOGGED-IN USER'S PRODUCTS (UNCHANGED)
  // =====================================================
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    console.log("Logged-in User ID:", userId);

    // Check if user is logged in
    if (!userId) {
      console.log("No user logged in");
      setLoading(false);
      return;
    }

    // GET ONLY THIS USER'S PRODUCTS (UNCHANGED ENDPOINT)
    axios
      .get(
        `https://market-backend-2-xcn9.onrender.com/api/products/user/${userId}`,
      )
      .then((response) => {
        console.log("My Products:", response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching my products:", error);
        setLoading(false);
      });
  }, []);

  // =====================================================
  // DELETE PRODUCT (UNCHANGED LOGIC & ENDPOINT)
  // =====================================================
  const handleDelete = async (productId) => {
    // Confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      console.log("Deleting Product ID:", productId);

      // DELETE PRODUCT FROM BACKEND
      await axios.delete(
        `https://market-backend-2-xcn9.onrender.com/api/products/${productId}`,
      );

      // REMOVE PRODUCT FROM CURRENT PAGE
      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== productId),
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);

      if (error.response) {
        console.log("Delete status:", error.response.status);
        console.log("Delete response:", error.response.data);
      }

      alert("Failed to delete product.");
    }
  };

  // =====================================================
  // CHECK USER LOGIN
  // =====================================================
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return (
      <div style={styles.page}>
        <GlobalStyle />

        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />

        <div className="mp-message-card">
          <div className="mp-message-icon">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <circle cx="23" cy="15" r="8" stroke="#38BDF8" strokeWidth="2" />
              <path
                d="M6 40c0-9.4 7.6-15 17-15s17 5.6 17 15"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mp-eyebrow">ACCESS REQUIRED</p>
          <h2 className="mp-message-title">Please Login</h2>
          <p className="mp-message-copy">
            You need to login to see your products collection.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // LOADING SKELETON STATE
  // =====================================================
  if (loading) {
    return (
      <div style={styles.page}>
        <GlobalStyle />

        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />

        <div className="mp-header">
          <p className="mp-eyebrow">YOUR COLLECTION</p>
          <h1 className="mp-title">My Products</h1>
          <div className="mp-rule" />
          <p className="mp-subtitle">Products added by you</p>
        </div>

        <div className="mp-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="mp-card mp-skeleton" key={i}>
              <div className="mp-skeleton-img" />
              <div className="mp-skeleton-info">
                <div className="mp-skeleton-line short" />
                <div className="mp-skeleton-line long" />
                <div className="mp-skeleton-line mid" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =====================================================
  // DISPLAY PRODUCTS
  // =====================================================
  return (
    <div style={styles.page}>
      <GlobalStyle />

      {/* AMBIENT LIGHT MESH */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      {/* HEADER */}
      <div className="mp-header">
        <p className="mp-eyebrow">YOUR COLLECTION</p>
        <h1 className="mp-title">My Products</h1>
        <div className="mp-rule" />
        <p className="mp-subtitle">Manage products added by you</p>
      </div>

      {/* NO PRODUCTS EMPTY STATE */}
      {products.length === 0 ? (
        <div className="mp-empty">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="mp-empty-icon"
          >
            <path
              d="M10 22L32 10L54 22V46L32 58L10 46V22Z"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M10 22L32 34L54 22"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M32 34V58" stroke="#38BDF8" strokeWidth="2" />
          </svg>

          <h2 className="mp-empty-title">No Products Found</h2>
          <p className="mp-empty-copy">You have not added any products yet.</p>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="mp-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="mp-card"
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              {/* PRODUCT IMAGE (PRESERVED WHITE BACKGROUND COLOR) */}
              <div className="mp-image-wrap">
                <img
                  src={`https://market-backend-2-xcn9.onrender.com/uploads/${product.productImg}`}
                  alt={product.name}
                  className="mp-image"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80";
                  }}
                />
              </div>

              {/* PRODUCT DETAILS */}
              <div className="mp-info">
                <p className="mp-category">{product.category}</p>
                <h2 className="mp-name">{product.name}</h2>
                <p className="mp-price">₹{product.price}</p>

                {/* DELETE BUTTON */}
                <button
                  className="mp-delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete Product 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =====================================================
// GLOBAL / ANIMATED STYLES
// =====================================================
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

      * {
        box-sizing: border-box;
      }

      /* MATURE AMBIENT LIGHTING MESH */
      .ambient-orb-1 {
        position: absolute;
        top: -15%;
        left: -10%;
        width: 650px;
        height: 650px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%);
        filter: blur(80px);
        animation: floatOrb 20s ease-in-out infinite alternate;
        pointer-events: none;
      }

      .ambient-orb-2 {
        position: absolute;
        bottom: -15%;
        right: -10%;
        width: 700px;
        height: 700px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
        filter: blur(90px);
        animation: floatOrb 24s ease-in-out infinite alternate-reverse;
        pointer-events: none;
      }

      @keyframes floatOrb {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(50px, -50px) scale(1.1); }
      }

      /* HEADER */
      .mp-header {
        text-align: center;
        margin-bottom: 50px;
        position: relative;
        z-index: 1;
      }

      .mp-eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 3px;
        color: #38BDF8;
        margin-bottom: 10px;
      }

      .mp-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 42px;
        font-weight: 700;
        letter-spacing: -0.5px;
        background: linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }

      .mp-rule {
        width: 70px;
        height: 3px;
        background: linear-gradient(90deg, transparent, #38BDF8, transparent);
        margin: 16px auto 16px;
        border-radius: 2px;
      }

      .mp-subtitle {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 15px;
        color: #94A3B8;
        margin: 0;
      }

      /* GRID (PRESERVED CARD SIZING & SPACING) */
      .mp-grid {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
        justify-content: center;
        gap: 32px;
        position: relative;
        z-index: 1;
      }

      /* CARD (PRESERVED DIMENSIONS: 320px × 470px) */
      .mp-card {
        position: relative;
        width: 320px;
        min-height: 470px;
        display: flex;
        flex-direction: column;
        background: rgba(15, 23, 42, 0.78);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.45);
        opacity: 0;
        transform: translateY(24px) scale(0.97);
        animation: mp-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
      }

      .mp-card:hover {
        transform: translateY(-8px);
        border-color: #38BDF8;
        box-shadow: 0 26px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(56, 189, 248, 0.15);
      }

      @keyframes mp-rise {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* IMAGE CONTAINER (PRESERVED WHITE BACKGROUND #FFFFFF) */
      .mp-image-wrap {
        overflow: hidden;
        height: 220px;
        flex-shrink: 0;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .mp-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .mp-card:hover .mp-image {
        transform: scale(1.08);
      }

      /* PRODUCT INFO */
      .mp-info {
        padding: 22px 22px 24px;
        border-top: 1px dashed rgba(255, 255, 255, 0.1);
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }

      .mp-category {
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #34D399;
        margin: 0 0 8px;
      }

      .mp-name {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: #F8FAFC;
        margin: 0 0 12px;
        line-height: 1.35;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .mp-price {
        font-family: 'JetBrains Mono', monospace;
        font-size: 22px;
        font-weight: 700;
        color: #38BDF8;
        margin: 0 0 18px;
      }

      /* DELETE BUTTON */
      .mp-delete-button {
        width: 100%;
        margin-top: auto;
        padding: 13px 16px;
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: #FFFFFF;
        border: none;
        border-radius: 8px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 6px 18px rgba(239, 68, 68, 0.25);
      }

      .mp-delete-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(239, 68, 68, 0.4);
        filter: brightness(1.1);
      }

      .mp-delete-button:active {
        transform: scale(0.98);
      }

      /* EMPTY STATE */
      .mp-empty {
        max-width: 460px;
        margin: 60px auto 0;
        text-align: center;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        padding: 56px 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        position: relative;
        z-index: 1;
        box-shadow: 0 20px 45px rgba(0,0,0,0.5);
      }

      .mp-empty-icon {
        margin-bottom: 18px;
      }

      .mp-empty-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: #F8FAFC;
        margin: 0 0 8px;
      }

      .mp-empty-copy {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        color: #94A3B8;
        margin: 0;
      }

      /* LOGIN MESSAGE CARD */
      .mp-message-card {
        max-width: 400px;
        margin: 90px auto 0;
        text-align: center;
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(20px);
        padding: 52px 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        position: relative;
        z-index: 1;
        box-shadow: 0 20px 45px rgba(0,0,0,0.5);
      }

      .mp-message-icon {
        margin-bottom: 16px;
      }

      .mp-message-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #F8FAFC;
        margin: 0 0 10px;
      }

      .mp-message-copy {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 14px;
        color: #94A3B8;
        margin: 0;
      }

      /* SKELETON LOADING */
      .mp-skeleton-img {
        height: 220px;
        flex-shrink: 0;
        background: linear-gradient(100deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
        background-size: 200% 100%;
        animation: mp-shimmer 1.5s infinite;
      }

      .mp-skeleton-info {
        padding: 20px 22px 22px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .mp-skeleton-line {
        height: 12px;
        border-radius: 4px;
        margin-bottom: 12px;
        background: linear-gradient(100deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
        background-size: 200% 100%;
        animation: mp-shimmer 1.5s infinite;
      }

      .mp-skeleton-line.short { width: 40%; }
      .mp-skeleton-line.long { width: 85%; height: 18px; }
      .mp-skeleton-line.mid { width: 55%; margin-bottom: 0; }

      @keyframes mp-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* RESPONSIVE */
      @media (max-width: 480px) {
        .mp-title { font-size: 34px; }
        .mp-grid { grid-template-columns: 1fr; }
        .mp-card { width: 100%; max-width: 320px; margin: 0 auto; }
      }
    `}</style>
  );
}

// =====================================================
// PAGE CONTAINER STYLES
// =====================================================
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#080C14",
    padding: "56px 40px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
};

export default MyProducts;
