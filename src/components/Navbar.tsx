import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
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
        <>
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

                                <button 
                                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`relative group py-2 text-sm font-medium tracking-widest transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    CONTACTO
                                    <span className="absolute bottom-1 left-0 w-full h-[1px] bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </button>
                                
                                {/* Auth Status */}
                                <AuthStatus scrolled={scrolled} />

                            </div>
                        </div>

                        {/* Mobile menu button (Updated to Arrow) */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center justify-center p-2 rounded-full text-premium-gold hover:text-white bg-white/5 border border-white/10 focus:outline-none transition-all hover:scale-110 active:scale-95"
                                title="Abrir Menú"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar System */}
            <div className="lg:hidden">
                {/* Activation Edge (Hover Area) */}
                <div 
                    onMouseEnter={() => setIsOpen(true)}
                    onClick={() => setIsOpen(true)}
                    className="fixed top-0 right-0 w-6 h-screen z-[60] cursor-pointer"
                />

                {/* Sidebar Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[70]"
                            />
                            
                            <motion.div
                                initial={{ x: '100%', opacity: 0.5 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '100%', opacity: 0.5 }}
                                transition={{ type: 'spring', damping: 22, stiffness: 150 }}
                                className="fixed top-2 right-2 bottom-2 w-[85%] sm:w-85 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border-l border-y border-white/10 z-[80] shadow-[-25px_0_80px_-20px_rgba(212,175,55,0.3)] rounded-l-[3rem] overflow-hidden flex flex-col"
                            >
                                {/* Premium Light Effect (Top Glow) */}
                                <div className="absolute top-0 right-0 w-full h-64 bg-premium-gold/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-full h-64 bg-premium-ruby/5 blur-[100px] pointer-events-none rounded-full translate-y-1/2 -translate-x-1/2" />

                                {/* Header with Close Button */}
                                <div className="p-8 flex items-center justify-between border-b border-white/5 relative z-10">
                                    <div className="font-serif text-2xl tracking-[0.25em] text-white">
                                        <span className="text-premium-ruby">RUBI</span>
                                    </div>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="p-3 rounded-full bg-white/5 text-premium-gold border border-white/10 hover:bg-premium-gold hover:text-premium-dark hover:border-transparent transition-all shadow-xl active:scale-90"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>

                                <div className="flex-grow overflow-y-auto px-8 py-12 space-y-12 relative z-10">
                                    {/* User Section */}
                                    {!user ? (
                                        <button
                                            onClick={() => { handleLoginClick(); setIsOpen(false); }}
                                            className="w-full group relative flex items-center justify-between px-7 py-6 rounded-[1.5rem] text-xs font-bold tracking-[0.3em] text-premium-dark bg-gradient-to-r from-premium-gold to-[#e5c06d] transition-all shadow-[0_10px_30px_-5px_rgba(212,175,55,0.4)]"
                                        >
                                            <span className="relative z-10 group-hover:translate-x-1 transition-transform uppercase">INICIAR SESIÓN</span>
                                            <User size={20} className="relative z-10" />
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-4 py-6 bg-white/5 text-premium-ruby rounded-2xl border border-premium-ruby/20 hover:bg-premium-ruby hover:text-white hover:border-transparent transition-all text-sm font-black tracking-[0.3em] shadow-xl"
                                        >
                                            CERRAR SESIÓN
                                            <LogOut size={20} />
                                        </button>
                                    )}

                                    {/* Navigation Links */}
                                    <div className="space-y-6">
                                        <MobileNavLink to="/" text="INICIO" onClick={() => setIsOpen(false)} />
                                        <MobileNavLink to="/colecciones" text="COLECCIONES" onClick={() => setIsOpen(false)} />
                                        
                                        <div className="pt-8">
                                            <button 
                                                onClick={() => { setIsOpen(false); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }} 
                                                className="w-full group relative flex items-center justify-between px-10 py-7 rounded-[2rem] bg-premium-dark text-white border border-premium-gold/40 hover:border-premium-gold transition-all shadow-2xl overflow-hidden"
                                            >
                                                <span className="relative z-10 text-xs font-black tracking-[0.5em] uppercase">CONTACTO</span>
                                                <ChevronRight size={22} className="text-premium-gold group-hover:translate-x-2 transition-transform" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-premium-gold/15 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer of Sidebar */}
                                <div className="p-10 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-10">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-[1px] bg-premium-gold/40" />
                                        <p className="text-[10px] text-gray-500 tracking-[0.6em] font-black uppercase text-center">
                                            Handcrafted Excellence &copy; {new Date().getFullYear()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
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
    <Link to={to} onClick={onClick} className="flex items-center justify-between group px-8 py-7 rounded-[1.5rem] text-xl font-serif tracking-widest text-white/90 hover:text-white hover:bg-white/[0.05] transition-all border border-transparent hover:border-white/10 shadow-lg bg-white/[0.01]">
        <span className="group-hover:translate-x-3 transition-transform duration-500 font-medium">{text}</span>
        <ChevronRight size={20} className="text-premium-gold/50 group-hover:text-premium-gold transition-colors" />
    </Link>
);

export default Navbar;
