import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo}>Market</div>

      {/* Navigation Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Home
        </Link>

        <Link to="/all" style={styles.link}>
          All Products
        </Link>

        <Link to="/add" style={styles.link}>
          Add Product
        </Link>

        <Link to="/cart" style={styles.cartLink}>
          🛒 Cart
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    height: "70px",
    backgroundColor: "#111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 50px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  logo: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "35px",
  },

  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  },
  cartLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  cartCount: {
    backgroundColor: "#ffffff",
    color: "#111111",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
  },
};

export default Navbar;
