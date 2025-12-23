import React, { useState } from "react";
import MomDishManager from "../components/MomDishManager";
import "./mom-dashboard.css";


export default function MomDashboard() {
  const [orders, setOrders] = useState([]);
  const [showDishModal, setShowDishModal] = useState(false);

  const [dishes, setDishes] = useState(
    JSON.parse(localStorage.getItem("momDishes")) || []
  );

  return (
    <div className="mom-dashboard-container">

      {/* NAVIGATION */}
      <nav className="mom-dashboard-nav">
        <ul>
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Earnings</li>
          <li>Profile</li>
          <li onClick={() => window.location.href = "/logout"}>Logout</li>
        </ul>
      </nav>

      {/* WELCOME */}
      <h1 className="mom-welcome">Welcome back, Mom 👩‍🍳</h1>

      {/* STATS */}
      <div className="mom-stats-grid">
        <div className="stat-card">
          <h2>₹0</h2>
          <p>Total Earnings</p>
        </div>
        <div className="stat-card">
          <h2>0</h2>
          <p>Active Orders</p>
        </div>
        <div className="stat-card">
          <h2>0</h2>
          <p>Completed Orders</p>
        </div>
        <div className="stat-card">
          <h2>{dishes.length}</h2>
          <p>Dishes Listed</p>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <h3 className="recent-orders-title">Recent Orders</h3>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders yet 🍽️</p>
          <span>
            When customers place orders, they will appear here.
          </span>
        </div>
      ) : (
        <table className="recent-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Dish</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.dish}</td>
                <td>{order.status}</td>
                <td>₹{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ACTION BUTTONS */}
      <div className="mom-actions">
        <button
          className="action-btn primary"
          onClick={() => setShowDishModal(true)}
        >
          ➕ Add Dish
        </button>
        <button className="action-btn">Manage Orders</button>
        <button className="action-btn">View Earnings</button>
      </div>

      {/* ADD DISH MODAL */}
      {showDishModal && (
        <div className="mom-auth-overlay">
          <div className="mom-auth-modal">
            <div className="mom-auth-header">
              <h2>Add Dish</h2>
              <button
                className="mom-auth-close"
                onClick={() => {
                  localStorage.setItem(
                    "momDishes",
                    JSON.stringify(dishes)
                  );
                  setShowDishModal(false);
                }}
              >
                ✕
              </button>
            </div>

            <MomDishManager
              dishes={dishes}
              setDishes={setDishes}
            />
          </div>
        </div>
      )}
    </div>
  );
}
