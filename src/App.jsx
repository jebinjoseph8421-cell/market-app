import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// =====================================================
// REVEAL
// =====================================================
function Reveal({
  children,
  style,
  className = "",
  as = "div",
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://market-backend-2-xcn9.onrender.com/api/products/all"
      );

      console.log("Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // =====================================================
  // VIEW PRODUCT DETAILS
  // =====================================================

  const viewDetails = (id) => {
    navigate(`/view/${id}`);
  };

  // =====================================================
  // PRODUCT CATEGORIES
  // =====================================================

  const categories = [
    "Electrical",
    "Electronics",
    "Books",
    "Tools",
    "Foods",
    "Utilities",
    "Fashion",
  ];

  const activeCategories = categories.filter((category) =>
    products.some(
      (product) =>
        product.category?.toLowerCase().trim() ===
        category.toLowerCase().trim()
    )
  );

  // =====================================================
  // HERO SLIDES
  // =====================================================

  const heroSlides = [
    {
      eyebrow: "ISSUE NO. 07 — GENERAL CATALOG",
      title: ["Discover.", "Shop.", "Enjoy."],
      text: "Explore our collection of quality products designed to bring convenience and value into your everyday life.",
      stamp: "FRESH STOCK",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    },
    {
      eyebrow: "ISSUE NO. 08 — JUST LANDED",
      title: ["New goods.", "Every", "week."],
      text: "New arrivals land in the catalog every week, from everyday tools to weekend finds.",
      stamp: "NEW ARRIVALS",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    },
    {
      eyebrow: "ISSUE NO. 09 — CUSTOMER FAVORITES",
      title: ["What people", "keep coming", "back for."],
      text: "Our most reordered items, picked by shoppers who came back for seconds.",
      stamp: "BEST SELLERS",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[currentSlide];

  // =====================================================
  // SCROLL PROGRESS
  // =====================================================

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      );
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // =====================================================
  // HERO TILT
  // =====================================================

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const px =
      (e.clientX - rect.left) / rect.width - 0.5;

    const py =
      (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: px * 14,
      y: py * -14,
    });
  };

  const handleHeroMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    });
  };

  return (
    <div style={styles.page}>

      {/* =====================================================
          FONTS
      ===================================================== */}

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
      />

      <style>{globalAnimations}</style>

      {/* =====================================================
          AMBIENT LIGHT
      ===================================================== */}

      <div style={styles.ambientOrb1}></div>
      <div style={styles.ambientOrb2}></div>

      {/* =====================================================
          SCROLL PROGRESS
      ===================================================== */}

      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${scrollProgress}%`,
          }}
        ></div>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        style={styles.hero}
        className="hero-glow"
      >
        <div style={styles.heroContent}>

          <p
            key={`eyebrow-${currentSlide}`}
            style={styles.welcome}
            className="hero-fade"
          >
            {activeSlide.eyebrow}
          </p>

          <h1
            key={`title-${currentSlide}`}
            style={styles.heroTitle}
            className="hero-fade"
          >
            {activeSlide.title.map((line, i) => (
              <React.Fragment key={i}>
                {line}

                {i < activeSlide.title.length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
          </h1>

          <span className="title-underline"></span>

          <p
            key={`text-${currentSlide}`}
            style={styles.heroText}
            className="hero-fade"
          >
            {activeSlide.text}
          </p>

          <div style={styles.heroButtons}>

            <Link
              to="/all"
              style={styles.shopButton}
              className="btn-shine"
            >
              Shop Now →
            </Link>

            <Link
              to="/add"
              style={styles.addButton}
              className="btn-outline"
            >
              Add Product
            </Link>

          </div>
        </div>

        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <div
          style={styles.heroImageWrap}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >

          <div
            style={{
              ...styles.heroFrame,
              transform: `
                perspective(900px)
                rotateY(${tilt.x}deg)
                rotateX(${tilt.y}deg)
              `,
            }}
          >

            {heroSlides.map((slide, i) => (
              <div
                key={i}
                style={{
                  ...styles.heroSlideImg,
                  backgroundImage: `url('${slide.image}')`,
                  opacity:
                    i === currentSlide ? 1 : 0,
                  transform:
                    i === currentSlide
                      ? "scale(1)"
                      : "scale(1.08)",
                }}
              ></div>
            ))}

            <div
              style={styles.heroSheen}
              className="hero-sheen"
            ></div>

          </div>

          <div
            style={styles.heroStamp}
            className="stamp-float"
          >
            <span
              key={`stamp-${currentSlide}`}
              style={styles.heroStampText}
            >
              {activeSlide.stamp}
            </span>
          </div>

          <div style={styles.heroDots}>

            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                style={{
                  ...styles.heroDot,
                  ...(i === currentSlide
                    ? styles.heroDotActive
                    : {}),
                }}
                className={
                  i === currentSlide
                    ? "dot-active"
                    : ""
                }
              ></button>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          OFFER
      ===================================================== */}

      <Reveal
        as="section"
        style={styles.offer}
      >

        <p style={styles.offerLabel}>
          LIMITED TIME OFFER
        </p>

        <h2 style={styles.offerTitle}>
          Get 20% Off Your First Order
        </h2>

        <p style={styles.offerText}>
          Start shopping today and enjoy exclusive savings
          on selected products.
        </p>

        <Link
          to="/all"
          style={styles.offerButton}
          className="btn-shine"
        >
          Explore Offers
        </Link>

      </Reveal>

      {/* =====================================================
          CATEGORY PRODUCTS
      ===================================================== */}

      <section style={styles.categorySection}>

        <Reveal style={styles.sectionHeader}>

          <p style={styles.sectionLabel}>
            SHOP BY CATEGORY
          </p>

          <h2 style={styles.sectionTitle}>
            Explore Our Collection
          </h2>

          <p style={styles.sectionSubtitle}>
            Find the perfect products from your favorite
            categories.
          </p>

        </Reveal>

        {/* =====================================================
            CATEGORY TABS
        ===================================================== */}

        {!loading &&
          activeCategories.length > 0 && (
            <div style={styles.tabStrip}>

              {activeCategories.map(
                (category, i) => (
                  <a
                    key={category}
                    href={`#cat-${category}`}
                    style={
                      i % 2 === 0
                        ? styles.tabDark
                        : styles.tabAccent
                    }
                    className="tab-link"
                  >
                    {category}
                  </a>
                )
              )}

            </div>
          )}

        {/* =====================================================
            LOADING / PRODUCTS
        ===================================================== */}

        {loading ? (
          <h2
            style={styles.message}
            className="pulse-text"
          >
            Loading products...
          </h2>
        ) : products.length === 0 ? (
          <div style={styles.emptyContainer}>

            <h2 style={styles.message}>
              No products available
            </h2>

            <Link
              to="/add"
              style={styles.addProductButton}
              className="btn-shine"
            >
              Add Your First Product
            </Link>

          </div>
        ) : (
          categories.map((category) => {

            const categoryProducts =
              products.filter(
                (product) =>
                  product.category
                    ?.toLowerCase()
                    .trim() ===
                  category.toLowerCase().trim()
              );

            if (categoryProducts.length === 0) {
              return null;
            }

            return (
              <div
                key={category}
                id={`cat-${category}`}
                style={styles.categoryContainer}
              >

                {/* CATEGORY HEADER */}

                <Reveal
                  style={styles.categoryHeader}
                >

                  <div>

                    <p
                      style={styles.categoryLabel}
                    >
                      CATEGORY
                    </p>

                    <h2
                      style={styles.categoryTitle}
                    >
                      {category}
                    </h2>

                  </div>

                  <Link
                    to="/all"
                    style={styles.viewAll}
                    className="view-all-link"
                  >
                    View All Products →
                  </Link>

                </Reveal>

                {/* =====================================================
                    PRODUCT GRID
                    IMPORTANT:
                    className="product-grid"
                    ===================================================== */}

                <div
                  style={styles.productGrid}
                  className="product-grid"
                >

                  {categoryProducts
                    .slice(0, 4)
                    .map((product, i) => (

                      <Reveal
                        key={product.id}
                        style={styles.card}
                        className="product-card mobile-product-card"
                        delay={i * 90}
                      >

                        {/* PRODUCT IMAGE */}

                        <div
                          style={styles.imageContainer}
                        >

                          <img
                            src={product.productImg}
                            alt={product.name}
                            className="product-image"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80";
                            }}
                          />

                        </div>

                        <div
                          style={styles.dashedLine}
                        ></div>

                        {/* PRODUCT DETAILS */}

                        <div style={styles.details}>

                          <h3
                            style={styles.productName}
                          >
                            {product.name}
                          </h3>

                          <p
                            style={styles.category}
                          >
                            {product.category}
                          </p>

                          <p
                            style={styles.price}
                          >
                            ₹{product.price}
                          </p>

                          <button
                            onClick={() =>
                              viewDetails(product.id)
                            }
                            style={styles.viewButton}
                            className="view-btn"
                          >
                            View Details
                          </button>

                        </div>

                      </Reveal>

                    ))}

                </div>

              </div>
            );
          })
        )}

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section style={styles.features}>

        {[
          {
            icon: "🚚",
            title: "Fast Delivery",
            text: "Quick and reliable delivery directly to your doorstep.",
          },
          {
            icon: "✓",
            title: "Premium Quality",
            text: "Carefully selected products with excellent quality.",
          },
          {
            icon: "↻",
            title: "Easy Returns",
            text: "Simple and hassle-free returns for your convenience.",
          },
          {
            icon: "♡",
            title: "Trusted Shopping",
            text: "A safe and comfortable shopping experience.",
          },
        ].map((f, i) => (

          <Reveal
            key={f.title}
            style={styles.feature}
            className="feature"
            delay={i * 100}
          >

            <div
              style={styles.featureIcon}
              className="feature-icon"
            >
              {f.icon}
            </div>

            <h3 style={styles.featureTitle}>
              {f.title}
            </h3>

            <p style={styles.featureText}>
              {f.text}
            </p>

          </Reveal>

        ))}

      </section>

      {/* =====================================================
          CUSTOMER REVIEWS
      ===================================================== */}

      <section style={styles.reviews}>

        <Reveal>

          <p style={styles.sectionLabel}>
            CUSTOMER REVIEWS
          </p>

          <h2 style={styles.sectionTitle}>
            What Our Customers Say
          </h2>

        </Reveal>

        <div style={styles.reviewGrid}>

          {[
            {
              text: '"Amazing quality and very fast delivery. I really loved my purchase!"',
              author: "— Alex",
            },
            {
              text: '"The website is easy to use and the products are excellent. Highly recommended!"',
              author: "— Sarah",
            },
            {
              text: '"Great products at reasonable prices. I will definitely shop here again."',
              author: "— Michael",
            },
          ].map((r, i) => (

            <Reveal
              key={r.author}
              style={styles.reviewCard}
              className="review-card"
              delay={i * 120}
            >

              <div
                style={styles.stars}
                className="stars"
              >
                ★★★★★
              </div>

              <p style={styles.reviewText}>
                {r.text}
              </p>

              <strong
                style={styles.reviewAuthor}
              >
                {r.author}
              </strong>

            </Reveal>

          ))}

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <Reveal
        as="section"
        style={styles.cta}
        className="cta-glow"
      >

        <h2 style={styles.ctaTitle}>
          Ready to Find Your Next Favorite?
        </h2>

        <p style={styles.ctaText}>
          Browse our complete collection and discover
          something special.
        </p>

        <Link
          to="/all"
          style={styles.ctaButton}
          className="btn-shine"
        >
          Start Shopping →
        </Link>

      </Reveal>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer style={styles.footer}>
        © 2026 Market. All Rights Reserved.
      </footer>

    </div>
  );
}

// =====================================================
// FONT TOKENS
// =====================================================

const DISPLAY = "'Space Grotesk', sans-serif";
const BODY = "'Plus Jakarta Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const ACCENT_GRADIENT =
  "linear-gradient(135deg, #06B6D4, #6366F1)";

// =====================================================
// GLOBAL ANIMATIONS
// =====================================================

const globalAnimations = `

* {
  scroll-behavior: smooth;
  box-sizing: border-box;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-fade {
  animation:
    heroFadeIn
    0.7s
    cubic-bezier(.16,1,.3,1);
}

@keyframes glowPan {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.hero-glow {
  background-image:
    radial-gradient(
      circle at 20% 20%,
      rgba(99,102,241,0.20),
      transparent 45%
    ),
    radial-gradient(
      circle at 85% 75%,
      rgba(6,182,212,0.22),
      transparent 50%
    );

  background-size: 200% 200%;

  animation:
    glowPan
    14s
    ease-in-out
    infinite;
}

@keyframes floatOrb {

  0% {
    transform:
      translate(0,0)
      scale(1);
  }

  100% {
    transform:
      translate(50px,-50px)
      scale(1.1);
  }

}

@keyframes sheenSweep {

  0% {
    transform:
      translateX(-120%)
      skewX(-15deg);
  }

  100% {
    transform:
      translateX(220%)
      skewX(-15deg);
  }

}

.hero-sheen {
  animation:
    sheenSweep
    6s
    ease-in-out
    infinite;
}

@keyframes floatY {

  0%,100% {
    transform:
      translateY(0px)
      rotate(-12deg);
  }

  50% {
    transform:
      translateY(-10px)
      rotate(-12deg);
  }

}

.stamp-float {
  animation:
    floatY
    3.2s
    ease-in-out
    infinite;
}

@keyframes underlineGrow {

  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }

}

.title-underline {

  display: block;

  width: 84px;

  height: 3px;

  background:
    ${ACCENT_GRADIENT};

  margin-bottom: 22px;

  transform-origin: left;

  animation:
    underlineGrow
    0.9s
    0.3s
    cubic-bezier(.16,1,.3,1)
    both;
}

.reveal {

  opacity: 0;

  transform:
    translateY(28px);

  transition:
    opacity
    0.7s
    cubic-bezier(.16,1,.3,1),

    transform
    0.7s
    cubic-bezier(.16,1,.3,1);
}

.reveal.is-visible {

  opacity: 1;

  transform:
    translateY(0);
}

.btn-shine,
.btn-outline {

  position: relative;

  overflow: hidden;

  transition:
    transform
    0.3s
    cubic-bezier(.16,1,.3,1),

    box-shadow
    0.3s
    ease;
}

.btn-shine::after {

  content: "";

  position: absolute;

  top: 0;
  left: -60%;

  width: 40%;
  height: 100%;

  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.45),
      transparent
    );

  transform:
    skewX(-20deg);

  transition:
    left
    0.6s
    ease;
}

.btn-shine:hover::after {
  left: 130%;
}

.btn-shine:hover,
.btn-outline:hover {

  transform:
    translateY(-3px)
    scale(1.03);

  box-shadow:
    0 12px 24px rgba(0,0,0,0.45),
    0 0 20px rgba(56,189,248,0.2);
}

.btn-outline:hover {

  background-color:
    rgba(255,255,255,0.06);

  border-color:
    #38BDF8;
}

.tab-link {

  transition:
    transform
    0.25s
    ease,

    box-shadow
    0.25s
    ease;
}

.tab-link:hover {

  transform:
    translateY(-5px);

  box-shadow:
    0 10px 16px rgba(0,0,0,0.4);
}

.view-all-link {

  position: relative;

  transition:
    color
    0.25s
    ease;
}

.view-all-link::after {

  content: "";

  position: absolute;

  left: 0;
  bottom: -3px;

  width: 0%;
  height: 2px;

  background:
    #38BDF8;

  transition:
    width
    0.3s
    ease;
}

.view-all-link:hover::after {
  width: 100%;
}

.product-card {

  transition:
    transform
    0.45s
    cubic-bezier(.16,1,.3,1),

    box-shadow
    0.45s
    cubic-bezier(.16,1,.3,1),

    border-color
    0.45s
    ease;
}

.product-card:hover {

  transform:
    translateY(-12px)
    rotate(-0.6deg);

  border-color:
    #38BDF8;

  box-shadow:
    0 26px 40px rgba(0,0,0,0.55),
    0 0 24px rgba(56,189,248,0.15);
}

.product-image {

  transition:
    transform
    0.6s
    cubic-bezier(.16,1,.3,1);
}

.product-card:hover .product-image {

  transform:
    scale(1.1)
    rotate(1deg);
}

.view-btn {

  position: relative;

  overflow: hidden;

  transition:
    filter
    0.3s
    ease,

    transform
    0.3s
    ease;
}

.view-btn::after {

  content: "";

  position: absolute;

  top: 0;
  left: -60%;

  width: 40%;
  height: 100%;

  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.4),
      transparent
    );

  transform:
    skewX(-20deg);

  transition:
    left
    0.5s
    ease;
}

.view-btn:hover::after {
  left: 130%;
}

.view-btn:hover {

  filter:
    brightness(1.12);

  transform:
    translateY(-2px);
}

.dot-active {
  animation:
    dotPulse
    1.6s
    ease-in-out
    infinite;
}

@keyframes dotPulse {

  0%,100% {
    box-shadow:
      0 0 0 0
      rgba(56,189,248,0.55);
  }

  50% {
    box-shadow:
      0 0 0 6px
      rgba(56,189,248,0);
  }

}

@keyframes pulseText {

  0%,100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }

}

.pulse-text {
  animation:
    pulseText
    1.4s
    ease-in-out
    infinite;
}

.feature {
  transition:
    transform
    0.3s
    ease;
}

.feature:hover {
  transform:
    translateY(-6px);
}

.feature-icon {

  transition:
    transform
    0.4s
    cubic-bezier(.16,1,.3,1),

    box-shadow
    0.4s
    ease,

    background-color
    0.4s
    ease;
}

.feature:hover .feature-icon {

  transform:
    scale(1.15)
    rotate(10deg);

  box-shadow:
    0 0 0 10px
    rgba(56,189,248,0.14);

  background-color:
    rgba(255,255,255,0.08);
}

.review-card {

  transition:
    transform
    0.4s
    cubic-bezier(.16,1,.3,1),

    box-shadow
    0.4s
    ease,

    border-color
    0.4s
    ease;
}

.review-card:hover {

  transform:
    translateY(-8px)
    scale(1.015);

  border-color:
    #38BDF8;

  box-shadow:
    0 22px 32px rgba(0,0,0,0.45),
    0 0 20px rgba(56,189,248,0.12);
}

.stars {

  display: inline-block;

  transition:
    transform
    0.4s
    ease;
}

.review-card:hover .stars {
  animation:
    starWiggle
    0.5s
    ease;
}

@keyframes starWiggle {

  0%,100% {
    transform:
      scale(1)
      rotate(0deg);
  }

  30% {
    transform:
      scale(1.15)
      rotate(-4deg);
  }

  60% {
    transform:
      scale(1.15)
      rotate(4deg);
  }

}

@keyframes ctaGlow {

  0%,100% {
    box-shadow:
      inset
      0 0 80px
      rgba(56,189,248,0.10);
  }

  50% {
    box-shadow:
      inset
      0 0 140px
      rgba(99,102,241,0.20);
  }

}

.cta-glow {
  animation:
    ctaGlow
    4s
    ease-in-out
    infinite;
}


/* =====================================================
   IMPORTANT MOBILE PRODUCT GRID
   EXACTLY 4 CARDS IN ONE ROW
   ===================================================== */

@media (max-width: 600px) {

  .product-grid {

    display: grid !important;

    grid-template-columns:
      repeat(4, minmax(0, 1fr)) !important;

    gap: 6px !important;

    width: 100% !important;

    max-width: 100% !important;

    margin: 0 !important;

    padding: 0 !important;

    justify-content: stretch !important;

    align-items: stretch !important;
  }

  .mobile-product-card {

    width: 100% !important;

    min-width: 0 !important;

    max-width: 100% !important;

    height: 275px !important;

    border-radius: 7px !important;

    overflow: hidden !important;
  }

  .mobile-product-card .imageContainer {

    width: 100% !important;

    height: 100px !important;

    flex-shrink: 0 !important;
  }

  .mobile-product-card .product-image {

    width: 100% !important;

    height: 100% !important;

    object-fit: contain !important;
  }

  .mobile-product-card .details {

    padding:
      7px 5px 6px !important;

    min-width: 0 !important;
  }

  .mobile-product-card .productName {

    font-size: 10px !important;

    line-height: 12px !important;

    margin:
      0 0 4px !important;

    min-height: 24px !important;
  }

  .mobile-product-card h3 {

    font-size: 10px !important;

    line-height: 12px !important;

    margin:
      0 0 4px !important;

    min-height: 24px !important;

    display:
      -webkit-box !important;

    -webkit-line-clamp:
      2 !important;

    -webkit-box-orient:
      vertical !important;

    overflow:
      hidden !important;

    word-break:
      break-word !important;
  }

  .mobile-product-card .category {

    font-size: 7px !important;

    line-height: 9px !important;

    margin:
      0 0 5px !important;

    white-space:
      nowrap !important;

    overflow:
      hidden !important;

    text-overflow:
      ellipsis !important;
  }

  .mobile-product-card .price {

    font-size: 12px !important;

    line-height: 14px !important;

    margin:
      0 0 6px !important;
  }

  .mobile-product-card .view-btn {

    width: 100% !important;

    padding:
      6px 1px !important;

    font-size: 7px !important;

    line-height: 10px !important;

    border-radius: 4px !important;

    white-space:
      nowrap !important;
  }

  .mobile-product-card .dashedLine {

    margin:
      0 5px !important;
  }

  .mobile-product-card:hover {

    transform:
      translateY(-3px) !important;
  }

  .mobile-product-card:hover .product-image {

    transform:
      scale(1.04) !important;
  }
}


/* =====================================================
   LARGER MOBILE PHONES
   ===================================================== */

@media (min-width: 390px) and (max-width: 600px) {

  .product-grid {

    gap: 7px !important;
  }

  .mobile-product-card {

    height: 290px !important;
  }

  .mobile-product-card .imageContainer {

    height: 110px !important;
  }

  .mobile-product-card .details {

    padding:
      8px 6px 7px !important;
  }

  .mobile-product-card h3 {

    font-size: 11px !important;

    line-height: 13px !important;
  }

  .mobile-product-card .category {

    font-size: 8px !important;
  }

  .mobile-product-card .price {

    font-size: 13px !important;
  }

  .mobile-product-card .view-btn {

    font-size: 8px !important;

    padding:
      7px 2px !important;
  }
}


/* =====================================================
   REDUCED MOTION
   ===================================================== */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {

    animation-duration:
      0.001ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      0.001ms !important;

    scroll-behavior:
      auto !important;
  }

  .reveal {

    opacity: 1;

    transform: none;
  }
}

`;

// =====================================================
// STYLES
// =====================================================

const styles = {

  // =====================================================
  // PAGE
  // =====================================================

  page: {

    minHeight: "100vh",

    width: "100%",

    backgroundColor: "#080C14",

    color: "#F8FAFC",

    fontFamily: BODY,

    boxSizing: "border-box",

    overflowX: "hidden",

    position: "relative",
  },

  // =====================================================
  // AMBIENT ORBS
  // =====================================================

  ambientOrb1: {

    position: "fixed",

    top: "-10%",

    left: "-10%",

    width: "650px",

    height: "650px",

    borderRadius: "50%",

    background:
      "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)",

    filter: "blur(80px)",

    animation:
      "floatOrb 20s ease-in-out infinite alternate",

    pointerEvents: "none",

    zIndex: 0,
  },

  ambientOrb2: {

    position: "fixed",

    bottom: "-10%",

    right: "-10%",

    width: "700px",

    height: "700px",

    borderRadius: "50%",

    background:
      "radial-gradient(circle, rgba(6, 182, 212, 0.13) 0%, transparent 70%)",

    filter: "blur(90px)",

    animation:
      "floatOrb 24s ease-in-out infinite alternate-reverse",

    pointerEvents: "none",

    zIndex: 0,
  },

  // =====================================================
  // PROGRESS
  // =====================================================

  progressTrack: {

    position: "fixed",

    top: 0,

    left: 0,

    width: "100%",

    height: "3px",

    backgroundColor: "transparent",

    zIndex: 999,
  },

  progressFill: {

    height: "100%",

    background:
      ACCENT_GRADIENT,

    transition:
      "width 0.1s linear",

    boxShadow:
      "0 0 8px rgba(56,189,248,0.7)",
  },

  // =====================================================
  // HERO
  // =====================================================

  hero: {

    minHeight: "80vh",

    backgroundColor: "#0B1120",

    color: "#F8FAFC",

    display: "flex",

    alignItems: "center",

    justifyContent: "space-between",

    padding:
      "clamp(40px, 7vw, 80px) clamp(20px, 8vw, 120px)",

    gap:
      "clamp(40px, 6vw, 80px)",

    flexWrap: "wrap",

    boxSizing: "border-box",

    position: "relative",

    overflow: "hidden",

    zIndex: 1,
  },

  heroContent: {

    flex:
      "1 1 450px",

    maxWidth: "600px",

    minWidth: "0",

    position: "relative",

    zIndex: 1,
  },

  welcome: {

    fontFamily: MONO,

    letterSpacing:
      "clamp(1px, 0.3vw, 2px)",

    fontSize:
      "clamp(11px, 1.5vw, 13px)",

    color: "#38BDF8",

    marginBottom: "22px",
  },

  heroTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontSize:
      "clamp(46px, 7.5vw, 68px)",

    lineHeight: "1.05",

    margin: "0 0 25px",

    fontWeight: "700",

    letterSpacing: "-0.5px",

    backgroundImage:
      "linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent",

    backgroundClip: "text",
  },

  heroText: {

    fontSize:
      "clamp(15px, 2vw, 18px)",

    lineHeight: "1.7",

    color: "#94A3B8",

    marginBottom: "35px",

    maxWidth: "460px",
  },

  heroButtons: {

    display: "flex",

    gap: "15px",

    flexWrap: "wrap",
  },

  shopButton: {

    display: "inline-block",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",

    padding: "15px 30px",

    textDecoration: "none",

    borderRadius: "8px",

    fontFamily: MONO,

    fontWeight: "600",

    fontSize: "14px",

    letterSpacing: "0.5px",

    textAlign: "center",

    boxShadow:
      "0 4px 15px rgba(6, 182, 212, 0.25)",
  },

  addButton: {

    display: "inline-block",

    border:
      "1px solid rgba(255,255,255,0.15)",

    color: "#F8FAFC",

    padding: "15px 30px",

    textDecoration: "none",

    borderRadius: "8px",

    fontFamily: MONO,

    fontWeight: "600",

    fontSize: "14px",

    letterSpacing: "0.5px",

    textAlign: "center",
  },

  heroImageWrap: {

    position: "relative",

    flex:
      "1 1 350px",

    width: "100%",

    maxWidth: "420px",

    zIndex: 1,
  },

  heroFrame: {

    position: "relative",

    width: "100%",

    height:
      "clamp(300px, 50vw, 500px)",

    borderRadius: "12px",

    overflow: "hidden",

    boxShadow:
      "14px 14px 0px rgba(99,102,241,0.35)",

    marginRight: "14px",

    boxSizing: "border-box",

    transition:
      "transform 0.2s ease-out",

    border:
      "1px solid rgba(255,255,255,0.1)",
  },

  heroSlideImg: {

    position: "absolute",

    inset: 0,

    width: "100%",

    height: "100%",

    backgroundSize: "cover",

    backgroundPosition: "center",

    transition:
      "opacity 1s ease, transform 1.2s ease",
  },

  heroSheen: {

    position: "absolute",

    inset: 0,

    pointerEvents: "none",

    background:
      "linear-gradient(120deg, transparent, rgba(255,255,255,0.16), transparent)",

    width: "40%",
  },

  heroDots: {

    display: "flex",

    gap: "8px",

    justifyContent: "center",

    marginTop: "16px",
  },

  heroDot: {

    width: "8px",

    height: "8px",

    borderRadius: "50%",

    backgroundColor:
      "rgba(255,255,255,0.2)",

    border: "none",

    padding: 0,

    cursor: "pointer",

    transition:
      "width 0.25s ease, background-color 0.25s ease",
  },

  heroDotActive: {

    width: "22px",

    borderRadius: "5px",

    backgroundColor: "#38BDF8",
  },

  heroStamp: {

    position: "absolute",

    top: "-18px",

    left: "-18px",

    width: "84px",

    height: "84px",

    borderRadius: "50%",

    border:
      "2px dashed #38BDF8",

    backgroundColor:
      "rgba(15,23,42,0.9)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    textAlign: "center",

    transform: "rotate(-12deg)",

    zIndex: 2,

    backdropFilter: "blur(10px)",
  },

  heroStampText: {

    fontFamily: MONO,

    fontSize: "10px",

    fontWeight: "600",

    color: "#38BDF8",

    letterSpacing: "0.5px",

    lineHeight: "1.3",

    padding: "0 8px",
  },

  // =====================================================
  // OFFER
  // =====================================================

  offer: {

    padding:
      "clamp(50px, 8vw, 80px) clamp(20px, 8vw, 100px)",

    backgroundColor:
      "rgba(15, 23, 42, 0.75)",

    backdropFilter: "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",

    borderTop:
      "1px solid rgba(255,255,255,0.1)",

    borderBottom:
      "1px solid rgba(255,255,255,0.1)",

    textAlign: "center",

    boxSizing: "border-box",

    position: "relative",

    zIndex: 1,
  },

  offerLabel: {

    fontFamily: MONO,

    letterSpacing: "2px",

    fontSize: "12px",

    fontWeight: "600",

    color: "#34D399",
  },

  offerTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontSize:
      "clamp(28px, 5vw, 40px)",

    margin: "15px 0",

    fontWeight: "600",

    color: "#F8FAFC",
  },

  offerText: {

    color: "#94A3B8",

    fontSize:
      "clamp(15px, 2vw, 17px)",

    marginBottom: "30px",

    lineHeight: "1.6",
  },

  offerButton: {

    display: "inline-block",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",

    padding: "14px 35px",

    borderRadius: "8px",

    textDecoration: "none",

    fontFamily: MONO,

    fontWeight: "600",

    fontSize: "14px",

    boxShadow:
      "0 4px 15px rgba(6, 182, 212, 0.25)",
  },

  // =====================================================
  // CATEGORY SECTION
  // =====================================================

  categorySection: {

    padding:
      "clamp(50px, 8vw, 80px) clamp(20px, 8vw, 100px)",

    backgroundColor: "#080C14",

    boxSizing: "border-box",

    position: "relative",

    zIndex: 1,
  },

  sectionHeader: {

    textAlign: "center",

    marginBottom:
      "clamp(30px, 5vw, 45px)",
  },

  sectionLabel: {

    fontFamily: MONO,

    letterSpacing: "2px",

    fontSize: "12px",

    fontWeight: "600",

    color: "#38BDF8",
  },

  sectionTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontSize:
      "clamp(28px, 5vw, 40px)",

    margin: "15px 0",

    fontWeight: "600",

    color: "#F8FAFC",
  },

  sectionSubtitle: {

    color: "#94A3B8",

    fontSize:
      "clamp(15px, 2vw, 17px)",

    lineHeight: "1.6",
  },

  // =====================================================
  // CATEGORY TABS
  // =====================================================

  tabStrip: {

    display: "flex",

    flexWrap: "wrap",

    justifyContent: "center",

    gap: "8px",

    maxWidth: "1200px",

    margin:
      "0 auto clamp(35px, 5vw, 55px)",
  },

  tabDark: {

    fontFamily: MONO,

    fontSize: "12px",

    fontWeight: "600",

    letterSpacing: "0.5px",

    padding: "9px 18px",

    borderRadius:
      "8px 8px 0 0",

    textDecoration: "none",

    textTransform: "uppercase",

    display: "inline-block",

    backgroundColor:
      "rgba(15, 23, 42, 0.75)",

    color: "#F8FAFC",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderBottom: "none",
  },

  tabAccent: {

    fontFamily: MONO,

    fontSize: "12px",

    fontWeight: "600",

    letterSpacing: "0.5px",

    padding: "9px 18px",

    borderRadius:
      "8px 8px 0 0",

    textDecoration: "none",

    textTransform: "uppercase",

    display: "inline-block",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",
  },

  // =====================================================
  // CATEGORY
  // =====================================================

  categoryContainer: {

    width: "100%",

    maxWidth: "1200px",

    margin: "0 auto 70px",

    scrollMarginTop: "20px",
  },

  categoryHeader: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "20px",

    marginBottom: "25px",

    borderBottom:
      "2px solid rgba(255,255,255,0.1)",

    paddingBottom: "15px",

    flexWrap: "wrap",
  },

  categoryLabel: {

    fontFamily: MONO,

    margin: "0 0 5px",

    fontSize: "11px",

    letterSpacing: "2px",

    color: "#64748B",

    fontWeight: "600",
  },

  categoryTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontSize:
      "clamp(22px, 4vw, 28px)",

    margin: "0",

    fontWeight: "600",

    color: "#F8FAFC",
  },

  viewAll: {

    fontFamily: MONO,

    fontSize: "13px",

    color: "#38BDF8",

    textDecoration: "none",

    fontWeight: "600",

    whiteSpace: "nowrap",

    display: "inline-block",
  },

  // =====================================================
  // PRODUCT GRID
  // =====================================================

  productGrid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fill, minmax(250px, 250px))",

    gap: "30px",

    maxWidth: "1200px",

    margin: "0 auto",

    justifyContent: "start",

    alignItems: "start",
  },

  // =====================================================
  // PRODUCT CARD
  // =====================================================

  card: {

    backgroundColor:
      "rgba(15, 23, 42, 0.75)",

    backdropFilter:
      "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",

    borderRadius: "12px",

    overflow: "hidden",

    border:
      "1px solid rgba(255,255,255,0.1)",

    boxShadow:
      "0 14px 30px rgba(0, 0, 0, 0.4)",

    display: "flex",

    flexDirection: "column",

    width: "250px",

    height: "400px",

    boxSizing: "border-box",
  },

  // =====================================================
  // IMAGE
  // =====================================================

  imageContainer: {

    width: "100%",

    height: "200px",

    backgroundColor:
      "rgb(250, 251, 255)",

    overflow: "hidden",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    flexShrink: 0,

    borderRadius:
      "12px 12px 0 0",
  },

  image: {

    width: "100%",

    height: "100%",

    objectFit: "contain",

    display: "block",
  },

  dashedLine: {

    borderTop:
      "1px dashed rgba(255,255,255,0.1)",

    margin: "0 16px",
  },

  // =====================================================
  // DETAILS
  // =====================================================

  details: {

    padding:
      "16px 20px 20px",

    display: "flex",

    flexDirection: "column",

    flex: "1",

    minWidth: 0,
  },

  productName: {

    margin:
      "0 0 8px",

    fontSize: "18px",

    lineHeight: "22px",

    minHeight: "44px",

    fontWeight: "600",

    color: "#F8FAFC",

    wordBreak: "break-word",

    overflow: "hidden",

    display:
      "-webkit-box",

    WebkitLineClamp: 2,

    WebkitBoxOrient:
      "vertical",
  },

  category: {

    fontFamily: MONO,

    margin:
      "0 0 12px",

    fontSize: "12px",

    letterSpacing: "0.5px",

    textTransform: "uppercase",

    color: "#34D399",

    overflow: "hidden",

    textOverflow: "ellipsis",

    whiteSpace: "nowrap",
  },

  price: {

    fontFamily: MONO,

    margin:
      "0 0 18px",

    fontSize: "22px",

    fontWeight: "600",

    color: "#38BDF8",
  },

  // =====================================================
  // BUTTON
  // =====================================================

  viewButton: {

    width: "100%",

    padding: "12px",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",

    border: "none",

    borderRadius: "6px",

    fontFamily: MONO,

    fontSize: "13px",

    fontWeight: "600",

    letterSpacing: "0.3px",

    cursor: "pointer",

    marginTop: "auto",

    boxShadow:
      "0 4px 15px rgba(6, 182, 212, 0.25)",
  },

  // =====================================================
  // EMPTY
  // =====================================================

  emptyContainer: {

    textAlign: "center",

    padding: "50px 20px",
  },

  message: {

    textAlign: "center",

    color: "#94A3B8",

    margin:
      "0 0 25px",

    fontFamily: BODY,
  },

  addProductButton: {

    display: "inline-block",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",

    padding: "14px 25px",

    borderRadius: "8px",

    textDecoration: "none",

    fontFamily: MONO,

    fontWeight: "600",

    boxShadow:
      "0 4px 15px rgba(6, 182, 212, 0.25)",
  },

  // =====================================================
  // FEATURES
  // =====================================================

  features: {

    padding:
      "clamp(50px, 8vw, 80px) clamp(20px, 8vw, 100px)",

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",

    gap: "30px",

    textAlign: "center",

    backgroundColor:
      "rgba(15, 23, 42, 0.75)",

    backdropFilter:
      "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",

    borderTop:
      "1px solid rgba(255,255,255,0.1)",

    boxSizing: "border-box",

    position: "relative",

    zIndex: 1,
  },

  feature: {

    width: "100%",
  },

  featureIcon: {

    fontSize: "30px",

    width: "62px",

    height: "62px",

    lineHeight: "62px",

    margin:
      "0 auto 14px",

    borderRadius: "50%",

    border:
      "1px dashed #38BDF8",

    backgroundColor:
      "rgba(255,255,255,0.05)",
  },

  featureTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontWeight: "600",

    letterSpacing: "0.3px",

    margin:
      "0 0 8px",

    color: "#F8FAFC",
  },

  featureText: {

    color: "#94A3B8",

    fontSize: "14px",

    lineHeight: "1.6",

    margin: 0,
  },

  // =====================================================
  // REVIEWS
  // =====================================================

  reviews: {

    padding:
      "clamp(50px, 8vw, 80px) clamp(20px, 8vw, 100px)",

    backgroundColor: "#080C14",

    textAlign: "center",

    boxSizing: "border-box",

    position: "relative",

    zIndex: 1,
  },

  reviewGrid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 250px), 350px))",

    gap: "25px",

    justifyContent: "center",

    width: "100%",

    marginTop: "10px",
  },

  reviewCard: {

    width: "100%",

    backgroundColor:
      "rgba(15, 23, 42, 0.75)",

    backdropFilter:
      "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",

    padding: "30px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    lineHeight: "1.7",

    boxSizing: "border-box",

    textAlign: "left",
  },

  stars: {

    color: "#38BDF8",

    fontSize: "18px",

    marginBottom: "10px",
  },

  reviewText: {

    fontSize: "15px",

    color: "#F8FAFC",

    margin:
      "0 0 14px",
  },

  reviewAuthor: {

    fontFamily: MONO,

    fontSize: "13px",

    color: "#94A3B8",
  },

  // =====================================================
  // CTA
  // =====================================================

  cta: {

    backgroundColor: "#0B1120",

    color: "#F8FAFC",

    textAlign: "center",

    padding:
      "clamp(50px, 8vw, 80px) 20px",

    boxSizing: "border-box",

    position: "relative",

    zIndex: 1,
  },

  ctaTitle: {

    fontFamily: DISPLAY,

    textTransform: "uppercase",

    fontSize:
      "clamp(28px, 5vw, 45px)",

    margin:
      "0 0 20px",

    fontWeight: "600",
  },

  ctaText: {

    color: "#94A3B8",

    fontSize:
      "clamp(15px, 2vw, 18px)",

    marginBottom: "30px",

    lineHeight: "1.6",
  },

  ctaButton: {

    display: "inline-block",

    background:
      ACCENT_GRADIENT,

    color: "#FFFFFF",

    padding: "15px 35px",

    borderRadius: "8px",

    textDecoration: "none",

    fontFamily: MONO,

    fontWeight: "600",

    fontSize: "14px",

    boxShadow:
      "0 4px 15px rgba(6, 182, 212, 0.25)",
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {

    backgroundColor: "#080C14",

    color: "#64748B",

    textAlign: "center",

    padding: "25px 20px",

    fontFamily: MONO,

    fontSize: "13px",

    boxSizing: "border-box",

    borderTop:
      "1px solid rgba(255,255,255,0.1)",

    position: "relative",

    zIndex: 1,
  },
};

export default App;