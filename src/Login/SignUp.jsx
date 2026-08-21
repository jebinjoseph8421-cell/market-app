import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "https://market-backend-2-xcn9.onrender.com/api/products/signup",
        user,
      );

      setMessage(response.data.message || "Account created successfully!");

      setUser({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.response?.data ||
          "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* GOOGLE FONTS — same pairing as Sign In */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap"
      />

      <style>
        {`

        * {
          box-sizing: border-box;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ==========================================
           MAIN PAGE
        ========================================== */

        .signup-page {
          min-height: 100vh;
          background-color: #080C14;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
          background-size: 28px 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px 20px;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          color: #F8FAFC;
        }

        /* ==========================================
           AMBIENT ORBS
        ========================================== */

        .ambient-orb-1 {
          position: absolute;
          top: -22%;
          left: -12%;
          width: 620px;
          height: 620px;
          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.20) 0%,
            rgba(99, 102, 241, 0.05) 50%,
            transparent 72%
          );

          filter: blur(85px);

          animation: floatOrb 22s ease-in-out infinite alternate;

          pointer-events: none;
        }

        .ambient-orb-2 {
          position: absolute;
          bottom: -22%;
          right: -12%;
          width: 660px;
          height: 660px;
          border-radius: 50%;

          background: radial-gradient(
            circle,
            rgba(6, 182, 212, 0.20) 0%,
            rgba(6, 182, 212, 0.05) 50%,
            transparent 72%
          );

          filter: blur(90px);

          animation: floatOrb 26s ease-in-out infinite alternate-reverse;

          pointer-events: none;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(46px, -46px) scale(1.12); }
        }

        /* ==========================================
           CARD REVEAL
        ========================================== */

        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.965);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes haloSpin {
          to { transform: rotate(360deg); }
        }

        .signup-card-wrap {
          position: relative;
          width: 100%;
          max-width: 440px;

          border-radius: 22px;
          padding: 1px;

          box-shadow:
            0 35px 80px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.04);

          animation: cardReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;

          z-index: 1;

          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease;
        }

        .signup-card-wrap::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          padding: 2px;

          background: conic-gradient(
            from 0deg,
            rgba(99, 102, 241, 0.9),
            rgba(6, 182, 212, 0.7),
            rgba(99, 102, 241, 0.2),
            rgba(6, 182, 212, 0.7),
            rgba(99, 102, 241, 0.9)
          );

          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;

          animation: haloSpin 9s linear infinite;
          opacity: 0.55;
          pointer-events: none;
        }

        .signup-card-wrap:hover {
          transform: translateY(-4px);

          box-shadow:
            0 45px 90px rgba(0, 0, 0, 0.7),
            0 0 60px rgba(99, 102, 241, 0.10);
        }

        .signup-card-wrap:hover::before {
          opacity: 0.85;
        }

        /* ==========================================
           SIGN UP CARD
        ========================================== */

        .signup-card {
          width: 100%;

          background: rgba(15, 23, 42, 0.78);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          padding: 46px 40px 38px;

          border-radius: 21px;

          position: relative;
        }

        /* ==========================================
           STAGGERED ENTRANCE
        ========================================== */

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stagger {
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .stagger-1 { animation-delay: 0.15s; }
        .stagger-2 { animation-delay: 0.24s; }
        .stagger-3 { animation-delay: 0.33s; }
        .stagger-4 { animation-delay: 0.42s; }
        .stagger-5 { animation-delay: 0.51s; }
        .stagger-6 { animation-delay: 0.60s; }
        .stagger-7 { animation-delay: 0.69s; }

        /* ==========================================
           BADGE
        ========================================== */

        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.55); }
          50% { box-shadow: 0 0 0 5px rgba(56, 189, 248, 0); }
        }

        .signup-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;

          color: #38BDF8;

          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);

          padding: 5px 12px;
          border-radius: 20px;

          margin-bottom: 22px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #38BDF8;
          animation: pulseDot 2.4s ease-in-out infinite;
        }

        /* ==========================================
           LOGO / HEADER
        ========================================== */

        .signup-logo {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          font-style: normal;
          letter-spacing: -0.3px;
          line-height: 1.15;

          background: linear-gradient(135deg, #FFFFFF 30%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          margin-bottom: 8px;
        }

        .signup-subtitle {
          color: #94A3B8;
          margin: 0 0 30px;
          font-size: 14px;
          line-height: 1.6;
        }

        /* ==========================================
           INPUT GROUP
        ========================================== */

        .signup-input-group {
          margin-bottom: 22px;
        }

        .signup-label {
          display: block;

          font-family: 'JetBrains Mono', monospace;
          color: #CBD5E1;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;

          margin-bottom: 8px;

          transition: color 0.25s ease;
        }

        .signup-input-group:focus-within .signup-label {
          color: #38BDF8;
        }

        /* ==========================================
           INPUT WRAPPER (used for password row)
        ========================================== */

        .password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-wrapper::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 0;
          height: 2px;
          border-radius: 2px;

          background: linear-gradient(90deg, #6366F1, #06B6D4);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .password-wrapper:focus-within::after {
          transform: scaleX(1);
        }

        /* plain inputs (name / email) get the same underline sweep */
        .signup-input-group > .signup-input {
          position: relative;
        }

        .signup-input-group:not(:has(.password-wrapper)) {
          position: relative;
        }

        .signup-input-group:not(:has(.password-wrapper))::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 0;
          height: 2px;
          border-radius: 2px;

          background: linear-gradient(90deg, #6366F1, #06B6D4);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .signup-input-group:not(:has(.password-wrapper)):focus-within::after {
          transform: scaleX(1);
        }

        /* ==========================================
           INPUT
        ========================================== */

        .signup-input {
          width: 100%;

          padding: 14px 44px 14px 16px;

          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;

          font-size: 14px;
          font-family: 'Inter', sans-serif;

          outline: none;

          background-color: rgba(2, 6, 23, 0.6);
          color: #F8FAFC;

          transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }

        .signup-input::placeholder {
          color: #64748B;
        }

        .signup-input:hover {
          border-color: rgba(255, 255, 255, 0.16);
        }

        .signup-input:focus {
          border-color: rgba(99, 102, 241, 0.55);
          background-color: rgba(2, 6, 23, 0.85);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
        }

        /* ==========================================
           PASSWORD TOGGLE
        ========================================== */

        .toggle-password-btn {
          position: absolute;
          right: 12px;

          background: none;
          border: none;

          font-size: 16px;
          line-height: 1;

          cursor: pointer;

          padding: 6px;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .toggle-password-btn:hover {
          transform: scale(1.08);
        }

        /* ==========================================
           SIGN UP BUTTON
        ========================================== */

        .signup-button {
          position: relative;
          width: 100%;

          padding: 15px;

          background: linear-gradient(135deg, #06B6D4, #6366F1);

          color: #FFFFFF;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 15.5px;
          letter-spacing: 0.2px;

          border: none;
          border-radius: 10px;

          cursor: pointer;
          margin-top: 8px;

          overflow: hidden;

          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.22);
        }

        .signup-button::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;

          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.45),
            transparent
          );

          transform: skewX(-20deg);
          transition: left 0.65s ease;
        }

        .signup-button:hover:not(:disabled)::after {
          left: 140%;
        }

        .signup-button:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.012);
          box-shadow: 0 16px 32px rgba(99, 102, 241, 0.35);
          filter: brightness(1.06);
        }

        .signup-button:active:not(:disabled) {
          transform: translateY(0) scale(0.99);
        }

        .signup-button:disabled {
          background: #334155;
          color: #94A3B8;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* ==========================================
           LOADING SPINNER
        ========================================== */

        .button-spinner {
          width: 17px;
          height: 17px;

          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;

          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ==========================================
           MESSAGE (success/error, shared style)
        ========================================== */

        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }

        @keyframes messageReveal {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .signup-message {
          text-align: center;
          margin-top: 22px;

          padding: 12px 14px;

          background: rgba(56, 189, 248, 0.10);
          border: 1px solid rgba(56, 189, 248, 0.28);
          border-radius: 8px;

          color: #7DD3FC;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 12px;

          animation: messageReveal 0.35s ease forwards;
        }

        .signup-message.is-error {
          background: rgba(239, 68, 68, 0.10);
          border: 1px solid rgba(239, 68, 68, 0.28);
          color: #FCA5A5;

          animation: messageReveal 0.35s ease forwards, shakeError 0.4s ease 0.35s;
        }

        /* ==========================================
           SIGN IN REDIRECT
        ========================================== */

        .signup-bottom-text {
          text-align: center;
          margin-top: 28px;
          padding-top: 22px;

          border-top: 1px solid rgba(255, 255, 255, 0.08);

          color: #94A3B8;
          font-size: 14px;
        }

        .signup-link {
          color: #38BDF8;
          font-weight: 600;
          text-decoration: none;

          position: relative;
          transition: color 0.25s ease;
        }

        .signup-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;

          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .signup-link:hover {
          color: #67E8F9;
        }

        .signup-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* ==========================================
           RESPONSIVE
        ========================================== */

        @media (max-width: 500px) {

          .signup-page {
            padding: 20px 16px;
          }

          .signup-card {
            padding: 36px 22px 28px;
          }

          .signup-logo {
            font-size: 27px;
          }

        }

        `}
      </style>

      <div className="signup-page">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />

        <div className="signup-card-wrap">
          <div className="signup-card">
            <div className="signup-badge stagger stagger-1">
              <span className="badge-dot" />
              CREATE ACCOUNT
            </div>

            <h1 className="signup-logo stagger stagger-2">Join Us</h1>

            <p className="signup-subtitle stagger stagger-3">
              Create an account to manage your catalog and products
            </p>

            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="signup-input-group stagger stagger-4">
                <label className="signup-label">Full Name</label>

                <input
                  className="signup-input"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={user.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="signup-input-group stagger stagger-5">
                <label className="signup-label">Email Address</label>

                <input
                  className="signup-input"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="signup-input-group stagger stagger-6">
                <label className="signup-label">Password</label>

                <div className="password-wrapper">
                  <input
                    className="signup-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={user.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="stagger stagger-7">
                <button
                  type="submit"
                  className="signup-button"
                  disabled={loading}
                >
                  {loading && <span className="button-spinner" />}

                  {loading ? "Creating Account..." : "Create Account →"}
                </button>
              </div>
            </form>

            {message && (
              <div
                className={`signup-message ${
                  message.toLowerCase().includes("success") ||
                  message.toLowerCase().includes("created")
                    ? ""
                    : "is-error"
                }`}
              >
                ✨ {message}
              </div>
            )}

            <p className="signup-bottom-text">
              Already have an account?{" "}
              <Link to="/" className="signup-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
