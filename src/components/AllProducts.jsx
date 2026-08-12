import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [addingProduct, setAddingProduct] = useState(null);

  const navigate = useNavigate();

  const BASE_URL =
    "https://industries-harold-developer-those.trycloudflare.com/api/products";

  // =====================================================
  // GET ALL PRODUCTS (UNCHANGED)
  // =====================================================
  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${BASE_URL}/all`);

      console.log("Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);

      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD PRODUCTS (UNCHANGED)
  // =====================================================
  useEffect(() => {
    getProducts();
  }, []);

  // =====================================================
  // ADD PRODUCT TO CART (UNCHANGED)
  // =====================================================
  const addToCart = async (productId) => {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    // Check whether user is logged in
    if (!userId) {
      alert("Please login first to add products to cart.");
      navigate("/signin");
      return;
    }

    try {
      setAddingProduct(productId);

      // Send request to Spring Boot
      const response = await axios.post(
        `${BASE_URL}/cart/${userId}/add/${productId}`,
      );

      console.log("Cart updated:", response.data);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);

      if (error.response) {
        console.log("Backend error:", error.response.data);
      }

      alert("Unable to add product to cart.");
    } finally {
      setAddingProduct(null);
    }
  };

  // =====================================================
  // SEARCH BUTTON (UNCHANGED)
  // =====================================================
  const handleSearch = () => {
    setSearch(searchInput.trim());
  };

  // =====================================================
  // SEARCH USING ENTER KEY (UNCHANGED)
  // =====================================================
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // =====================================================
  // CLEAR SEARCH (UNCHANGED)
  // =====================================================
  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  // =====================================================
  // FILTER PRODUCTS (UNCHANGED)
  // =====================================================
  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    return (
      productName.includes(searchText) || productCategory.includes(searchText)
    );
  });

  // =====================================================
  // VIEW PRODUCT DETAILS (UNCHANGED)
  // =====================================================
  const viewDetails = (id) => {
    navigate(`/view/${id}`);
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

          .products-page {
            min-height: 100vh;
            background-color: #080C14;
            padding: 50px 40px 70px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #F8FAFC;
            position: relative;
            overflow: hidden;
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

          .products-header {
            max-width: 1200px;
            margin: 0 auto 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 22px;
            position: relative;
            z-index: 1;
          }

          .products-eyebrow {
            margin: 0 0 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #38BDF8;
          }

          .products-title {
            margin: 0;
            font-family: 'Space Grotesk', sans-serif;
            text-transform: uppercase;
            font-size: 38px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .products-subtitle {
            margin: 8px 0 0;
            font-size: 15px;
            color: #94A3B8;
          }

          .search-container {
            display: flex;
            align-items: center;
            gap: 10px;
            width: auto;
          }

          .search-input {
            width: 280px;
            padding: 12px 16px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 8px;
            font-size: 14px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            outline: none;
            background-color: rgba(15, 23, 42, 0.8);
            color: #F8FAFC;
            transition: all 0.25s ease;
          }

          .search-input::placeholder {
            color: #64748B;
          }

          .search-input:focus {
            border-color: #38BDF8;
            background-color: rgba(2, 6, 23, 0.9);
            box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
          }

          .search-button,
          .clear-button {
            padding: 12px 22px;
            border-radius: 8px;
            font-size: 13px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            letter-spacing: 0.5px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.25s ease;
          }

          .search-button {
            background: linear-gradient(135deg, #06B6D4, #6366F1);
            color: #FFFFFF;
            border: none;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
          }

          .search-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(6, 182, 212, 0.35);
          }

          .clear-button {
            background-color: rgba(255, 255, 255, 0.05);
            color: #CBD5E1;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .clear-button:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #F8FAFC;
          }

          .result-text {
            max-width: 1200px;
            margin: 22px auto 25px;
            color: #94A3B8;
            font-size: 15px;
            position: relative;
            z-index: 1;
          }

          .result-text strong {
            color: #38BDF8;
          }

          /* PRESERVED GRID ALIGNMENT & SIZING */
          .product-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 30px auto 0;
            align-items: stretch;
            position: relative;
            z-index: 1;
          }

          /* PRESERVED CARD SIZING STRUCTURE WITH EXTREME GLASS STYLING */
          @keyframes cardReveal {
            from {
              opacity: 0;
              transform: translateY(28px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .product-card {
            background-color: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 400px;
            animation: cardReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .product-card:hover {
            transform: translateY(-8px);
            border-color: #38BDF8;
            box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15);
          }

          .image-container {
            width: 100%;
            height: 200px;
            background-color: rgb(250, 251, 255);
            overflow: hidden;
            flex-shrink: 0;
            border-radius: 12px 12px 0 0;
            position: relative;
          }

          .product-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
          }

          .product-card:hover .product-image {
            transform: scale(1.08);
            filter: brightness(1.08);
          }

          .product-details {
            padding: 18px 20px 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
            border-top: 1px dashed rgba(255, 255, 255, 0.1);
          }

          .product-name {
            margin: 0 0 8px;
            font-size: 17px;
            font-weight: 700;
            color: #F8FAFC;
            min-height: 44px;
            line-height: 22px;
            overflow-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .product-category {
            margin: 0 0 12px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            color: #34D399;
            font-weight: 600;
          }

          .product-price {
            margin: 0 0 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 22px;
            font-weight: 700;
            color: #38BDF8;
          }

          .button-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: auto;
          }

          .view-button,
          .cart-button {
            width: 100%;
            padding: 12px;
            border-radius: 6px;
            font-size: 13px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
          }

          .view-button {
            background: linear-gradient(135deg, #06B6D4, #6366F1);
            color: #FFFFFF;
            border: none;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.25);
          }

          .view-button::after {
            content: "";
            position: absolute;
            top: 0; left: -60%;
            width: 40%; height: 100%;
            background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: skewX(-20deg);
            transition: left 0.6s ease;
          }

          .view-button:hover::after {
            left: 140%;
          }

          .view-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
            filter: brightness(1.1);
          }

          .cart-button {
            background-color: rgba(255, 255, 255, 0.05);
            color: #F8FAFC;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .cart-button:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: #38BDF8;
          }

          .cart-button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }

          .loading-message {
            text-align: center;
            color: #94A3B8;
            margin-top: 80px;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px;
            position: relative;
            z-index: 1;
          }

          .no-results {
            max-width: 500px;
            margin: 80px auto;
            padding: 40px;
            text-align: center;
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 14px;
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 1;
          }

          .no-results h2 {
            font-family: 'Space Grotesk', sans-serif;
            text-transform: uppercase;
            color: #F8FAFC;
            margin-top: 0;
          }

          .no-results p {
            color: #94A3B8;
          }

          .clear-result-button {
            margin-top: 16px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #06B6D4, #6366F1);
            color: #FFFFFF;
            border: none;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
          }

          /* TABLET RESPONSIVE PRESERVED */
          @media (max-width: 1000px) {
            .products-page {
              padding: 35px 25px;
            }
            .products-header {
              flex-direction: column;
              align-items: stretch;
              gap: 20px;
            }
            .search-container {
              width: 100%;
            }
            .search-input {
              flex: 1;
              width: auto;
            }
            .product-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 20px;
            }
          }

          /* MOBILE RESPONSIVE PRESERVED */
          @media (max-width: 600px) {
            .products-page {
              padding: 25px 15px;
            }
            .products-title {
              font-size: 28px;
            }
            .search-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
            }
            .search-input {
              grid-column: 1 / -1;
              width: 100%;
            }
            .product-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}
      </style>

      <div className="products-page">
        {/* AMBIENT LIGHT MESH */}
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />

        {/* HEADER */}
        <div className="products-header">
          <div>
            <p className="products-eyebrow">Full Catalog Index</p>
            <h1 className="products-title">All Products</h1>
            <p className="products-subtitle">Explore our complete collection</p>
          </div>

          {/* SEARCH BAR */}
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search by name or category..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="search-button" onClick={handleSearch}>
              Search
            </button>

            {search && (
              <button className="clear-button" onClick={clearSearch}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* SEARCH RESULT */}
        {!loading && search && (
          <p className="result-text">
            Search results for: <strong>"{search}"</strong>
          </p>
        )}

        {/* LOADING */}
        {loading ? (
          <h2 className="loading-message">Loading products catalog...</h2>
        ) : filteredProducts.length === 0 ? (
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try searching with a different product name or category.</p>

            {search && (
              <button onClick={clearSearch} className="clear-result-button">
                Show All Products
              </button>
            )}
          </div>
        ) : (
          /* PRESERVED PRODUCT GRID */
          <div className="product-grid">
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="product-card"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {/* PRODUCT IMAGE */}
                <div className="image-container">
                  <img
                    src={`https://industries-harold-developer-those.trycloudflare.com/uploads/${product.productImg}`}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="product-details">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₹{product.price}</p>

                  {/* BUTTONS */}
                  <div className="button-container">
                    <button
                      onClick={() => viewDetails(product.id)}
                      className="view-button"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllProducts;
