import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // ==========================================
  // GET LOGGED-IN USER (UNCHANGED)
  // ==========================================
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // ==========================================
  // GET PRODUCT + RELATED PRODUCTS (UNCHANGED)
  // ==========================================
  const getProduct = async () => {
    try {
      setLoading(true);

      // Get current product
      const response = await axios.get(
        `https://industries-harold-developer-those.trycloudflare.com/api/products/${id}`,
      );

      const currentProduct = response.data;
      setProduct(currentProduct);

      // Get all products
      const allProductsResponse = await axios.get(
        "https://industries-harold-developer-those.trycloudflare.com/api/products/all",
      );

      // Filter same category, exclude current product
      const related = allProductsResponse.data.filter(
        (item) =>
          item.category === currentProduct.category &&
          item.id !== currentProduct.id,
      );

      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  // ==========================================
  // ADD TO CART (UNCHANGED LOGIC & ENDPOINT)
  // ==========================================
  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first to add products to cart.");
      navigate("/signin");
      return;
    }

    if (!product) {
      return;
    }

    try {
      setAddingToCart(true);

      const response = await axios.post(
        `https://industries-harold-developer-those.trycloudflare.com/api/products/cart/${userId}/add/${product.id}`,
      );

      console.log("Cart response:", response.data);

      alert(`${product.name} added to your cart successfully!`);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);

      if (error.response) {
        console.error("Backend error:", error.response.data);
      }

      alert("Failed to add product to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  // ==========================================
  // DELETE PRODUCT (UNCHANGED)
  // ==========================================
  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `https://industries-harold-developer-those.trycloudflare.com/api/products/${id}`,
      );
      alert("Product deleted successfully!");
      navigate("/all");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const FontLink = () => (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
    />
  );

  // TOP BAR BREADCRUMB
  const TopBar = () => (
    <div className="vd-top-bar" style={styles.topBar}>
      <div className="vd-top-bar-inner" style={styles.topBarInner}>
        <div className="vd-breadcrumb" style={styles.breadcrumb}>
          {product && (
            <>
              <span className="vd-crumb-category" style={styles.crumbCategory}>
                {product.category}
              </span>
              <span style={styles.crumbDivider}>/</span>
              <span className="vd-crumb-current" style={styles.crumbCurrent}>
                {product.name.length > 40
                  ? product.name.slice(0, 40) + "..."
                  : product.name}
              </span>
            </>
          )}
        </div>

        <span className="vd-top-bar-mark" style={styles.topBarMark}>
          ◆ CURATED GOODS
        </span>
      </div>
      <div style={styles.topBarRule} />
    </div>
  );

  // LOADING STATE
  if (loading) {
    return (
      <div style={styles.messageContainer}>
        <FontLink />
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div style={styles.loadingBlock}>
          <div style={styles.spinner} />
          <h2 style={styles.message}>Loading product details...</h2>
        </div>
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div style={styles.messageContainer}>
        <FontLink />
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div style={styles.notFoundBlock}>
          <h2 style={styles.message}>Product not found</h2>
          <button
            onClick={() => navigate("/all")}
            style={styles.backButton}
            className="btn-shine"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vd-page" style={styles.page}>
      <FontLink />

      {/* AMBIENT LIGHT MESH */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />

      {/* MAIN PRODUCT WRAPPER */}
      <div
        className="vd-main-product-wrapper"
        style={styles.mainProductWrapper}
      >
        <TopBar />

        {/* MAIN PRODUCT CARD */}
        <div className="vd-fade-in vd-product-card" style={styles.card}>
          {/* PRODUCT IMAGE */}
          <div
            className="vd-product-image-container"
            style={styles.imageContainer}
          >
            <img
              src={`https://industries-harold-developer-those.trycloudflare.com/uploads/${product.productImg}`}
              alt={product.name}
              style={styles.image}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>

          {/* PRODUCT DETAILS */}
          <div className="vd-product-details" style={styles.details}>
            <p style={styles.eyebrow}>PRODUCT SPECIFICATION</p>
            <h1 className="vd-product-title" style={styles.title}>
              {product.name}
            </h1>
            <p className="vd-product-category" style={styles.category}>
              {product.category}
            </p>
            <p className="vd-product-price" style={styles.price}>
              ₹{product.price}
            </p>

            {/* BUTTONS */}
            <div className="vd-button-container" style={styles.buttonContainer}>
              <button
                className="vd-cart-btn btn-shine"
                onClick={handleAddToCart}
                style={{
                  ...styles.cartButton,
                  opacity: addingToCart ? 0.6 : 1,
                }}
                disabled={addingToCart}
              >
                {addingToCart ? "Adding to Cart..." : "🛒 Add to Cart"}
              </button>

              <button
                className="vd-back-btn"
                onClick={() => navigate("/all")}
                style={styles.backButton}
              >
                ← Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="vd-related-section" style={styles.relatedSection}>
          <div className="vd-related-header" style={styles.relatedHeader}>
            <p style={styles.relatedEyebrow}>YOU MAY ALSO LIKE</p>
            <h2 className="vd-related-title" style={styles.relatedTitle}>
              More {product.category} Products
            </h2>
            <div style={styles.relatedRule} />
            <p className="vd-related-subtitle" style={styles.relatedSubtitle}>
              Explore more products from the same category
            </p>
          </div>

          <div className="related-products-grid" style={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct, index) => (
              <div
                key={relatedProduct.id}
                className="vd-related-card"
                style={{
                  ...styles.relatedCard,
                  animationDelay: `${index * 60}ms`,
                }}
              >
                <div
                  className="vd-related-image-container"
                  style={styles.relatedImageContainer}
                >
                  <img
                    className="vd-related-image"
                    src={`https://industries-harold-developer-those.trycloudflare.com/uploads/${relatedProduct.productImg}`}
                    alt={relatedProduct.name}
                    style={styles.relatedImage}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>

                <div className="vd-related-info" style={styles.relatedInfo}>
                  <p style={styles.relatedCategory}>
                    {relatedProduct.category}
                  </p>
                  <h3 style={styles.relatedName}>{relatedProduct.name}</h3>
                  <p style={styles.relatedPrice}>₹{relatedProduct.price}</p>

                  <button
                    className="vd-view-btn btn-shine"
                    style={styles.viewDetailsButton}
                    onClick={() => navigate(`/view/${relatedProduct.id}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <style>{`
        * {
          box-sizing: border-box;
        }

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

        .vd-fade-in {
          animation: vd-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes vd-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-shine::after {
          content: "";
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }

        .btn-shine:hover:not(:disabled)::after {
          left: 140%;
        }

        .btn-shine:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(6, 182, 212, 0.35);
          filter: brightness(1.1);
        }

        .vd-back-btn {
          transition: all 0.25s ease;
        }
        .vd-back-btn:hover {
          border-color: #38BDF8 !important;
          color: #38BDF8 !important;
          background: rgba(56, 189, 248, 0.1) !important;
        }

        .vd-related-card {
          opacity: 0;
          animation: vd-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vd-related-card:hover {
          transform: translateY(-6px);
          border-color: #38BDF8 !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
        }

        .vd-related-image {
          transition: transform 0.5s ease;
        }

        .vd-related-card:hover .vd-related-image {
          transform: scale(1.08);
        }

        @keyframes vd-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .vd-product-card {
            flex-direction: column !important;
          }
          .vd-product-image-container {
            width: 100% !important;
            height: 380px !important;
          }
          .vd-product-details {
            width: 100% !important;
            padding: 30px !important;
          }
          .related-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 600px) {
          .related-products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const DISPLAY = "'Space Grotesk', sans-serif";
const BODY = "'Plus Jakarta Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#080C14",
    padding: "40px 20px 70px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: BODY,
    boxSizing: "border-box",
    color: "#F8FAFC",
    position: "relative",
    overflow: "hidden",
  },

  mainProductWrapper: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
  },

  topBar: {
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(20px)",
    borderTopLeftRadius: "14px",
    borderTopRightRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderBottom: "none",
  },

  topBarInner: {
    width: "100%",
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  crumbCategory: {
    fontFamily: MONO,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#38BDF8",
  },

  crumbDivider: {
    fontFamily: MONO,
    fontSize: "11px",
    color: "#64748B",
  },

  crumbCurrent: {
    fontFamily: BODY,
    fontSize: "13px",
    color: "#CBD5E1",
  },

  topBarMark: {
    fontFamily: MONO,
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "2px",
    color: "#34D399",
  },

  topBarRule: {
    height: "1px",
    background:
      "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent)",
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.78)",
    backdropFilter: "blur(24px)",
    borderBottomLeftRadius: "14px",
    borderBottomRightRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.55)",
    display: "flex",
    flexDirection: "row",
  },

  imageContainer: {
    width: "55%",
    minHeight: "460px",
    height: "460px",
    backgroundColor: "rgb(246, 246, 248)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    flexShrink: 0,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  details: {
    width: "45%",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: "1px dashed rgba(255, 255, 255, 0.1)",
  },

  eyebrow: {
    fontFamily: MONO,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#38BDF8",
    margin: "0 0 10px",
  },

  title: {
    fontFamily: DISPLAY,
    margin: "0 0 12px",
    fontSize: "36px",
    fontWeight: "700",
    color: "#F8FAFC",
    lineHeight: "1.25",
  },

  category: {
    fontFamily: MONO,
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#34D399",
    margin: "0 0 20px",
  },

  price: {
    fontFamily: MONO,
    fontSize: "32px",
    fontWeight: "700",
    color: "#38BDF8",
    margin: "0 0 32px",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
  },

  cartButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    fontFamily: DISPLAY,
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(6, 182, 212, 0.25)",
  },

  backButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "transparent",
    color: "#F8FAFC",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    fontFamily: MONO,
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },

  relatedSection: {
    width: "100%",
    maxWidth: "1200px",
    marginTop: "70px",
    position: "relative",
    zIndex: 1,
  },

  relatedHeader: {
    textAlign: "center",
    marginBottom: "40px",
  },

  relatedEyebrow: {
    fontFamily: MONO,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "3px",
    color: "#38BDF8",
    margin: "0 0 10px",
  },

  relatedTitle: {
    fontFamily: DISPLAY,
    fontSize: "32px",
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#F8FAFC",
    margin: "0",
  },

  relatedRule: {
    width: "70px",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #38BDF8, transparent)",
    margin: "16px auto",
    borderRadius: "2px",
  },

  relatedSubtitle: {
    fontFamily: BODY,
    fontSize: "14px",
    color: "#94A3B8",
    margin: "0",
  },

  relatedGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "28px",
  },

  relatedCard: {
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
  },

  relatedImageContainer: {
    width: "100%",
    height: "210px",
    backgroundColor: "rgb(243, 244, 248)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    overflow: "hidden",
  },

  relatedImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  relatedInfo: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  relatedCategory: {
    fontFamily: MONO,
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#34D399",
    margin: "0 0 8px",
  },

  relatedName: {
    fontFamily: DISPLAY,
    fontSize: "20px",
    fontWeight: "700",
    color: "#F8FAFC",
    margin: "0 0 10px",
  },

  relatedPrice: {
    fontFamily: MONO,
    fontSize: "18px",
    fontWeight: "700",
    color: "#38BDF8",
    margin: "0 0 18px",
  },

  viewDetailsButton: {
    width: "100%",
    padding: "12px",
    marginTop: "auto",
    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "6px",
    fontFamily: MONO,
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    cursor: "pointer",
  },

  messageContainer: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: BODY,
    backgroundColor: "#080C14",
    position: "relative",
    overflow: "hidden",
  },

  loadingBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  notFoundBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(56, 189, 248, 0.2)",
    borderTopColor: "#38BDF8",
    borderRadius: "50%",
    marginBottom: "18px",
    animation: "vd-spin 0.8s linear infinite",
  },

  message: {
    fontFamily: DISPLAY,
    color: "#F8FAFC",
    marginBottom: "20px",
    fontSize: "22px",
  },
};

export default ViewDetails;
