import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-premium-dark/95 backdrop-blur-sm text-premium-cream border-b border-premium-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 font-serif text-2xl tracking-[0.2em] text-white hover:text-premium-gold transition-all duration-500 group flex items-center gap-3">
                        <span className="text-premium-ruby group-hover:text-premium-gold transition-colors">RUBI</span>
                        <span className="text-gray-400 text-[10px] tracking-[0.4em] font-sans font-light group-hover:text-white transition-colors">DETAILS</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <NavLink to="/" text="INICIO" />
                            <Link to="/colecciones" className="relative group px-2 py-2 rounded-md text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-colors">
                                COLECCIONES
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                            <Link to="/contacto" className="bg-premium-ruby text-white hover:bg-premium-gold hover:text-premium-dark transition-all duration-300 px-5 py-2 rounded-sm text-sm font-bold tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5">CONTACTO</Link>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-premium-gold hover:text-white focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden bg-premium-dark border-t border-premium-gold/20 overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <MobileNavLink to="/" text="INICIO" onClick={() => setIsOpen(false)} />
                        <Link to="/colecciones" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-premium-gold hover:bg-white/5 transition-colors">
                            COLECCIONES
                        </Link>
                        <Link to="/contacto" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-premium-ruby hover:text-premium-gold transition-colors">CONTACTO</Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

const NavLink = ({ to, text }: { to: string, text: string }) => (
    <Link to={to} className="relative group px-2 py-2 rounded-md text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-colors">
        {text}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
);

const MobileNavLink = ({ to, text, onClick }: { to: string, text: string, onClick: () => void }) => (
    <Link to={to} onClick={onClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-premium-gold hover:bg-white/5 transition-colors">
        {text}
    </Link>
);

export default Navbar;
