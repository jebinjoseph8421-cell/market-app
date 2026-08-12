import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PROFILE DETAILS (UNCHANGED LOGIC & ENDPOINT)
  // ==========================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get logged-in user from localStorage
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          navigate("/");
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        // Check whether email exists
        if (!loggedInUser.email) {
          setError("User email not found.");
          setLoading(false);
          return;
        }

        // Get profile using email (UNCHANGED ENDPOINT)
        const response = await axios.get(
          `https://industries-harold-developer-those.trycloudflare.com/api/products/user-profile/${encodeURIComponent(
            loggedInUser.email,
          )}`,
        );

        console.log("Profile:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);

        if (error.response) {
          console.error("Server response:", error.response.data);
        }

        setError("Unable to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ==========================================
  // LOGOUT (UNCHANGED)
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const FontLink = () => (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
    />
  );

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <FontLink />
        <style>{globalAnimations}</style>

        <div className="ambient-orb-1" style={styles.ambientOrb1} />
        <div className="ambient-orb-2" style={styles.ambientOrb2} />

        <div style={styles.loadingCardWrap} className="card-reveal">
          <div style={styles.loadingCard}>
            <div style={styles.loadingSpinner}></div>
            <h2 style={styles.loadingTitle}>Loading Profile</h2>
            <p style={styles.loadingText}>Fetching your member details...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  if (error) {
    return (
      <div style={styles.loadingPage}>
        <FontLink />
        <style>{globalAnimations}</style>

        <div className="ambient-orb-1" style={styles.ambientOrb1} />
        <div className="ambient-orb-2" style={styles.ambientOrb2} />

        <div style={styles.loadingCardWrap} className="card-reveal">
          <div style={styles.loadingCard}>
            <div style={styles.errorIcon}>!</div>
            <h2 style={styles.errorTitle}>Authentication Notice</h2>
            <p style={styles.errorText}>{error}</p>

            <button
              onClick={() => navigate("/")}
              style={styles.backButton}
              className="btn-shine"
            >
              Go to Sign In →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <FontLink />
      <style>{globalAnimations}</style>

      {/* AMBIENT LIGHT MESH */}
      <div className="ambient-orb-1" style={styles.ambientOrb1} />
      <div className="ambient-orb-2" style={styles.ambientOrb2} />

      <div style={styles.profileCardWrap} className="card-reveal">
        <div style={styles.profileCard}>
          <div style={styles.cornerLabel}>
            <span style={styles.cornerDot} /> VERIFIED MEMBER
          </div>

          {/* HEADER */}
          <div style={styles.header}>
            <div style={styles.avatarWrapper}>
              <div style={styles.avatarGlow} className="avatar-pulse" />
              <div style={styles.avatar}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <h1 style={styles.title}>{user?.name || "My Account"}</h1>
            <p style={styles.subtitle}>
              Personal Account & Catalog Member Card
            </p>
          </div>

          {/* USER DETAILS */}
          <div style={styles.details}>
            {/* USERNAME */}
            <div style={styles.detailRow} className="detail-row-hover">
              <div style={styles.detailLeft}>
                <div style={styles.icon}>👤</div>
                <span style={styles.label}>Username</span>
              </div>
              <span style={styles.value}>{user?.name || "Not available"}</span>
            </div>

            {/* EMAIL */}
            <div style={styles.detailRow} className="detail-row-hover">
              <div style={styles.detailLeft}>
                <div style={styles.icon}>✉</div>
                <span style={styles.label}>Email Address</span>
              </div>
              <span style={styles.value}>{user?.email || "Not available"}</span>
            </div>

            {/* ACCOUNT STATUS */}
            <div
              style={{ ...styles.detailRow, borderBottom: "none" }}
              className="detail-row-hover"
            >
              <div style={styles.detailLeft}>
                <div style={styles.icon}>⚡</div>
                <span style={styles.label}>Account Status</span>
              </div>
              <span style={styles.statusBadge}>ACTIVE</span>
            </div>
          </div>

          {/* LOGOUT */}
          <div style={styles.logoutSection}>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              className="btn-shine"
            >
              Logout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// GLOBAL ANIMATIONS
// =====================================================
const globalAnimations = `
  * { box-sizing: border-box; }

  @keyframes floatOrb {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(45px, -45px) scale(1.1); }
  }
  .ambient-orb-1 { animation: floatOrb 18s ease-in-out infinite alternate; }
  .ambient-orb-2 { animation: floatOrb 22s ease-in-out infinite alternate-reverse; }

  @keyframes cardReveal {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  .card-reveal {
    animation: cardReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes avatarPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.15); opacity: 0.8; }
  }
  .avatar-pulse {
    animation: avatarPulse 3.5s ease-in-out infinite;
  }

  .detail-row-hover {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .detail-row-hover:hover {
    background: rgba(255, 255, 255, 0.04);
    transform: translateX(4px);
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
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
    transform: skewX(-20deg);
    transition: left 0.6s ease;
  }
  .btn-shine:hover::after { left: 140%; }
  .btn-shine:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 14px 28px rgba(239, 68, 68, 0.3);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// =====================================================
// STYLES
// =====================================================
const DISPLAY = "'Space Grotesk', sans-serif";
const BODY = "'Plus Jakarta Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#080C14",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    boxSizing: "border-box",
    fontFamily: BODY,
    position: "relative",
    overflow: "hidden",
    color: "#F8FAFC",
  },

  ambientOrb1: {
    position: "absolute",
    top: "-15%",
    left: "-10%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, transparent 70%)",
    filter: "blur(80px)",
    pointerEvents: "none",
  },
  ambientOrb2: {
    position: "absolute",
    bottom: "-15%",
    right: "-10%",
    width: "650px",
    height: "650px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },

  profileCardWrap: {
    position: "relative",
    width: "100%",
    maxWidth: "540px",
    borderRadius: "20px",
    padding: "1px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.15))",
    boxShadow:
      "0 35px 80px rgba(0, 0, 0, 0.65), 0 0 40px rgba(99, 102, 241, 0.1)",
    zIndex: 1,
  },

  profileCard: {
    width: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    padding: "52px 42px 42px",
    borderRadius: "19px",
    position: "relative",
  },

  cornerLabel: {
    position: "absolute",
    top: "24px",
    right: "26px",
    fontFamily: MONO,
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "1.5px",
    color: "#38BDF8",
    backgroundColor: "rgba(56, 189, 248, 0.1)",
    border: "1px solid rgba(56, 189, 248, 0.25)",
    padding: "4px 10px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  cornerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#38BDF8",
    boxShadow: "0 0 8px #38BDF8",
  },

  header: {
    textAlign: "center",
    paddingBottom: "32px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },

  avatarWrapper: {
    position: "relative",
    width: "92px",
    height: "92px",
    margin: "0 auto 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarGlow: {
    position: "absolute",
    inset: "-4px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
    filter: "blur(8px)",
    zIndex: 0,
  },
  avatar: {
    position: "relative",
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    backgroundColor: "#0F172A",
    color: "#F8FAFC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "36px",
    fontFamily: DISPLAY,
    fontWeight: "700",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    zIndex: 1,
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  },

  title: {
    fontFamily: DISPLAY,
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: "#F8FAFC",
  },

  subtitle: {
    marginTop: "0",
    marginBottom: "0",
    color: "#94A3B8",
    fontSize: "14px",
  },

  details: {
    marginTop: "16px",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 14px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "8px",
    gap: "20px",
  },

  detailLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  icon: {
    width: "36px",
    height: "36px",
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    color: "#38BDF8",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    flexShrink: 0,
  },

  label: {
    fontFamily: MONO,
    color: "#94A3B8",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  value: {
    color: "#F8FAFC",
    fontSize: "15px",
    fontWeight: "600",
    textAlign: "right",
    maxWidth: "60%",
    wordBreak: "break-word",
  },

  statusBadge: {
    fontFamily: MONO,
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#34D399",
    backgroundColor: "rgba(52, 211, 153, 0.12)",
    border: "1px solid rgba(52, 211, 153, 0.3)",
    padding: "4px 10px",
    borderRadius: "4px",
  },

  logoutSection: {
    marginTop: "32px",
  },

  logoutButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #EF4444, #DC2626)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontFamily: DISPLAY,
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "1px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
  },

  // LOADING & ERROR STYLES
  loadingPage: {
    minHeight: "100vh",
    backgroundColor: "#080C14",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: BODY,
    position: "relative",
    overflow: "hidden",
  },

  loadingCardWrap: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "20px",
    padding: "1px",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(99, 102, 241, 0.25))",
    zIndex: 1,
  },

  loadingCard: {
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    padding: "48px 36px",
    borderRadius: "19px",
    textAlign: "center",
    width: "100%",
  },

  loadingSpinner: {
    width: "42px",
    height: "42px",
    border: "3px solid rgba(56, 189, 248, 0.2)",
    borderTop: "3px solid #38BDF8",
    borderRadius: "50%",
    margin: "0 auto 20px",
    animation: "spin 0.9s linear infinite",
  },

  loadingTitle: {
    fontFamily: DISPLAY,
    color: "#F8FAFC",
    margin: "0 0 8px",
    fontSize: "20px",
  },

  loadingText: {
    color: "#94A3B8",
    fontSize: "14px",
    margin: 0,
  },

  errorIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#EF4444",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 18px",
    fontSize: "24px",
    fontWeight: "700",
    border: "1.5px solid rgba(239, 68, 68, 0.4)",
  },

  errorTitle: {
    fontFamily: DISPLAY,
    color: "#F8FAFC",
    marginTop: "0",
    fontSize: "20px",
    marginBottom: "8px",
  },

  errorText: {
    color: "#FCA5A5",
    fontSize: "14px",
    marginBottom: "24px",
  },

  backButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #06B6D4, #6366F1)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    fontFamily: DISPLAY,
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    cursor: "pointer",
  },
};

export default Profile;
