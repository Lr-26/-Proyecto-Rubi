import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductCardProps {
    id: string | number;
    title: string;
    price: string;
    image: string;
    description: string;
    category?: string;
    variant?: 'default' | 'premium';
    stockStatus?: Product['stockStatus'];
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, description, category, variant = 'default', stockStatus = 'in_stock', onClick }) => {
    const isPremium = variant === 'premium';

    const handleConsult = (e: React.MouseEvent) => {
        e.stopPropagation();
        // ... rest of logic if needed, or if it was empty, just stop prop.
        const phoneNumber = "549381449040";
        const message = `Hola! Me interesa el producto "${title}" (${price}) de la categoría ${category}. ¿Tienen stock?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
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
                        onClick={handleConsult}
                        className={`w-4/5 py-2 font-medium tracking-[0.2em] text-[9px] uppercase shadow-2xl transition-all duration-300 rounded-full backdrop-blur-md ${isPremium
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
                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] block mb-2 transition-colors duration-300 ${isPremium ? 'text-premium-gold group-hover:text-yellow-400' : 'text-gray-500 group-hover:text-premium-dark'
                        }`}>
                        {category}
                    </span>
                    <h3 className={`font-serif text-lg md:text-xl mb-1.5 transition-colors duration-300 line-clamp-1 ${isPremium ? 'text-white group-hover:text-premium-gold' : 'text-premium-dark'
                        }`}>
                        {title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs mb-3 line-clamp-2 font-light leading-relaxed px-1 sm:px-2 ${isPremium ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'
                        }`}>
                        {description}
                    </p>
                </div>

                <div className="flex flex-col items-center mt-auto pt-3 border-t border-gray-500/10">
                    <button
                        onClick={handleConsult}
                        className={`text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:scale-105 ${isPremium
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-premium-gold via-yellow-200 to-premium-gold hover:from-yellow-200 hover:to-white'
                            : 'text-premium-dark hover:text-premium-gold'
                            }`}
                        title="Consultar por WhatsApp"
                    >
                        CONSULTAR
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
