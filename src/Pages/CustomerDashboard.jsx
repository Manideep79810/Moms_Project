import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/explore");
  };

  return (
    <div className="customer-dashboard-container">

      {/* HEADER */}
      <div className="customer-header">
        <h1>Welcome 👋</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="customer-stats-grid">
        <div className="stat-card">
          <h2>0</h2>
          <p>Orders Placed</p>
        </div>
        <div className="stat-card">
          <h2>₹0</h2>
          <p>Total Spent</p>
        </div>
        <div className="stat-card">
          <h2>0</h2>
          <p>Favorite Kitchens</p>
        </div>
      </div>

      {/* ORDERS */}
      <h3 className="section-title">My Orders</h3>

      <div className="empty-orders">
        <p>No orders yet 🍽️</p>
        <span>Start exploring nearby mom kitchens.</span>

        <button
          className="primary-btn"
          onClick={() => navigate("/explore")}
        >
          Browse Kitchens
        </button>
      </div>
    </div>
  );
}
