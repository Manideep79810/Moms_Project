import React from "react";

export default function About() {
  return (
    <div className="info-page about-page">
      <div className="info-bg"></div>

      <section className="page-container">
        <h1 className="page-title">About Mom’s Cloud Kitchen</h1>

        <p className="page-description">
          Mom’s Cloud Kitchen is built on one belief — <strong>food made with love tastes better</strong>.
          We serve comforting homemade meals crafted with authentic flavors, fresh ingredients,
          and the warmth you find only in home cooking.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h2>🍲 Our Mission</h2>
            <p>To deliver fresh, healthy, home-style meals to every doorstep with unmatched care.</p>
          </div>

          <div className="about-card">
            <h2>👩‍🍳 Who We Are</h2>
            <p>A passionate team of home chefs committed to preserving the taste of tradition.</p>
          </div>

          <div className="about-card">
            <h2>🚀 Our Vision</h2>
            <p>To become India’s most trusted homemade food delivery experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
