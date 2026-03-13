import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, images, description, category, brand, variant = 'default', stockStatus = 'in_stock', onClick }) => {
    const isPremium = variant === 'premium';
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = images && images.length > 0 ? images : [image];
    const hasMultipleImages = galleryImages.length > 1;

    const isLongDescription = description && description.length > 80;

    const openWhatsApp = (e: React.MouseEvent) => {
        e.stopPropagation();
        const phoneNumber = "549381449040";
        const message = `Hola! Me interesa el producto "${title}" (${price}) de la categoría ${category}. ¿Tienen stock?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
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
            onClick={onClick}
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
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

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

            <div className="p-4 flex-grow flex flex-col justify-between">
                <div className="text-center">
                    <div className="flex flex-col items-center mb-1">
                        {brand && (
                            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5 ${isPremium ? 'text-white/40' : 'text-gray-400'}`}>
                                {brand}
                            </span>
                        )}
                        <span className={`text-[8px] font-medium uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border ${isPremium ? 'text-premium-gold border-premium-gold/30 bg-premium-gold/5' : 'text-gray-500 border-gray-200'
                            }`}>
                            {category}
                        </span>
                    </div>
                    <h3 className={`font-serif text-base md:text-lg mb-1 line-clamp-1 ${isPremium ? 'text-white' : 'text-premium-dark'}`}>
                        {title}
                    </h3>
                    <div className="mb-2">
                        <p className={`text-[10px] sm:text-xs font-light leading-relaxed line-clamp-2 ${isPremium ? 'text-gray-400' : 'text-gray-500'}`}>
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-auto pt-3 border-t border-gray-500/5">
                    <button
                        onClick={openWhatsApp}
                        className={`w-full py-2.5 rounded-lg text-[9px] font-bold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                            isPremium
                                ? 'bg-gradient-to-r from-premium-gold to-[#b38b45] text-white'
                                : 'bg-premium-dark text-white hover:bg-premium-gold'
                        }`}
                    >
                        <span className="relative z-10">CONSULTAR</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
