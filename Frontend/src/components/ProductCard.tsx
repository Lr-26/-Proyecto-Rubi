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
            className={`group relative overflow-hidden cursor-pointer ${isPremium ? 'rounded-lg border border-white/5 bg-neutral-900/50 backdrop-blur-sm' : 'rounded-2xl shadow-premium bg-white'} h-full flex flex-col transition-all duration-500 hover:-translate-y-1`}
        >
            <div className={`relative overflow-hidden ${isPremium ? 'aspect-square' : 'h-64'} bg-neutral-100`}>
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Stock Badge */}
                {stockStatus !== 'in_stock' && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className={`text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest backdrop-blur-md rounded-full ${stockStatus === 'out_of_stock' ? 'bg-black/80 text-white' : 'bg-premium-gold/90 text-premium-dark'
                            }`}>
                            {stockStatus === 'out_of_stock' ? 'Agotado' : '⚡ Stock Limitado'}
                        </span>
                    </div>
                )}

                <div className={`absolute inset-0 transition-opacity duration-700 ${isPremium ? 'bg-black/10 group-hover:bg-black/30' : 'bg-black/0 group-hover:bg-black/10'}`} />

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={handleConsult}
                        className={`w-full py-2.5 font-medium tracking-[0.15em] text-[9px] uppercase shadow-2xl transition-all duration-300 rounded-full ${isPremium
                            ? 'bg-white text-black hover:bg-premium-gold'
                            : 'bg-premium-dark text-white hover:bg-premium-gold'
                            }`}
                    >
                        Consultar
                    </button>
                </div>
            </div>

            <div className={`p-4 text-center flex-grow flex flex-col justify-between ${isPremium ? '' : ''}`}>
                <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] block mb-2 text-premium-gold/80">
                        {category}
                    </span>
                    <h3 className={`font-serif text-lg mb-1 transition-colors duration-300 line-clamp-1 ${isPremium ? 'text-white' : 'text-premium-dark'}`}>
                        {title}
                    </h3>
                    <p className={`text-[11px] mb-4 line-clamp-2 font-light leading-snug px-1 ${isPremium ? 'text-gray-400' : 'text-gray-500'}`}>
                        {description}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <span className={`text-xl font-serif italic ${isPremium ? 'text-premium-gold' : 'text-premium-dark'}`}>
                        {price}
                    </span>
                    <div className={`w-6 h-[0.5px] ${isPremium ? 'bg-premium-gold/20' : 'bg-premium-dark/10'}`} />
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
