import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [user, setUser] = useState<any>(null);

    // Initial check
    useEffect(() => {
        const savedUser = localStorage.getItem('rubi_user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Listen for auth changes
    useEffect(() => {
        const handleAuthUpdate = () => {
            const savedUser = localStorage.getItem('rubi_user');
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };
        window.addEventListener('authChange', handleAuthUpdate);
        window.addEventListener('storage', handleAuthUpdate); // Sync between tabs
        return () => {
            window.removeEventListener('authChange', handleAuthUpdate);
            window.removeEventListener('storage', handleAuthUpdate);
        };
    }, []);

    const handleLoginClick = () => {
        window.dispatchEvent(new CustomEvent('openAuth'));
    };

    const handleLogout = () => {
        localStorage.removeItem('rubi_user');
        setUser(null);
        window.dispatchEvent(new CustomEvent('authChange'));
    };

    const AuthStatus = ({ scrolled }: { scrolled: boolean }) => {
        if (user) {
            return (
                <div className="flex items-center gap-2 group/user border-r border-white/10 pr-6 mr-4 last:border-0 last:pr-0 last:mr-0">
                    <div className="relative p-2 rounded-full bg-premium-gold/10 border border-premium-gold/20 mr-1">
                        <User size={16} className="text-premium-gold" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-black" />
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 rounded-full text-gray-400 hover:text-premium-ruby transition-all hover:bg-white/5"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            );
        }

        return (
            <button
                onClick={handleLoginClick}
                className={`p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all group ${
                    scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
                }`}
                title="Acceso"
            >
                <User size={18} className="text-premium-gold group-hover:scale-110 transition-transform" />
            </button>
        );
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out flex justify-center ${scrolled ? 'pt-4 px-4' : 'pt-0 px-0'
            }`}>
            <div className={`
                transition-all duration-500 ease-in-out w-full
                ${scrolled
                    ? 'max-w-5xl bg-neutral-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'max-w-full bg-premium-dark/95 backdrop-blur-sm border-b border-premium-gold/20'
                }
            `}>
                <div className={`mx-auto px-6 sm:px-8 transition-all duration-500 flex items-center justify-between ${scrolled ? 'h-16' : 'h-20 max-w-7xl'
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 font-serif text-2xl tracking-[0.2em] text-white hover:text-premium-gold transition-all duration-500 group flex items-center gap-3">
                        <span className="text-premium-ruby group-hover:text-premium-gold transition-colors">RUBI</span>
                        <span className={`text-gray-400 text-[10px] tracking-[0.4em] font-sans font-light group-hover:text-white transition-all duration-500 ${scrolled ? 'hidden sm:block opacity-0 lg:opacity-100' : 'block'
                            }`}>DETAILS</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-10">
                            <NavLink to="/" text="INICIO" scrolled={scrolled} />
                            <Link to="/colecciones" className={`relative group py-2 text-sm font-medium tracking-widest transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
                                }`}>
                                COLECCIONES
                                <span className="absolute bottom-1 left-0 w-full h-[1px] bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                            
                            {/* Auth Status */}
                            <AuthStatus scrolled={scrolled} />

                            <Link to="/contacto" className={`
                                transition-all duration-300 px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transform hover:-translate-y-0.5
                                ${scrolled
                                    ? 'bg-gradient-to-r from-premium-gold to-yellow-600 text-black border border-premium-gold/30'
                                    : 'bg-premium-ruby text-white hover:bg-premium-gold hover:text-premium-dark'
                                }
                            `}>
                                CONTACTO
                            </Link>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-premium-gold hover:text-white focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-[110%] left-4 right-4 sm:left-auto sm:right-8 sm:w-80 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-4">
                            {!user ? (
                                <button
                                    onClick={() => { handleLoginClick(); setIsOpen(false); }}
                                    className="w-full flex items-center justify-between px-6 py-4 rounded-xl text-xs font-bold tracking-[0.2em] text-premium-dark bg-white shadow-xl mb-6"
                                >
                                    <span>ACCESO CLIENTES</span>
                                    <User size={18} className="text-premium-ruby" />
                                </button>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl mb-6 border border-premium-gold/20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-premium-gold/20">
                                            <User size={16} className="text-premium-gold" />
                                        </div>
                                        <span className="text-xs font-medium text-white tracking-widest uppercase">Perfil Activo</span>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-[10px] font-bold text-premium-ruby border border-premium-ruby/20 px-3 py-1.5 rounded-lg hover:bg-premium-ruby/10 transition-colors"
                                    >
                                        SALIR
                                        <LogOut size={14} />
                                    </button>
                                </div>
                            )}

                            <div className="space-y-1">
                                <MobileNavLink to="/" text="INICIO" onClick={() => setIsOpen(false)} />
                                <Link to="/colecciones" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium tracking-widest text-gray-300 hover:text-premium-gold hover:bg-white/5 transition-colors">
                                    COLECCIONES
                                </Link>
                            </div>

                            <Link to="/contacto" onClick={() => setIsOpen(false)} className="block w-full px-4 py-4 rounded-xl text-xs font-bold tracking-[0.2em] text-white bg-premium-ruby hover:bg-premium-gold transition-all mt-8 text-center shadow-lg">
                                CONTACTO
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavLink = ({ to, text, scrolled }: { to: string, text: string, scrolled?: boolean }) => (
    <Link to={to} className={`relative group py-2 text-sm font-medium tracking-widest transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
        }`}>
        {text}
        <span className="absolute bottom-1 left-0 w-full h-[1px] bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
);

const MobileNavLink = ({ to, text, onClick }: { to: string, text: string, onClick: () => void }) => (
    <Link to={to} onClick={onClick} className="block px-4 py-3 rounded-xl text-sm font-medium tracking-widest text-gray-300 hover:text-premium-gold hover:bg-white/5 transition-colors">
        {text}
    </Link>
);

export default Navbar;
