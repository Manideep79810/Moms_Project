import React, { useState } from "react";
import Logo from "./Logo";

export default function Header({ compact }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`header ${compact ? "compact" : ""}`}>

      {/* Left Side: Logo */}
      <div className="header-left">
        <Logo compact={compact} />
      </div>

      {/* Right Side: Navbar */}
      <div className="navbar-right">
        <nav className="nav-desktop">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/help">Help & Support</a></li>
          </ul>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Toggle Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      <nav className={`nav-mobile ${open ? "open" : ""}`}>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/help">Help & Support</a></li>
        </ul>
      </nav>

    </header>
  );
}
