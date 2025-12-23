import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mom-auth.css";
import MomDishManager from "../components/MomDishManager";

export default function MomLogin({ onClose, onSwitchToCustomer, mode }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // LOGIN → start directly at OTP | SIGNUP → step 1
  const [step, setStep] = useState(mode === "login" ? 5 : 1);
  const [otpError, setOtpError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    kitchenName: "",
    cuisines: "",
    holidays: "",
    openTime: "",
    closeTime: "",
    deliveryRadius: 3,
    maxOrders: 10,
    phone: "",
    otp: ""
  });

  const [dishes, setDishes] = useState([]);

  /* Close on ESC */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  /* Close on outside click */
  const handleOverlay = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  /* ---------- OTP VERIFY ---------- */
  const verifyOtpAndFinish = () => {
    if (formData.otp === "12345") {
      localStorage.setItem("role", "mom");
      localStorage.setItem("isVerified", "true");
      localStorage.setItem("momName", formData.fullName || "Mom");
      localStorage.setItem("momProfile", JSON.stringify(formData));
      localStorage.setItem("momDishes", JSON.stringify(dishes));

      navigate("/mom-dashboard");
      onClose();
    } else {
      setOtpError("Invalid OTP. Use 12345");
    }
  };

  return (
    <div className="mom-auth-overlay" onMouseDown={handleOverlay}>
      <div
        className="mom-auth-modal"
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mom-auth-header">
          <h2>{mode === "login" ? "Mom Login" : "Mom Signup"}</h2>
          <button className="mom-auth-close" onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div className="mom-auth-tabs">
          <button className="mom-tab" onClick={onSwitchToCustomer}>
            Customer
          </button>
          <button className="mom-tab active">
            Mom / Kitchen
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mom-step">

          {/* ================= SIGNUP FLOW ================= */}

          {step === 1 && mode === "signup" && (
            <>
              <h3>1 — Personal</h3>
              <div className="mom-form-grid two-col">
                <div>
                  <label>Full name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && mode === "signup" && (
            <>
              <h3>2 — Kitchen profile</h3>
              <div className="mom-form-grid">
                <div>
                  <label>Kitchen / Display name</label>
                  <input
                    value={formData.kitchenName}
                    onChange={(e) =>
                      setFormData({ ...formData, kitchenName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Cuisine / specialties</label>
                  <input
                    value={formData.cuisines}
                    onChange={(e) =>
                      setFormData({ ...formData, cuisines: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Holiday closures</label>
                  <input
                    value={formData.holidays}
                    onChange={(e) =>
                      setFormData({ ...formData, holidays: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && mode === "signup" && (
            <>
              <h3>3 — Hours & Capacity</h3>
              <div className="mom-form-grid">
                <div>
                  <label>Operating hours</label>
                  <div className="mom-time-row">
                    <input
                      type="time"
                      value={formData.openTime}
                      onChange={(e) =>
                        setFormData({ ...formData, openTime: e.target.value })
                      }
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={formData.closeTime}
                      onChange={(e) =>
                        setFormData({ ...formData, closeTime: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label>Delivery radius (km)</label>
                  <input
                    type="number"
                    value={formData.deliveryRadius}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryRadius: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Max concurrent orders</label>
                  <input
                    type="number"
                    value={formData.maxOrders}
                    onChange={(e) =>
                      setFormData({ ...formData, maxOrders: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && mode === "signup" && (
            <MomDishManager dishes={dishes} setDishes={setDishes} />
          )}

          {/* ================= LOGIN (NEW UI) ================= */}

          {step === 5 && (
            <div className="mom-login-modern">
              <h3 className="mom-login-title">Welcome Back 👩‍🍳</h3>
              <p className="mom-login-subtitle">
                Login to manage your kitchen
              </p>

              <div className="mom-login-fields">
                <input
                  value={formData.kitchenName}
                  onChange={(e) =>
                    setFormData({ ...formData, kitchenName: e.target.value })
                  }
                  placeholder="Kitchen Name"
                />

                <input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                />

                <input
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  placeholder="Enter OTP"
                />
              </div>

              {otpError && <p className="mom-error">{otpError}</p>}

              <button
                className="mom-login-btn"
                onClick={verifyOtpAndFinish}
              >
                Verify & Login
              </button>
            </div>
          )}
        </div>

        {/* FOOTER (SIGNUP ONLY) */}
        {mode === "signup" && (
          <div className="mom-footer">
            {step > 1 && (
              <button
                className="mom-btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            {step < 5 && (
              <button
                className="mom-btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
          </div>
        )}

        <p className="mom-auth-note">
          OTP is temporary for demo purposes (12345).
        </p>
      </div>
    </div>
  );
}
