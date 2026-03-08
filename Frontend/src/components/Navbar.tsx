import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

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
                        <div className="flex items-center space-x-8">
                            <NavLink to="/" text="INICIO" scrolled={scrolled} />
                            <Link to="/colecciones" className={`relative group py-2 text-sm font-medium tracking-widest transition-colors ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
                                }`}>
                                COLECCIONES
                                <span className="absolute bottom-1 left-0 w-full h-[1px] bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                            <Link to="/contacto" className={`
                                transition-all duration-300 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                ${scrolled
                                    ? 'bg-gradient-to-r from-premium-gold to-yellow-600 text-black border border-premium-gold/50'
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
                        <div className="px-4 py-6 space-y-2">
                            <MobileNavLink to="/" text="INICIO" onClick={() => setIsOpen(false)} />
                            <Link to="/colecciones" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium tracking-widest text-gray-300 hover:text-premium-gold hover:bg-white/5 transition-colors">
                                COLECCIONES
                            </Link>
                            <Link to="/contacto" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium tracking-widest text-premium-gold bg-premium-gold/10 hover:bg-premium-gold/20 transition-colors mt-4 text-center border border-premium-gold/20">
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
