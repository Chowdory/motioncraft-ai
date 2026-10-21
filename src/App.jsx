import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Generator from "./pages/Generator.jsx";
import Library from "./pages/Library.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import { useStore } from "./store.js";

function Navbar() {
  const { state } = useStore();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="logo">▶</span> MotionCraft <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>AI</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/generator">Generator</NavLink>
          <NavLink to="/library">Bibliothek</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profil</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>
        <span className="credits-pill"><b>{state.credits}</b> Credits</span>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site">
      <div className="wrap cols">
        <span>© {new Date().getFullYear()} MotionCraft AI — Demo-Build, die Generierung läuft lokal im Browser.</span>
        <span>Gebaut mit React + Vite · Live auf GitHub Pages</span>
      </div>
    </footer>
  );
}

export default function App() {
  const loc = useLocation();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/library" element={<Library />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      {loc.pathname === "/" || loc.pathname === "/thank-you" ? null : <Footer />}
    </>
  );
}
