import React, { useState } from "react";
import "../explore.css";
import CustomerLogin from "../auth/CustomerLogin";
import MomLogin from "../auth/MomLogin";

export default function Explore() {
  const [showCustomerLogin, setShowCustomerLogin] = useState(false);
  const [showMomLogin, setShowMomLogin] = useState(false);

  return (
    <>
      {/* ---------------- EXPLORE PAGE ---------------- */}
      <div className="explore-page">
        <div className="explore-container">

          <div className="cards-row">

            {/* ---------------- MOM CARD ---------------- */}
            <div className="explore-card">
              <h2>Be a Mom’s Cloud Kitchen</h2>
              <p>
                Turn your home cooking into income. Guided onboarding,
                dish creator, menu management, and kitchen capacity setup.
              </p>
              <p className="card-bullets">
                Multi-step onboarding • Menu builder • Add dishes • Set hours
              </p>
              <a
                href="#"
                className="explore-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCustomerLogin(false);
                  setShowMomLogin(true);
                }}
              >
                I'm a Mom →
              </a>
            </div>

            {/* ---------------- CUSTOMER CARD ---------------- */}
            <div className="explore-card">
              <h2>Be a Customer</h2>
              <p>
                Order fresh homemade meals prepared by moms near you.
                Fast onboarding, saved address, and personalized suggestions.
              </p>
              <p className="card-bullets">
                Quick signup • Easy ordering • Save favorites
              </p>
              <a
                href="#"
                className="explore-link"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMomLogin(false);
                  setShowCustomerLogin(true);
                }}
              >
                I'm a Customer →
              </a>
            </div>

          </div>

          {/* ---------------- WHY JOIN ---------------- */}
          <div className="why-join">
            <h3>Why Join?</h3>
            <ul>
              <li>Moms: Turn passion into income with zero investment</li>
              <li>Customers: Enjoy healthy homemade meals every day</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ---------------- CUSTOMER LOGIN MODAL ---------------- */}
      {showCustomerLogin && (
        <CustomerLogin
          onClose={() => setShowCustomerLogin(false)}
          onSwitchToMom={() => {
            setShowCustomerLogin(false);
            setShowMomLogin(true);
          }}
        />
      )}

      {/* ---------------- MOM LOGIN MODAL ---------------- */}
      {showMomLogin && (
        <MomLogin
          onClose={() => setShowMomLogin(false)}
          onSwitchToCustomer={() => {
            setShowMomLogin(false);
            setShowCustomerLogin(true);
          }}
        />
      )}
    </>
  );
}
