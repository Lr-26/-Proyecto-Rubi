import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
    id: string | number;
    title: string;
    price: string;
    image: string;
    description: string;
    category?: string;
    variant?: 'default' | 'premium';
    brand?: string;
    stockStatus?: Product['stockStatus'];
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, description, category, brand, variant = 'default', stockStatus = 'in_stock', onClick }) => {
    const isPremium = variant === 'premium';
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Determines if description is long enough to need a "read more" button.
    // A simple heuristic based on character length.
    const isLongDescription = description && description.length > 80;

    const openWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        const phoneNumber = "549381449040";
        const message = `Hola! Me interesa el producto "${title}" (${price}) de la categoría ${category}. ¿Tienen stock?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleViewImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsImageOpen(true);
    };

    const closeImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsImageOpen(false);
    };

    const toggleDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <motion.div
                layout
                onClick={onClick}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-500 rounded-2xl ${isPremium
                    ? 'bg-gradient-to-br from-neutral-900 via-[#1a1a1a] to-black border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.6)] hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)]'
                    : 'bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-gray-200/50'
                    }`}
            >
                {/* Glossy reflection effect for premium cards */}
                {isPremium && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 transform -translate-x-full group-hover:translate-x-full z-20 pointer-events-none" style={{ transition: 'transform 1.5s ease-in-out, opacity 0.5s' }} />
                )}

                <div className={`relative overflow-hidden ${isPremium ? 'aspect-[4/3] sm:aspect-[3/2]' : 'h-48 sm:h-56'} w-full bg-neutral-100`}>
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />

                    {/* Gradient Overlay for Image */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ${isPremium
                        ? 'bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60'
                        : 'bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40'
                        }`} />

                    {/* Stock Badge */}
                    {stockStatus !== 'in_stock' && (
                        <div className="absolute top-3 right-3 z-20">
                            <span className={`text-[9px] font-bold px-2 py-1 uppercase tracking-widest backdrop-blur-md rounded-full shadow-lg ${stockStatus === 'out_of_stock'
                                ? 'bg-black/90 text-white border border-white/20'
                                : 'bg-gradient-to-r from-premium-gold to-yellow-600 text-black border border-premium-gold/50'
                                }`}>
                                {stockStatus === 'out_of_stock' ? 'Agotado' : '🔥 Limitado'}
                            </span>
                        </div>
                    )}

                    {/* Quick Action Button */}
                    <div className="absolute inset-x-0 bottom-4 p-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                        <button
                            onClick={handleViewImage}
                            className={`w-4/5 py-2 font-medium tracking-[0.2em] text-[9px] uppercase shadow-2xl transition-all duration-300 rounded-full backdrop-blur-md flex items-center justify-center gap-2 ${isPremium
                                ? 'bg-white/90 text-black hover:bg-premium-gold hover:text-white border border-white/50'
                                : 'bg-black/90 text-white hover:bg-premium-gold hover:text-black border border-black/50'
                                }`}
                        >
                            Ver Detalles
                        </button>
                    </div>
                </div>

                <div className={`p-4 sm:p-5 flex-grow flex flex-col justify-between relative z-10 ${isPremium ? 'bg-transparent' : 'bg-white'}`}>
                    {/* Subtle top inner shadow for premium */}
                    {isPremium && <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />}

                    <div className="text-center">
                        <div className="flex flex-col items-center mb-2">
                            {brand && (
                                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-1 ${isPremium ? 'text-white/40' : 'text-gray-400'}`}>
                                    {brand}
                                </span>
                            )}
                            <span className={`text-[8px] font-medium uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${isPremium ? 'text-premium-gold border-premium-gold/30 bg-premium-gold/5' : 'text-gray-500 border-gray-200'
                                }`}>
                                {category}
                            </span>
                        </div>
                        <h3 className={`font-serif text-lg md:text-xl mb-1.5 transition-colors duration-300 line-clamp-1 ${isPremium ? 'text-white group-hover:text-premium-gold' : 'text-premium-dark'
                            }`}>
                            {title}
                        </h3>
                        <div className="mb-3 relative">
                        <motion.p 
                            layout="position"
                            className={`text-[10px] sm:text-xs font-light leading-relaxed px-1 sm:px-2 whitespace-pre-line text-left overflow-hidden ${
                                isPremium ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'
                            } ${!isExpanded ? 'line-clamp-2' : ''}`}
                        >
                            {description}
                        </motion.p>
                        
                        {isLongDescription && (
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={toggleDescription}
                                    className={`flex items-center gap-1 text-[9px] uppercase tracking-wider font-medium transition-colors ${
                                        isPremium ? 'text-premium-gold/70 hover:text-premium-gold' : 'text-gray-400 hover:text-premium-dark'
                                    }`}
                                >
                                    {isExpanded ? (
                                        <>Leer menos <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg></>
                                    ) : (
                                        <>Leer más <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg></>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>    
                    </div>

                    <div className="flex flex-col items-center mt-auto pt-3 border-t border-gray-500/10">
                        <button
                            onClick={openWhatsApp}
                            className={`text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:scale-105 flex items-center gap-2 ${isPremium
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-premium-gold via-yellow-200 to-premium-gold hover:from-yellow-200 hover:to-white'
                                : 'text-premium-dark hover:text-premium-gold'
                                }`}
                            title="Consultar por WhatsApp"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={isPremium ? "text-premium-gold" : "text-premium-dark"} stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.06-1.829-.891-3.138-1.921-4.225-3.805-.174-.303.175-.296.757-1.464.098-.198.048-.368-.027-.518-.075-.15-.674-1.62-.924-2.216-.241-.579-.485-.501-.674-.51-.173-.008-.372-.008-.57-.008-.198 0-.52.074-.793.375C6.182 6.892 5 8.01 5 10.233c0 2.223 1.5 4.376 1.7 4.646.202.27 3.1 4.7 7.5 6.6 1.05.45 1.86.72 2.5.92.1.03.2.06.31.09 1.06.34 2.03.29 2.79.18 1.11-.16 2.53-1.03 2.88-2.03.35-1 .35-1.86.25-2.04-.11-.18-.3-.29-.6-.44l-.04-.02Z"/><path d="M12.04 22a9.97 9.97 0 0 1-5.1-1.39l-.36-.21-3.79 1 .99-3.71-.24-.36A10.03 10.03 0 0 1 12.04 2c5.52 0 10 4.49 10 10 0 5.51-4.48 10-10 10Z"/><path d="M12.04 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z"/></svg>
                            CONSULTAR
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Lightbox / Modal de Imagen Completa */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeImage} // Cierra al hacer click fuera
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
                    >
                        {/* Botón de Cierre Esquina */}
                        <button
                            onClick={closeImage}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2"
                        >
                            <X size={28} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.4 }}
                            onClick={(e) => e.stopPropagation()} // Evita cerrar si se hace click en la imagen
                            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 group focus:outline-none"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-contain max-h-[85vh] select-none"
                            />

                            {/* Detalle sutil en el borde inferior */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center">
                                <h4 className="text-white text-xl sm:text-2xl font-serif text-center uppercase tracking-wider shadow-black drop-shadow-md">
                                    {title}
                                </h4>
                                <span className="text-premium-gold/90 text-sm tracking-widest mt-1">
                                    {brand || category}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCard;
