import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./Pages/About";
import HelpSupport from "./Pages/HelpSupport";
import Explore from "./Pages/Explore";
import Logout from "./components/Logout";


/* DASHBOARDS */
import MomDashboard from "./Pages/MomDashboard";
import CustomerDashboard from "./Pages/CustomerDashboard";

/* ROUTE PROTECTION */
import ProtectedRoute from "./components/ProtectedRoute";
import Adddish from "./components/MomDishManager";

function Layout() {
  const location = useLocation();

  // Compact header only for explore
  const compact = location.pathname === "/explore";

  // Hide header on dashboards (optional but recommended)
  const hideHeader =
    location.pathname === "/mom-dashboard" ||
    location.pathname === "/customer-dashboard";

  return (
    <>
      {!hideHeader && <Header compact={compact} />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/logout" element={<Logout />} />


        {/* 👩‍🍳 MOM DASHBOARD (PROTECTED) */}
        <Route
          path="/mom-dashboard"
          element={
            <ProtectedRoute role="mom">
              <MomDashboard />
              
            </ProtectedRoute>
          }
        />
         <Route path="/adddish" element={<Adddish />} />

        {/* 👤 CUSTOMER DASHBOARD (PROTECTED) */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
