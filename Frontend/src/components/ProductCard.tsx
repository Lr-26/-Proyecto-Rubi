import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
    id: string | number;
    title: string;
    price: string;
    image: string;
    images?: string[];
    description: string;
    category?: string;
    variant?: 'default' | 'premium';
    brand?: string;
    stockStatus?: Product['stockStatus'];
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, images, description, category, brand, stockStatus, variant = 'default', onClick }) => {
    const isPremium = variant === 'premium';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = images && images.length > 0 ? images : [image];
    const hasMultipleImages = galleryImages.length > 1;


    const openWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        // Check if user is registered
        const user = localStorage.getItem('rubi_user');
        if (!user) {
            window.dispatchEvent(new CustomEvent('openAuth'));
            return;
        }

        const phoneNumber = "549381449040";
        const message = `Hola! Me interesa el producto "${title}" (${price}) de la categoría ${category}. ¿Tienen stock?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };


    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    return (
        <motion.div
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={`group relative overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 rounded-2xl ${isPremium
                ? 'bg-gradient-to-br from-neutral-900 via-[#1a1a1a] to-black border border-white/10 shadow-xl'
                : 'bg-white border border-gray-100 shadow-lg'
                }`}
        >
            <div className={`relative overflow-hidden ${isPremium ? 'aspect-[4/3]' : 'h-48 sm:h-56'} w-full bg-neutral-100 shrink-0 group/image`}>
                <img
                    src={galleryImages[currentImageIndex]}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 ease-out ${stockStatus === 'out_of_stock' ? 'grayscale-[40%] opacity-80' : ''}`}
                />

                {stockStatus === 'out_of_stock' && (
                    <div className="absolute top-4 right-4 z-40 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[9px] font-bold tracking-[0.3em] border border-white/20 shadow-2xl">
                        VENDIDO
                    </div>
                )}

                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-1 rounded-full bg-black/20 text-white opacity-0 group-hover/image:opacity-100 backdrop-blur-sm hover:bg-black/50 transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-1 rounded-full bg-black/20 text-white opacity-0 group-hover/image:opacity-100 backdrop-blur-sm hover:bg-black/50 transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </>
                )}

                <div className="absolute inset-x-0 bottom-4 p-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                    <div className={`px-4 py-2 font-medium tracking-[0.1em] text-[10px] uppercase shadow-xl rounded-full backdrop-blur-md ${isPremium
                            ? 'bg-white/90 text-black'
                            : 'bg-black/90 text-white'
                            }`}>
                        Ver Detalles
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="text-center">
                    <div className="flex flex-col items-center mb-1.5">
                        {brand && (
                            <span className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-1 ${isPremium ? 'text-premium-gold/80' : 'text-gray-400'}`}>
                                {brand}
                            </span>
                        )}
                        <span className={`text-[9px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${isPremium ? 'text-premium-gold border-premium-gold/30 bg-premium-gold/5' : 'text-premium-dark border-gray-200'
                            }`}>
                            {category}
                        </span>
                    </div>
                    <h3 className={`font-serif text-lg md:text-xl mt-3 mb-2 line-clamp-1 ${isPremium ? 'text-white' : 'text-premium-dark'}`}>
                        {title}
                    </h3>
                    <div className="mb-4">
                        <p className={`text-xs font-light leading-relaxed line-clamp-2 px-2 opacity-80 ${isPremium ? 'text-gray-400' : 'text-gray-500'}`}>
                            {description}
                        </p>
                        <button 
                            className={`text-[10px] font-bold mt-1 tracking-widest hover:underline ${isPremium ? 'text-premium-gold' : 'text-premium-ruby'}`}
                        >
                            VER MÁS
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-auto pt-4 border-t border-gray-500/10">
                    <div className={`text-lg md:text-xl font-serif font-medium mb-4 tracking-tight ${isPremium ? 'text-premium-gold' : 'text-premium-dark'}`}>
                        {price}
                    </div>
                    <button
                        onClick={stockStatus === 'out_of_stock' ? (e) => { e.stopPropagation(); if (onClick) onClick(); } : openWhatsApp}
                        className={`w-full py-3 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden group/btn ${
                            stockStatus === 'out_of_stock'
                                ? 'bg-neutral-200 text-neutral-500 cursor-default'
                                : isPremium
                                    ? 'bg-gradient-to-r from-premium-gold via-[#b38b45] to-premium-gold text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] bg-[length:200%_auto] hover:bg-right'
                                    : 'bg-premium-dark text-white hover:bg-premium-gold shadow-md hover:shadow-xl'
                        }`}
                    >
                        <span className="relative z-10">
                            {stockStatus === 'out_of_stock' ? 'PIEZA VENDIDA / SOLD' : 'CONSULTAR'}
                        </span>
                        {/* Shimmer effect only for in-stock */}
                        {stockStatus !== 'out_of_stock' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
