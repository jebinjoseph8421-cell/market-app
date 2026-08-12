import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function SignIn() {
  const navigate = useNavigate();

  // ==========================================
  // LOGIN FORM DATA
  // ==========================================
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // LOGIN MESSAGE
  // ==========================================
  const [message, setMessage] = useState("");

  // ==========================================
  // LOADING STATE
  // ==========================================
  const [loading, setLoading] = useState(false);

  // ==========================================
  // PASSWORD VISIBILITY
  // ==========================================
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    // Clear previous error
    setMessage("");
  };

  // ==========================================
  // NORMAL EMAIL + PASSWORD LOGIN
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      // SEND LOGIN REQUEST TO SPRING BOOT
      const response = await axios.post(
        "https://industries-harold-developer-those.trycloudflare.com/api/products/signin",
        loginData,
      );

      console.log("Login response:", response.data);
      console.log("USER ID FROM BACKEND:", response.data.userId);

      const loggedInUser = response.data;

      const userId = loggedInUser.userId;
      const userEmail = loggedInUser.email;

      // ==========================================
      // SAVE COMPLETE USER DETAILS
      // ==========================================
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // ==========================================
      // SAVE USER ID
      // ==========================================
      localStorage.setItem("userId", userId);

      // ==========================================
      // SAVE USER EMAIL
      // ==========================================
      localStorage.setItem("userEmail", userEmail);

      console.log("USER ID SAVED:", localStorage.getItem("userId"));

      console.log("USER DATA SAVED:", JSON.parse(localStorage.getItem("user")));

      // ==========================================
      // LOGIN SUCCESS
      // ==========================================
      alert("Login successful!");

      // GO TO HOME PAGE
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Invalid email or password.");
      } else {
        setMessage("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE / GMAIL LOGIN
  // ==========================================
  const handleGoogleLogin = async (credentialResponse) => {
    setMessage("");

    try {
      console.log("Google credential received");

      // ==========================================
      // SEND GOOGLE CREDENTIAL TO SPRING BOOT
      // ==========================================
      const response = await axios.post(
        "https://industries-harold-developer-those.trycloudflare.com/api/products/google-signin",
        {
          credential: credentialResponse.credential,
        },
      );

      console.log("Google login response:", response.data);

      const loggedInUser = response.data;

      const userId = loggedInUser.userId;

      const userEmail = loggedInUser.email;

      // ==========================================
      // SAVE COMPLETE USER DETAILS
      // ==========================================
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // ==========================================
      // SAVE USER ID
      // ==========================================
      localStorage.setItem("userId", userId);

      // ==========================================
      // SAVE USER EMAIL
      // ==========================================
      localStorage.setItem("userEmail", userEmail);

      console.log("GOOGLE USER ID SAVED:", localStorage.getItem("userId"));

      console.log(
        "GOOGLE USER DATA SAVED:",
        JSON.parse(localStorage.getItem("user")),
      );

      // ==========================================
      // GOOGLE LOGIN SUCCESS
      // ==========================================
      alert("Google login successful!");

      // GO TO HOME PAGE
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);

      setMessage(error.response?.data || "Google login failed.");
    }
  };

  // ==========================================
  // GOOGLE LOGIN ERROR
  // ==========================================
  const handleGoogleError = () => {
    console.error("Google Login Failed");

    setMessage("Google authentication failed. Please try again.");
  };

  return (
    <>
      {/* GOOGLE FONTS — elegant serif display paired with a clean humanist body face,
          JetBrains Mono kept as the utility/label voice */}
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

        .signin-page {
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
           AMBIENT ORB 1 — champagne gold
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

          animation:
            floatOrb
            22s
            ease-in-out
            infinite
            alternate;

          pointer-events: none;
        }

        /* ==========================================
           AMBIENT ORB 2 — muted plum
        ========================================== */

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

          animation:
            floatOrb
            26s
            ease-in-out
            infinite
            alternate-reverse;

          pointer-events: none;
        }

        /* ==========================================
           ORB DRIFT ANIMATION
        ========================================== */

        @keyframes floatOrb {

          0% {
            transform: translate(0, 0) scale(1);
          }

          100% {
            transform: translate(46px, -46px) scale(1.12);
          }

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

        /* ==========================================
           SIGNATURE — slow rotating gold/plum halo ring
        ========================================== */

        @keyframes haloSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .signin-card-wrap {
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

        .signin-card-wrap::before {
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

        .signin-card-wrap:hover {
          transform: translateY(-4px);

          box-shadow:
            0 45px 90px rgba(0, 0, 0, 0.7),
            0 0 60px rgba(99, 102, 241, 0.10);
        }

        .signin-card-wrap:hover::before {
          opacity: 0.85;
        }

        /* ==========================================
           SIGN IN CARD
        ========================================== */

        .signin-card {
          width: 100%;

          background: rgba(15, 23, 42, 0.78);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          padding: 46px 40px 38px;

          border-radius: 21px;

          position: relative;
        }

        /* ==========================================
           STAGGERED ENTRANCE FOR INNER ELEMENTS
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
           SECURITY BADGE
        ========================================== */

        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.55); }
          50% { box-shadow: 0 0 0 5px rgba(56, 189, 248, 0); }
        }

        .signin-badge {
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
           LOGO
        ========================================== */

        .signin-logo {
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

        /* ==========================================
           SUBTITLE
        ========================================== */

        .signin-subtitle {
          color: #94A3B8;
          margin: 0 0 30px;
          font-size: 14px;
          line-height: 1.6;
        }

        /* ==========================================
           INPUT GROUP
        ========================================== */

        .signin-input-group {
          margin-bottom: 22px;
        }

        /* ==========================================
           LABEL
        ========================================== */

        .signin-label {
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

        /* ==========================================
           INPUT WRAPPER
        ========================================== */

        .signin-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* underline sweep that draws in on focus, sits under the input */
        .signin-input-wrapper::after {
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

        .signin-input-wrapper:focus-within::after {
          transform: scaleX(1);
        }

        .signin-input-group:focus-within .signin-label {
          color: #38BDF8;
        }

        /* ==========================================
           INPUT
        ========================================== */

        .signin-input {
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

        .signin-input::placeholder {
          color: #64748B;
        }

        .signin-input:hover {
          border-color: rgba(255, 255, 255, 0.16);
        }

        .signin-input:focus {
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

          color: #64748B;
          cursor: pointer;

          padding: 6px;

          display: flex;
          align-items: center;
          justify-content: center;

          transition: color 0.2s ease, transform 0.2s ease;
        }

        .toggle-password-btn:hover {
          color: #38BDF8;
          transform: scale(1.08);
        }

        .toggle-password-btn svg {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ==========================================
           SIGN IN BUTTON
        ========================================== */

        .signin-button {
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

        /* ==========================================
           BUTTON SHIMMER
        ========================================== */

        .signin-button::after {
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

        .signin-button:hover:not(:disabled)::after {
          left: 140%;
        }

        .signin-button:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.012);
          box-shadow: 0 16px 32px rgba(99, 102, 241, 0.35);
          filter: brightness(1.06);
        }

        .signin-button:active:not(:disabled) {
          transform: translateY(0) scale(0.99);
        }

        .signin-button:disabled {
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
           GOOGLE LOGIN SECTION
        ========================================== */

        .google-login-section {
          margin-top: 26px;
          width: 100%;
        }

        /* ==========================================
           GOOGLE DIVIDER
        ========================================== */

        .google-divider {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 18px;

          color: #64748B;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
        }

        .google-divider::before,
        .google-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* ==========================================
           GOOGLE BUTTON
        ========================================== */

        .google-button-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;

          border-radius: 10px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
        }

        .google-button-wrapper:hover {
          transform: translateY(-1px);
          filter: brightness(1.04);
        }

        /* ==========================================
           ERROR MESSAGE
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

        .signin-message {
          text-align: center;
          margin-top: 22px;

          padding: 12px 14px;

          background: rgba(239, 68, 68, 0.10);
          border: 1px solid rgba(239, 68, 68, 0.28);
          border-radius: 8px;

          color: #FCA5A5;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 12px;

          animation: messageReveal 0.35s ease forwards, shakeError 0.4s ease 0.35s;
        }

        /* ==========================================
           SIGN UP TEXT
        ========================================== */

        .signin-bottom-text {
          text-align: center;
          margin-top: 28px;
          padding-top: 22px;

          border-top: 1px solid rgba(255, 255, 255, 0.08);

          color: #94A3B8;
          font-size: 14px;
        }

        /* ==========================================
           SIGN UP LINK
        ========================================== */

        .signin-link {
          color: #38BDF8;
          font-weight: 600;
          text-decoration: none;

          position: relative;
          transition: color 0.25s ease;
        }

        .signin-link::after {
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

        .signin-link:hover {
          color: #67E8F9;
        }

        .signin-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* ==========================================
           RESPONSIVE
        ========================================== */

        @media (max-width: 500px) {

          .signin-page {
            padding: 20px 16px;
          }

          .signin-card {
            padding: 36px 22px 28px;
          }

          .signin-logo {
            font-size: 27px;
          }

        }

        `}
      </style>

      {/* ==========================================
          MAIN SIGN IN PAGE
      ========================================== */}

      <div className="signin-page">
        {/* AMBIENT LIGHT EFFECTS */}

        <div className="ambient-orb-1" />

        <div className="ambient-orb-2" />

        {/* ==========================================
            CARD WRAPPER
        ========================================== */}

        <div className="signin-card-wrap">
          <div className="signin-card">
            {/* ==========================================
                SECURITY BADGE
            ========================================== */}

            <div className="signin-badge stagger stagger-1">
              <span className="badge-dot" />
              LOGIN ACCOUNT
            </div>

            {/* ==========================================
                HEADER
            ========================================== */}

            <h1 className="signin-logo stagger stagger-2">Welcome Back</h1>

            <p className="signin-subtitle stagger stagger-3">
              Sign in to manage your account and catalog products
            </p>

            {/* ==========================================
                ORIGINAL EMAIL + PASSWORD LOGIN
            ========================================== */}

            <form onSubmit={handleSubmit}>
              {/* EMAIL */}

              <div className="signin-input-group stagger stagger-4">
                <label className="signin-label">Email Address</label>

                <div className="signin-input-wrapper">
                  <input
                    className="signin-input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="signin-input-group stagger stagger-5">
                <label className="signin-label">Password</label>

                <div className="signin-input-wrapper">
                  <input
                    className="signin-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />

                  {/* PASSWORD SHOW/HIDE BUTTON */}

                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      /* HIDE PASSWORD ICON */

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="
                          M17.94
                          17.94A10.07
                          10.07
                          0
                          1
                          12
                          20c-7
                          0-11-8-11-8
                          a18.45
                          18.45
                          0
                          1
                          5.06-5.94
                          M9.9
                          4.24A9.12
                          9.12
                          0
                          1
                          12
                          4c7
                          0
                          11
                          8
                          11
                          8
                          a18.5
                          18.5
                          0
                          1
                          2.16
                          3.19
                          m-6.72
                          -1.07a3
                          3
                          0
                          1
                          1-4.24
                          -4.24
                        "
                        />

                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      /* SHOW PASSWORD ICON */

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="
                          M1
                          12s4-8
                          11-8
                          11
                          8
                          11
                          8-4
                          8-11
                          8
                          -11-8
                          -11-8z
                        "
                        />

                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* ==========================================
                  ORIGINAL SIGN IN BUTTON
              ========================================== */}

              <div className="stagger stagger-6">
                <button
                  type="submit"
                  className="signin-button"
                  disabled={loading}
                >
                  {loading && <span className="button-spinner" />}

                  {loading ? "Authenticating..." : "Sign In →"}
                </button>
              </div>
            </form>

            {/* ==========================================
                GOOGLE / GMAIL LOGIN
            ========================================== */}

            <div className="google-login-section stagger stagger-7">
              <div className="google-divider">OR CONTINUE WITH</div>

              <div className="google-button-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="360"
                />
              </div>
            </div>

            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {message && <div className="signin-message">⚠️ {message}</div>}

            {/* ==========================================
                SIGN UP REDIRECT
            ========================================== */}

            <p className="signin-bottom-text">
              Don't have an account?{" "}
              <Link to="/signup" className="signin-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
