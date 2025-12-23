import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  const isVerified = localStorage.getItem("isVerified");

  if (userRole !== role || isVerified !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
}
