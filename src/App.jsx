import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [isCompact, setIsCompact] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    
    if (!formData.query.trim()) {
      newErrors.query = "Message is required";
    } else if (formData.query.length < 1) {
      newErrors.query = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const phoneNumber = "8431715675";

    const message = `🏢 New Contact Form Submission%0A%0A👤 Name: ${formData.name}%0A📧 Email: ${formData.email}%0A📱 Mobile: ${formData.mobile}%0A💬 Message: ${formData.query}`;

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      window.open(url, "_blank");
      setFormData({ name: "", email: "", mobile: "", query: "" });
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      alert("Unable to open WhatsApp. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.bgGradient}></div>
        <div style={styles.floatingShapes}>
          <div style={{...styles.shape, ...styles.shape1}}></div>
          <div style={{...styles.shape, ...styles.shape2}}></div>
          <div style={{...styles.shape, ...styles.shape3}}></div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✦</span>
            <span style={styles.logoText}>Whatsapp Form</span>
          </div>
        </header>

        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              Let's Start a
              <span style={styles.highlight}> Conversation</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Have a question or want to work together? 
              Fill out the form and we'll connect via WhatsApp.
            </p>
            
            {/* Features */}
            <div style={styles.features}>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>⚡</div>
                <span>Quick Response</span>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>🔒</div>
                <span>Secure Chat</span>
              </div>
              <div style={styles.feature}>
                <div style={styles.featureIcon}>💬</div>
                <span>Direct Contact</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div style={{
            ...styles.formCard,
            ...(isCompact ? styles.formCardCompact : {}),
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }}>
            <div style={styles.formHeader}>
              <div style={styles.formTitleRow}>
                <h2 style={styles.formTitle}>Contact Us</h2>
                <button 
                  type="button"
                  onClick={() => setIsCompact(!isCompact)}
                  style={styles.toggleBtn}
                  className="toggle-btn-hover"
                  title={isCompact ? "Expand form" : "Compact form"}
                >
                  {isCompact ? (
                    <span style={styles.toggleIcon}>⤢</span>
                  ) : (
                    <span style={styles.toggleIcon}>⤡</span>
                  )}
                </button>
              </div>
              <p style={styles.formSubtitle}>Fill in your details below</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.contactForm}>
              {/* Name Field */}
              <div style={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {})
                  }}
                  placeholder="Full Name"
                  autoComplete="off"
                />
                {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
              </div>

              {/* Email Field */}
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                  placeholder="Email Address"
                  autoComplete="email"
                />
                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
              </div>

              {/* Mobile Field */}
              <div style={styles.inputGroup}>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    ...(errors.mobile ? styles.inputError : {})
                  }}
                  placeholder="Mobile Number"
                  autoComplete="tel"
                />
                {errors.mobile && <span style={styles.errorMessage}>{errors.mobile}</span>}
              </div>

              {/* Message Field */}
              <div style={styles.inputGroup}>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  style={{
                    ...styles.textarea,
                    ...(errors.query ? styles.inputError : {})
                  }}
                  placeholder="Your Message"
                  rows="2"
                />
                <span style={styles.charCount}>{formData.query.length}/500</span>
                {errors.query && <span style={styles.errorMessage}>{errors.query}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                style={{
                  ...styles.submitBtn,
                  ...(loading ? styles.submitBtnLoading : {})
                }}
              >
                {loading ? (
                  <>
                    <span style={styles.spinner}></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span style={styles.btnIcon}>📱</span>
                    <span>Send via WhatsApp</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div style={styles.formFooter}>
              <p>We'll respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Premium Styles
const styles = {
  appContainer: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },

  bgGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #0f2027 100%)",
  },

  floatingShapes: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  shape: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.3,
    animation: "float 20s ease-in-out infinite",
  },

  shape1: {
    width: "400px",
    height: "400px",
    background: "rgba(56, 189, 248, 0.3)",
    top: "-100px",
    right: "-100px",
    animationDelay: "0s",
  },

  shape2: {
    width: "300px",
    height: "300px",
    background: "rgba(129, 140, 248, 0.3)",
    bottom: "-50px",
    left: "-50px",
    animationDelay: "5s",
  },

  shape3: {
    width: "250px",
    height: "250px",
    background: "rgba(37, 211, 102, 0.2)",
    top: "50%",
    left: "50%",
    animationDelay: "10s",
  },

  mainContent: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    padding: "20px",
  },

  header: {
    padding: "20px 40px",
    display: "flex",
    justifyContent: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoIcon: {
    fontSize: "24px",
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "2px",
  },

  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "60px",
    minHeight: "calc(100vh - 120px)",
    padding: "40px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
    flexWrap: "wrap",
  },

  heroText: {
    flex: "1",
    maxWidth: "450px",
    color: "#ffffff",
  },

  heroTitle: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "24px",
    letterSpacing: "-1px",
  },

  highlight: {
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "450px",
  },

  features: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    fontSize: "14px",
    color: "#cbd5e1",
  },

  featureIcon: {
    fontSize: "18px",
  },

  formCard: {
    flex: "1",
    maxWidth: "600px",
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.98) 100%)",
    borderRadius: "24px",
    padding: "50px",
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3), 0 0 40px rgba(56, 189, 248, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  formHeader: {
    marginBottom: "32px",
    textAlign: "center",
  },

  formTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },

  formSubtitle: {
    fontSize: "14px",
    color: "#64748b",
  },

  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    position: "relative",
  },

  input: {
    width: "100%",
    padding: "16px 20px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    background: "#f8fafc",
    color: "#1e293b",
    fontFamily: "inherit",
  },

  textarea: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s ease",
    background: "#f8fafc",
    color: "#1e293b",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "60px",
    maxHeight: "150px",
  },

  inputError: {
    borderColor: "#ef4444",
    background: "#fef2f2",
  },

  inputSuccess: {
    borderColor: "#22c55e",
    background: "#f0fdf4",
  },

  errorMessage: {
    display: "block",
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "6px",
    marginLeft: "4px",
  },

  charCount: {
    position: "absolute",
    right: "12px",
    bottom: "8px",
    fontSize: "11px",
    color: "#94a3b8",
  },

  submitBtn: {
    width: "100%",
    padding: "18px 32px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
    marginTop: "8px",
    fontFamily: "inherit",
  },

  submitBtnLoading: {
    opacity: 0.8,
    cursor: "not-allowed",
  },

  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  btnIcon: {
    fontSize: "18px",
  },

  formFooter: {
    textAlign: "center",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },

  formFooterP: {
    fontSize: "13px",
    color: "#64748b",
  },

  formTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  toggleBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  toggleIcon: {
    fontSize: "16px",
    color: "#64748b",
    transition: "all 0.3s ease",
  },

  formCardCompact: {
    padding: "24px",
    maxWidth: "350px",
    transform: "scale(0.9)",
    opacity: 0.95,
  },
};

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  input:focus, textarea:focus {
    border-color: #38bdf8 !important;
    background: #ffffff !important;
    box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1) !important;
  }
  
  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5) !important;
  }
  
  button:not(:disabled):active {
    transform: translateY(0);
  }
  
  .toggle-btn-hover:hover {
    background: rgba(56, 189, 248, 0.1) !important;
  }
  
  .toggle-btn-hover:hover span {
    color: #38bdf8 !important;
  }
`;
document.head.appendChild(styleSheet);
