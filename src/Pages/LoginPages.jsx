import React from "react";
import "../login.css"; // stylesheet we will create next

export default function LoginPage() {
  return (
    <div className="login-container">

      <div className="login-left">
        <img 
          src="https://manideep79810.github.io/Moms_cloud_kitchen/imglogin.png"
          alt="Login Illustration"
          className="login-illustration"
        />
      </div>

      <div className="login-right">
        <div className="login-box">

          <h1 className="login-title">Login</h1>

          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter Username" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>

          <button className="login-btn">Submit</button>
        </div>
      </div>

    </div>
  );
}
