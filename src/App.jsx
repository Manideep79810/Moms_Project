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

function Layout() {
  const location = useLocation();
  const compact = location.pathname === "/explore"; // <-- compact header mode

  return (
    <>
      <Header compact={compact} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/explore" element={<Explore />} />
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
