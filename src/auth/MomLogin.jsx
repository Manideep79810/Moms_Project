import React, { useEffect, useRef, useState } from "react";
import "./mom-auth.css";

export default function MomLogin({ onClose, onSwitchToCustomer }) {
  const modalRef = useRef(null);
  const [step, setStep] = useState(1);

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

  /* ---------- DISH HANDLERS ---------- */

  const addDish = () => {
    setDishes([
      ...dishes,
      {
        name: "",
        photo: null,
        preview: "",
        description: "",
        price: "",
        prepTime: "",
        badges: "",
        stock: 10
      }
    ]);
  };

  const updateDish = (i, key, value) => {
    const updated = [...dishes];
    updated[i][key] = value;
    setDishes(updated);
  };

  const removeDish = (i) => {
    setDishes(dishes.filter((_, index) => index !== i));
  };

  const handlePhoto = (i, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateDish(i, "photo", file);
    updateDish(i, "preview", preview);
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
          <h2>Get started</h2>
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

        {/* STEP CONTENT */}
        <div className="mom-step">

          {/* STEP 1 */}
          {step === 1 && (
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

          {/* STEP 2 */}
          {step === 2 && (
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
                    placeholder="e.g., South Indian, Snacks"
                    value={formData.cuisines}
                    onChange={(e) =>
                      setFormData({ ...formData, cuisines: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Holiday closures</label>
                  <input
                    placeholder="e.g., Sun, 2025-12-25"
                    value={formData.holidays}
                    onChange={(e) =>
                      setFormData({ ...formData, holidays: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
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
                      setFormData({
                        ...formData,
                        deliveryRadius: e.target.value
                      })
                    }
                  />
                </div>

                <div>
                  <label>Max concurrent orders</label>
                  <input
                    type="number"
                    value={formData.maxOrders}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxOrders: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <h3>4 — Add dishes</h3>
              <p className="mom-muted">
                Add signature & regular dishes. Use “Add Dish” to include multiple items.
              </p>

              {dishes.map((dish, i) => (
                <div key={i} className="mom-dish-card">
                  <label>Dish name</label>
                  <input
                    value={dish.name}
                    onChange={(e) =>
                      updateDish(i, "name", e.target.value)
                    }
                  />

                  <label>Photo</label>
                  <div className="mom-photo-upload">
                    {dish.preview ? (
                      <img src={dish.preview} alt="preview" />
                    ) : (
                      <span>Square preview</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handlePhoto(i, e.target.files[0])
                      }
                    />
                  </div>

                  <label>Description</label>
                  <textarea
                    value={dish.description}
                    onChange={(e) =>
                      updateDish(i, "description", e.target.value)
                    }
                  />

                  <label>Price</label>
                  <input
                    type="number"
                    value={dish.price}
                    onChange={(e) =>
                      updateDish(i, "price", e.target.value)
                    }
                  />

                  <label>Prep time (mins)</label>
                  <input
                    type="number"
                    value={dish.prepTime}
                    onChange={(e) =>
                      updateDish(i, "prepTime", e.target.value)
                    }
                  />

                  <label>Dietary badges</label>
                  <input
                    placeholder="veg, gluten-free"
                    value={dish.badges}
                    onChange={(e) =>
                      updateDish(i, "badges", e.target.value)
                    }
                  />

                  <label>Stock / available</label>
                  <input
                    type="number"
                    value={dish.stock}
                    onChange={(e) =>
                      updateDish(i, "stock", e.target.value)
                    }
                  />

                  <button
                    className="mom-remove-dish"
                    onClick={() => removeDish(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button className="mom-btn-primary" onClick={addDish}>
                Add Dish
              </button>
            </>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <>
              <h3>5 — Verify OTP</h3>

              <div className="mom-form-grid">
                <div>
                  <label>Phone number</label>
                  <input placeholder="+91 9XXXXXXXXX" />
                </div>

                <div>
                  <label>Enter OTP</label>
                  <input placeholder="6-digit OTP" />
                </div>
              </div>

              <button className="mom-btn-primary mom-full">
                Verify & Finish
              </button>
            </>
          )}
        </div>

        {/* FOOTER */}
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

        <p className="mom-auth-note">
          We’ll ask you to verify identity via OTP. Data submitted securely.
        </p>
      </div>
    </div>
  );
}
