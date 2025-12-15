import React, { useEffect, useRef, useState } from "react";
import "./auth.css";

export default function CustomerLogin({ onClose, onSwitchToMom }) {
  const modalRef = useRef(null);
  const [otpSent, setOtpSent] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on outside click
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="auth-overlay" onMouseDown={handleOverlayClick}>
      <div className="auth-modal" ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="auth-header">
          <h2>Get started</h2>
          <button className="auth-close" onClick={onClose}>✕</button>
        </div>

        {/* ROLE TABS */}
        <div className="auth-tabs">
          <button className="tab active">Customer</button>
          <button className="tab" onClick={onSwitchToMom}>
            Mom / Kitchen
          </button>
        </div>

        {/* HELPER TEXT */}
        <p className="auth-helper">
          Quick sign-up. We’ll send an OTP to verify your phone.
        </p>

        {/* FORM */}
        <form className="auth-form">
          <label>Full name</label>
          <input type="text" placeholder="Enter full name" />

          <label>Phone (preferred)</label>
          <input type="tel" placeholder="+91 9XXXXXXXXX" />

          <label>Email (optional)</label>
          <input type="email" placeholder="Enter email" />

          <label>Default address</label>
          <input type="text" placeholder="Start typing address..." />

          <div className="auth-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setOtpSent(true)}
            >
              Send OTP
            </button>

            <button type="button" className="btn-secondary">
              Sign in with Google
            </button>
          </div>

          {otpSent && (
            <div className="otp-section">
              <label>Enter OTP</label>
              <input type="text" placeholder="6-digit OTP" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
