import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';

// Common Components (Loaded immediately)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';
import WelcomeModal from './components/WelcomeModal';

// Lazy Loaded Pages (Optimized Performance)
const Home = lazy(() => import('./pages/Home'));
const Colecciones = lazy(() => import('./pages/Colecciones'));
const Contacto = lazy(() => import('./pages/Contacto'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Lentes = lazy(() => import('./pages/Lentes'));
const Carteras = lazy(() => import('./pages/Carteras'));
const Billeteras = lazy(() => import('./pages/Billeteras'));

// Loading Fallback (Premium Feel)
const PageLoader = () => (
  <div className="fixed inset-0 bg-premium-dark flex items-center justify-center z-[100]">
    <div className="flex flex-col items-center gap-6">
      <div className="w-12 h-12 border-2 border-premium-gold/20 border-t-premium-gold rounded-full animate-spin" />
      <p className="text-premium-gold text-[10px] tracking-[0.5em] font-black uppercase font-sans animate-pulse">RUBI LENTES</p>
    </div>
  </div>
);

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('rubi_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => setShowAuth(true);
    const handleAuthUpdate = () => {
      const savedUser = localStorage.getItem('rubi_user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    window.addEventListener('openAuth', handleOpenAuth);
    window.addEventListener('authChange', handleAuthUpdate);
    
    return () => {
      window.removeEventListener('openAuth', handleOpenAuth);
      window.removeEventListener('authChange', handleAuthUpdate);
    };
  }, []);

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setShowWelcome(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-premium-cream text-premium-dark selection:bg-premium-gold selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/colecciones" element={<Colecciones />} />
              <Route path="/lentes" element={<Lentes />} />
              <Route path="/carteras" element={<Carteras />} />
              <Route path="/billeteras" element={<Billeteras />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        
        <AuthModal 
          isOpen={showAuth} 
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />

        <WelcomeModal 
          user={user} 
          isOpen={showWelcome} 
          onClose={() => setShowWelcome(false)} 
        />
      </div>
    </Router>
  );
}

export default App;
