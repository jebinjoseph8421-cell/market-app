import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Plus+Jakarta+Sans:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
      />
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          .navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px clamp(20px, 5vw, 60px);
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
          }

          .navbar-logo-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
          }

          .navbar-logo {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 24px;
            letter-spacing: -0.5px;
            text-transform: uppercase;
            background: linear-gradient(135deg, #FFFFFF 30%, #38BDF8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .navbar-logo-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #38BDF8;
            box-shadow: 0 0 10px #38BDF8;
          }

          .menu-button {
            display: none;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #F8FAFC;
            font-size: 20px;
            width: 42px;
            height: 42px;
            border-radius: 8px;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
          }

          .menu-button:hover {
            background-color: rgba(56, 189, 248, 0.15);
            border-color: #38BDF8;
            color: #38BDF8;
          }

          .navbar-links {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .navbar-link {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: #CBD5E1;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 8px;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
          }

          .navbar-link:hover {
            color: #F8FAFC;
            background-color: rgba(255, 255, 255, 0.08);
            transform: translateY(-1px);
          }

          .cart-link {
            margin-left: 6px;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: #38BDF8;
          }

          .cart-link:hover {
            background: linear-gradient(135deg, #06B6D4, #6366F1);
            color: #FFFFFF;
            border-color: transparent;
            box-shadow: 0 4px 15px rgba(6, 182, 212, 0.35);
          }

          /* MOBILE RESPONSIVE DRAWER */
          @media (max-width: 760px) {
            .menu-button {
              display: flex;
            }

            .navbar-links {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              background: rgba(15, 23, 42, 0.95);
              backdrop-filter: blur(24px);
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              max-height: 0;
              overflow: hidden;
              opacity: 0;
              transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            }

            .navbar-links-open {
              max-height: 420px;
              opacity: 1;
              padding: 10px 0;
            }

            .navbar-link {
              padding: 16px 28px;
              border-radius: 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
              text-align: left;
              font-size: 13px;
            }

            .cart-link {
              margin-left: 0;
              border: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
              background: rgba(56, 189, 248, 0.08);
            }
          }
        `}
      </style>

      <nav className="navbar">
        <Link to="/home" className="navbar-logo-wrap" onClick={closeMenu}>
          <div className="navbar-logo">Market</div>
          <span className="navbar-logo-dot" />
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          className={
            menuOpen ? "navbar-links navbar-links-open" : "navbar-links"
          }
        >
          <Link to="/home" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/all" className="navbar-link" onClick={closeMenu}>
            All Products
          </Link>

          <Link to="/add" className="navbar-link" onClick={closeMenu}>
            Add Product
          </Link>

          <Link
            to="/cart"
            className="navbar-link cart-link"
            onClick={closeMenu}
          >
            🛒 Cart
          </Link>

          <Link to="/my" className="navbar-link" onClick={closeMenu}>
            My Products
          </Link>

          <Link to="/profile" className="navbar-link" onClick={closeMenu}>
            Profile
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
