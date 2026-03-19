import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/ContactPage";
// ADMIN
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}

function App() {
  return (
    <>
      <CssBaseline />

      <AuthProvider>
        <Router>
          <LayoutWrapper>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/tour/:id" element={<TourDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<Gallery />} />

              {/* ADMIN */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
