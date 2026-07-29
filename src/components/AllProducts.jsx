import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // GET ALL PRODUCTS
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/all"
      );

      console.log("Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // LOAD PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  // SEARCH BUTTON
  const handleSearch = () => {
    setSearch(searchInput.trim());
  };

  // SEARCH USING ENTER KEY
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // CLEAR SEARCH
  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  // FILTER BY PRODUCT NAME OR CATEGORY
  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    return (
      productName.includes(searchText) ||
      productCategory.includes(searchText)
    );
  });

  // VIEW PRODUCT DETAILS
  const viewDetails = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            All Products
          </h1>

          <p style={styles.subtitle}>
            Explore our complete collection
          </p>
        </div>

        {/* SEARCH BAR */}

        <div style={styles.searchContainer}>

          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={styles.searchInput}
          />

          <button
            onClick={handleSearch}
            style={styles.searchButton}
          >
            Search
          </button>

          {search && (
            <button
              onClick={clearSearch}
              style={styles.clearButton}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* SEARCH RESULT */}

      {!loading && search && (
        <p style={styles.resultText}>
          Search results for:
          <strong> "{search}"</strong>
        </p>
      )}

      {/* LOADING */}

      {loading ? (

        <h2 style={styles.message}>
          Loading products...
        </h2>

      ) : filteredProducts.length === 0 ? (

        <div style={styles.noResults}>

          <h2>
            No products found
          </h2>

          <p>
            Try searching with a different
            product name or category.
          </p>

          {search && (
            <button
              onClick={clearSearch}
              style={styles.clearResultButton}
            >
              Show All Products
            </button>
          )}

        </div>

      ) : (

        /* PRODUCT GRID */

        <div style={styles.productGrid}>

          {filteredProducts.map((product) => (

            <div
              key={product.id}
              style={styles.card}
            >

              {/* PRODUCT IMAGE */}

              <div style={styles.imageContainer}>

                <img
                  src={`http://localhost:8080/uploads/${product.productImg}`}
                  alt={product.name}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />

              </div>

              {/* PRODUCT DETAILS */}

              <div style={styles.details}>

                <h2 style={styles.productName}>
                  {product.name}
                </h2>

                <p style={styles.category}>
                  {product.category}
                </p>

                <p style={styles.price}>
                  ₹{product.price}
                </p>

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

      )}

    </div>
  );
}


// ==========================================
// STYLES
// ==========================================

const styles = {

  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  header: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
  },

  title: {
    margin: "0",
    fontSize: "36px",
    fontWeight: "700",
    color: "#111111",
  },

  subtitle: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#777777",
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  searchInput: {
    width: "280px",
    padding: "12px 15px",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },

  searchButton: {
    padding: "12px 20px",
    backgroundColor: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  clearButton: {
    padding: "12px 15px",
    backgroundColor: "#777777",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
  },

  resultText: {
    maxWidth: "1200px",
    margin: "0 auto 25px",
    color: "#555555",
    fontSize: "16px",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "stretch",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e5e5e5",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "column",
    height: "450px",
  },

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

  details: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  productName: {
    margin: "0 0 10px 0",
    fontSize: "20px",
    fontWeight: "600",
    color: "#111111",
    minHeight: "48px",
    lineHeight: "24px",
  },

  category: {
    margin: "0 0 15px 0",
    fontSize: "14px",
    color: "#777777",
  },

  price: {
    margin: "0 0 20px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111111",
  },

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

  message: {
    textAlign: "center",
    color: "#555555",
    marginTop: "80px",
  },

  noResults: {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
  },

  clearResultButton: {
    marginTop: "15px",
    padding: "12px 20px",
    backgroundColor: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

};

export default AllProducts;