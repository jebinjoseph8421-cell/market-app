import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ==============================
  // GET ALL PRODUCTS
  // ==============================
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/all",
      );

      console.log("Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load products when Home Page opens
  useEffect(() => {
    getProducts();
  }, []);

  // ==============================
  // VIEW PRODUCT DETAILS
  // ==============================
  const viewDetails = (id) => {
    navigate(`/view/${id}`);
  };

  // ==============================
  // PRODUCT CATEGORIES
  // ==============================
  const categories = [
    "Electrical",
    "Electronics",
    "Books",
    "Tools",
    "Foods",
    "Utilities",
    "Fashion",
  ];

  return (
    <div style={styles.page}>
      {/* ===================================== */}
      {/* HERO SECTION */}
      {/* ===================================== */}

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.welcome}>WELCOME TO MARKET</p>

          <h1 style={styles.heroTitle}>
            Discover.
            <br />
            Shop.
            <br />
            Enjoy.
          </h1>

          <p style={styles.heroText}>
            Explore our collection of quality products designed to bring
            convenience and value into your everyday life.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/all" style={styles.shopButton}>
              Shop Now →
            </Link>

            <Link to="/add" style={styles.addButton}>
              Add Product
            </Link>
          </div>
        </div>

        {/* HERO IMAGE */}

        <div style={styles.heroImage}></div>
      </section>

      {/* ===================================== */}
      {/* OFFER SECTION */}
      {/* ===================================== */}

      <section style={styles.offer}>
        <p style={styles.offerLabel}>LIMITED TIME OFFER</p>

        <h2 style={styles.offerTitle}>Get 20% Off Your First Order</h2>

        <p style={styles.offerText}>
          Start shopping today and enjoy exclusive savings on selected products.
        </p>

        <Link to="/all" style={styles.offerButton}>
          Explore Offers
        </Link>
      </section>

      {/* ===================================== */}
      {/* CATEGORY PRODUCTS */}
      {/* ===================================== */}

      <section style={styles.categorySection}>
        {/* SECTION HEADER */}

        <div style={styles.sectionHeader}>
          <p style={styles.sectionLabel}>SHOP BY CATEGORY</p>

          <h2 style={styles.sectionTitle}>Explore Our Collection</h2>

          <p style={styles.sectionSubtitle}>
            Find the perfect products from your favorite categories.
          </p>
        </div>

        {/* LOADING */}

        {loading ? (
          <h2 style={styles.message}>Loading products...</h2>
        ) : products.length === 0 ? (
          /* NO PRODUCTS */

          <div style={styles.emptyContainer}>
            <h2 style={styles.message}>No products available</h2>

            <Link to="/add" style={styles.addProductButton}>
              Add Your First Product
            </Link>
          </div>
        ) : (
          /* CATEGORY LOOP */

          categories.map((category) => {
            // Get products belonging to this category

            const categoryProducts = products.filter(
              (product) =>
                product.category?.toLowerCase().trim() ===
                category.toLowerCase().trim(),
            );

            // Don't show category if no products exist

            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <div key={category} style={styles.categoryContainer}>
                {/* CATEGORY HEADER */}

                <div style={styles.categoryHeader}>
                  <div>
                    <p style={styles.categoryLabel}>CATEGORY</p>

                    <h2 style={styles.categoryTitle}>{category}</h2>
                  </div>

                  <Link to="/all" style={styles.viewAll}>
                    View All Products →
                  </Link>
                </div>

                {/* PRODUCTS */}

                <div style={styles.productGrid}>
                  {categoryProducts.slice(0, 4).map((product) => (
                    <div key={product.id} style={styles.card}>
                      {/* PRODUCT IMAGE */}

                      <div style={styles.imageContainer}>
                        <img
                          src={`http://localhost:8080/uploads/${product.productImg}`}
                          alt={product.name}
                          style={styles.image}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      </div>

                      {/* PRODUCT DETAILS */}

                      <div style={styles.details}>
                        <h3 style={styles.productName}>{product.name}</h3>

                        <p style={styles.category}>{product.category}</p>

                        <p style={styles.price}>₹{product.price}</p>

                        {/* VIEW DETAILS */}

                        <button
                          onClick={() => viewDetails(product.id)}
                          style={styles.viewButton}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* ===================================== */}
      {/* FEATURES */}
      {/* ===================================== */}

      <section style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🚚</div>

          <h3>Fast Delivery</h3>

          <p>Quick and reliable delivery directly to your doorstep.</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>✓</div>

          <h3>Premium Quality</h3>

          <p>Carefully selected products with excellent quality.</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>↻</div>

          <h3>Easy Returns</h3>

          <p>Simple and hassle-free returns for your convenience.</p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>♡</div>

          <h3>Trusted Shopping</h3>

          <p>A safe and comfortable shopping experience.</p>
        </div>
      </section>

      {/* ===================================== */}
      {/* CUSTOMER REVIEWS */}
      {/* ===================================== */}

      <section style={styles.reviews}>
        <p style={styles.sectionLabel}>CUSTOMER REVIEWS</p>

        <h2 style={styles.sectionTitle}>What Our Customers Say</h2>

        <div style={styles.reviewGrid}>
          <div style={styles.reviewCard}>
            <div style={styles.stars}>★★★★★</div>

            <p>
              "Amazing quality and very fast delivery. I really loved my
              purchase!"
            </p>

            <strong>— Alex</strong>
          </div>

          <div style={styles.reviewCard}>
            <div style={styles.stars}>★★★★★</div>

            <p>
              "The website is easy to use and the products are excellent. Highly
              recommended!"
            </p>

            <strong>— Sarah</strong>
          </div>

          <div style={styles.reviewCard}>
            <div style={styles.stars}>★★★★★</div>

            <p>
              "Great products at reasonable prices. I will definitely shop here
              again."
            </p>

            <strong>— Michael</strong>
          </div>
        </div>
      </section>

      {/* ===================================== */}
      {/* FINAL CTA */}
      {/* ===================================== */}

      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Find Your Next Favorite?</h2>

        <p style={styles.ctaText}>
          Browse our complete collection and discover something special.
        </p>

        <Link to="/all" style={styles.ctaButton}>
          Start Shopping →
        </Link>
      </section>

      {/* ===================================== */}
      {/* FOOTER */}
      {/* ===================================== */}

      <footer style={styles.footer}>© 2026 Market. All Rights Reserved.</footer>
    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = {
  // MAIN PAGE

  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#111111",
    fontFamily: "Arial, sans-serif",
  },

  // =====================================
  // HERO
  // =====================================

  hero: {
    minHeight: "80vh",
    backgroundColor: "#000000",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 8%",
    gap: "50px",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },

  heroContent: {
    maxWidth: "600px",
  },

  welcome: {
    letterSpacing: "4px",
    fontSize: "14px",
    color: "#cccccc",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "60px",
    lineHeight: "1.1",
    margin: "0 0 25px",
    fontWeight: "700",
  },

  heroText: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#cccccc",
    marginBottom: "35px",
  },

  heroButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  shopButton: {
    display: "inline-block",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "15px 30px",
    textDecoration: "none",
    borderRadius: "30px",
    fontWeight: "bold",
  },

  addButton: {
    display: "inline-block",
    border: "1px solid #ffffff",
    color: "#ffffff",
    padding: "15px 30px",
    textDecoration: "none",
    borderRadius: "30px",
    fontWeight: "bold",
  },

  heroImage: {
    width: "420px",
    height: "500px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    boxShadow: "20px 20px 0px #ffffff",
  },

  // =====================================
  // OFFER
  // =====================================

  offer: {
    padding: "70px 8%",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },

  offerLabel: {
    letterSpacing: "3px",
    fontSize: "13px",
    fontWeight: "bold",
  },

  offerTitle: {
    fontSize: "40px",
    margin: "15px 0",
  },

  offerText: {
    color: "#555555",
    fontSize: "17px",
    marginBottom: "30px",
  },

  offerButton: {
    display: "inline-block",
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "14px 35px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  // =====================================
  // CATEGORY SECTION
  // =====================================

  categorySection: {
    padding: "80px 8%",
    backgroundColor: "#ffffff",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },

  sectionLabel: {
    letterSpacing: "3px",
    fontSize: "13px",
    fontWeight: "bold",
    color: "#555555",
  },

  sectionTitle: {
    fontSize: "40px",
    margin: "15px 0",
  },

  sectionSubtitle: {
    color: "#666666",
    fontSize: "17px",
  },

  // =====================================
  // CATEGORY
  // =====================================

  categoryContainer: {
    maxWidth: "1200px",
    margin: "0 auto 70px",
  },

  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    borderBottom: "2px solid #111111",
    paddingBottom: "15px",
  },

  categoryLabel: {
    margin: "0 0 5px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#777777",
    fontWeight: "bold",
  },

  categoryTitle: {
    fontSize: "28px",
    margin: "0",
  },

  viewAll: {
    color: "#111111",
    textDecoration: "none",
    fontWeight: "bold",
  },

  // =====================================
  // PRODUCT GRID
  // =====================================

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
  },

  // =====================================
  // PRODUCT CARD
  // =====================================

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    minHeight: "430px",
  },

  // =====================================
  // IMAGE
  // =====================================

  imageContainer: {
    width: "100%",
    height: "220px",
    backgroundColor: "#eeeeee",
    overflow: "hidden",
    flexShrink: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  // =====================================
  // DETAILS
  // =====================================

  details: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },

  productName: {
    margin: "0 0 10px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#111111",
  },

  category: {
    margin: "0 0 10px",
    fontSize: "14px",
    color: "#777777",
  },

  price: {
    margin: "0 0 20px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111111",
  },

  // =====================================
  // VIEW BUTTON
  // =====================================

  viewButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "auto",
  },

  // =====================================
  // EMPTY
  // =====================================

  emptyContainer: {
    textAlign: "center",
    padding: "50px",
  },

  message: {
    textAlign: "center",
    color: "#555555",
    margin: "0 0 25px",
  },

  addProductButton: {
    display: "inline-block",
    backgroundColor: "#111111",
    color: "#ffffff",
    padding: "14px 25px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  // =====================================
  // FEATURES
  // =====================================

  features: {
    padding: "70px 8%",
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },

  feature: {
    flex: "1",
    minWidth: "220px",
  },

  featureIcon: {
    fontSize: "35px",
  },

  // =====================================
  // REVIEWS
  // =====================================

  reviews: {
    padding: "80px 8%",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },

  reviewGrid: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  reviewCard: {
    flex: "1",
    minWidth: "250px",
    maxWidth: "350px",
    backgroundColor: "#f5f5f5",
    padding: "30px",
    borderRadius: "10px",
    lineHeight: "1.7",
  },

  stars: {
    fontSize: "22px",
    marginBottom: "10px",
  },

  // =====================================
  // CTA
  // =====================================

  cta: {
    backgroundColor: "#000000",
    color: "#ffffff",
    textAlign: "center",
    padding: "80px 20px",
  },

  ctaTitle: {
    fontSize: "45px",
    margin: "0 0 20px",
  },

  ctaText: {
    color: "#cccccc",
    fontSize: "18px",
    marginBottom: "30px",
  },

  ctaButton: {
    display: "inline-block",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "15px 35px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  // =====================================
  // FOOTER
  // =====================================

  footer: {
    backgroundColor: "#111111",
    color: "#888888",
    textAlign: "center",
    padding: "25px",
    fontSize: "14px",
  },
};

export default App;
