import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function CustomerLogin({ onClose, onSwitchToMom, mode }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(mode === "login");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: ""
  });

  /* ESC close */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  /* Overlay click */
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  /* OTP verify */
  const verifyOtpAndFinish = () => {
    if (otp === "12345") {
      localStorage.setItem("role", "customer");
      localStorage.setItem("isVerified", "true");
      localStorage.setItem("customerProfile", JSON.stringify(formData));

      navigate("/customer-dashboard");
      onClose();
    } else {
      setOtpError("Invalid OTP. Use 12345");
    }
  };

  return (
    <div className="auth-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="auth-modal"
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="auth-header">
          <h2>{mode === "login" ? "Customer Login" : "Customer Signup"}</h2>
          <button className="auth-close" onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div className="auth-tabs">
          <button className="tab active">Customer</button>
          <button className="tab" onClick={onSwitchToMom}>
            Mom / Kitchen
          </button>
        </div>

        {/* HELPER */}
        <p className="auth-helper">
          OTP is temporary for demo purposes (<b>12345</b>)
        </p>

        {/* ================= SIGNUP (UNCHANGED) ================= */}
        {mode === "signup" && (
          <form className="auth-form">
            <label>Full name</label>
            <input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <label>Phone</label>
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <label>Email</label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <label>Default address</label>
            <input
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            {!otpSent ? (
              <div className="auth-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setOtpSent(true)}
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div className="otp-section">
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                {otpError && <p style={{ color: "red" }}>{otpError}</p>}

                <button
                  type="button"
                  className="btn-primary auth-full"
                  onClick={verifyOtpAndFinish}
                >
                  Verify & Finish
                </button>
              </div>
            )}
          </form>
        )}

        {/* ================= LOGIN (NEW MODERN UI) ================= */}
        {mode === "login" && (
          <div className="customer-login-modern">
            <h3 className="customer-login-title">Welcome Back 👋</h3>
            <p className="customer-login-subtitle">
              Login to continue ordering
            </p>

            <div className="customer-login-fields">
              <input
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {otpError && <p className="auth-error">{otpError}</p>}

            <button
              className="customer-login-btn"
              onClick={verifyOtpAndFinish}
            >
              Verify & Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
