import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all stored auth/session data
    localStorage.clear();

    // Redirect to login / home page
    navigate("/");
  }, [navigate]);

  return null; // no UI needed
}
