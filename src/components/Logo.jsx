import React from "react";
import logo from "../assets/logo.png";

export default function Logo({ compact }) {
  return (
    <a
      href="/"
      className={`logo-container ${compact ? "compact" : ""}`}
      aria-label="Mom Cloud Kitchen"
    >
      <img
        src={logo}
        alt="Mom Cloud Kitchen Logo"
        className="logo-image"
      />

      <span className="logo-title">Mom’s Cloud Kitchen</span>
    </a>
  );
}
