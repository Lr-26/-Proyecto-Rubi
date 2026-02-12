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
            // ... (existing props)
            onClick={onClick}
            className={`group relative overflow-hidden cursor-pointer ${isPremium ? 'rounded-none' : 'rounded-xl shadow-lg'} h-full flex flex-col ${stockStatus === 'out_of_stock' ? 'opacity-75 grayscale-[0.5]' : ''}`}
        >
            <div className={`relative overflow-hidden ${isPremium ? 'aspect-[4/5]' : 'h-96'} bg-gray-200`}>
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Stock Badge */}
                {stockStatus !== 'in_stock' && (
                    <div className="absolute top-4 right-4 z-10">
                        {stockStatus === 'out_of_stock' && (
                            <span className="bg-black/80 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest backdrop-blur-sm">
                                Agotado
                            </span>
                        )}
                        {stockStatus === 'low_stock' && (
                            <span className="bg-premium-gold/90 text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest backdrop-blur-sm">
                                ⚠️ Stock Limitado
                            </span>
                        )}
                    </div>
                )}

                <div className={`absolute inset-0 transition-colors duration-300 ${isPremium ? 'bg-black/20 group-hover:bg-black/40' : 'bg-black/0 group-hover:bg-black/20'}`} />

                {/* Overlay Button */}
                <div className="absolute inset-x-0 bottom-8 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button
                        onClick={handleConsult}
                        className={`px-6 py-2 font-medium tracking-widest text-xs shadow-xl transition-colors duration-300 ${isPremium
                            ? 'bg-premium-gold text-black hover:bg-white'
                            : 'bg-premium-dark text-white hover:bg-premium-gold hover:text-black'
                            }`}
                    >
                        CONSULTAR
                    </button>
                </div>
            </div>

            <div className={`p-5 text-center flex-grow flex flex-col justify-between ${isPremium ? 'bg-neutral-900 border-x border-b border-premium-gold/20' : 'bg-white'}`}>
                <div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-2 ${isPremium ? 'text-premium-gold' : 'text-premium-gold'}`}>
                        {category}
                    </span>
                    <h3 className={`font-serif text-lg mb-2 transition-colors duration-300 line-clamp-1 ${isPremium ? 'text-white group-hover:text-premium-gold' : 'text-premium-dark group-hover:text-premium-gold'}`}>
                        {title}
                    </h3>
                    <p className={`text-xs mb-4 line-clamp-2 font-light leading-relaxed ${isPremium ? 'text-gray-400' : 'text-gray-500'}`}>
                        {description}
                    </p>
                </div>
                <span className={`text-lg font-serif italic border-b pb-1 inline-block mx-auto ${isPremium ? 'text-premium-gold border-premium-gold/50' : 'text-premium-dark border-premium-gold/50'}`}>
                    {price}
                </span>
            </div>
        </motion.div>
    );
};

export default ProductCard;
