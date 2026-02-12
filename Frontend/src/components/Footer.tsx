
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-premium-dark text-premium-cream border-t border-premium-gold/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-serif text-xl text-premium-ruby mb-4">RUBI DETAILS</h3>
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            Elevando tu estilo con accesorios premium que conectan con tu esencia.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center">
                        <h4 className="font-serif text-lg mb-4">Enlaces</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/carteras" className="hover:text-premium-ruby transition-colors">Carteras</Link></li>
                            <li><Link to="/lentes-sol" className="hover:text-premium-ruby transition-colors">Lentes de Sol</Link></li>
                            <li><Link to="/lentes-cristal" className="hover:text-premium-ruby transition-colors">Lentes de Cristal</Link></li>
                            <li><Link to="/contacto" className="hover:text-premium-ruby transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="font-serif text-lg mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/rubi_lentesde_sol?igsh=MXRtejhuZG85dnZh" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-premium-ruby transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-premium-ruby transition-colors"><Facebook size={20} /></a>
                            <a href="mailto:contacto@rubidetails.com" className="text-gray-400 hover:text-premium-ruby transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Rubi Details. Todos los derechos reservados.
                    <span className="mx-2">|</span>
                    <a href="/admin" className="hover:text-premium-ruby transition-colors">Admin</a>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
