import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Colecciones from './pages/Colecciones';
import Contacto from './pages/Contacto';
import AdminDashboard from './pages/AdminDashboard';
import Lentes from './pages/Lentes';
import Carteras from './pages/Carteras';
import Billeteras from './pages/Billeteras';
import SeedDatabase from './components/SeedDatabase';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('rubi_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // No auto-show anymore, user wants it to be triggered by actions
      // setShowAuth(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => setShowAuth(true);
    window.addEventListener('openAuth', handleOpenAuth);
    return () => window.removeEventListener('openAuth', handleOpenAuth);
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setShowAuth(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-premium-cream text-premium-dark selection:bg-premium-gold selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/colecciones" element={<Colecciones />} />
            <Route path="/lentes" element={<Lentes />} />
            <Route path="/carteras" element={<Carteras />} />
            <Route path="/billeteras" element={<Billeteras />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/seed" element={<SeedDatabase />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        
        {/* Global Auth Gate */}
        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />

        {/* Removed fixed overlay to allow navigation */}
      </div>
    </Router>
  );
}

export default App;
