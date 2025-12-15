import React from "react";

export default function HelpSupport() {
  return (
    <section className="page-container">
      <h1 className="page-title">Help & Support</h1>

      <p className="page-description">
        We're here to assist you with anything related to your orders, delivery,
        payments, or kitchen experience.
      </p>

      <div className="help-grid">
        <div className="help-card">
          <h2>📦 Order Issues</h2>
          <p>Facing delays, incorrect items, or missing meals? Let us know immediately.</p>
        </div>

        <div className="help-card">
          <h2>💳 Payment Support</h2>
          <p>Help with refunds, failed payments, or transaction verification.</p>
        </div>

        <div className="help-card">
          <h2>📞 Contact Us</h2>
          <p>Email: support@momscloudkitchen.com<br/>Phone: +91 8074342650</p>
        </div>
        
      </div>
      
    </section>
  );
}
