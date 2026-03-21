import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Heart, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    if (!product) return null;

    // Helper to determine stock badge styling
    const getStockBadge = (status: Product['stockStatus']) => {
        switch (status) {
            case 'in_stock':
                return (
                    <span className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full w-fit">
                        <CheckCircle size={14} className="mr-1" /> Disponible
                    </span>
                );
            case 'low_stock':
                return (
                    <span className="flex items-center text-amber-600 text-sm font-medium bg-amber-50 px-3 py-1 rounded-full w-fit">
                        <AlertTriangle size={14} className="mr-1" /> Últimas Unidades
                    </span>
                );
            case 'out_of_stock':
                return (
                    <span className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-3 py-1 rounded-full w-fit">
                        <XCircle size={14} className="mr-1" /> Agotado
                    </span>
                );
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        >
                            {/* Product Image Side */}
                            <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800';
                                        target.onerror = null;
                                    }}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors md:hidden"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Details Side */}
                            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        {getStockBadge(product.stockStatus)}
                                        <h2 className="text-3xl font-serif text-premium-dark mt-2 mb-1">{product.title}</h2>
                                        <p className="text-premium-gold text-xl font-medium">{product.price}</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                                    >
                                        <X size={24} className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="prose prose-sm text-gray-600 mb-8">
                                    <p className="text-lg leading-relaxed">{product.description}</p>

                                    {product.specs && (
                                        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-gray-100 py-6">
                                            {Object.entries(product.specs).map(([key, value]) => (
                                                <div key={key}>
                                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">{key}</span>
                                                    <span className="text-sm font-medium text-premium-dark">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <p className="mt-6 text-sm italic text-gray-500">
                                        Diseño exclusivo de nuestra selección curada. Fabricado bajo los más altos estándares de calidad internacional.
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-auto space-y-4">
                                    <div className="flex space-x-4">
                                        <button
                                            className="flex-1 bg-premium-dark text-white py-3 px-6 rounded-lg font-medium hover:bg-black transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={product.stockStatus === 'out_of_stock'}
                                            onClick={() => {
                                                const user = localStorage.getItem('rubi_user');
                                                if (!user) {
                                                    window.dispatchEvent(new CustomEvent('openAuth'));
                                                    return;
                                                }
                                                const phoneNumber = "5493813358831";
                                                const message = `Hola! Me interesa el producto "${product.title}" (${product.price}). ¿Tienen stock?`;
                                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                                window.open(whatsappUrl, '_blank');
                                            }}
                                        >
                                            <MessageCircle size={20} />
                                            <span>
                                                {product.stockStatus === 'out_of_stock' ? 'No Disponible' : 'Comprar por WhatsApp'}
                                            </span>
                                        </button>
                                        <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-premium-ruby transition-colors">
                                            <Heart size={24} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-center text-gray-400">
                                        Envío gratis a todo el país • Garantía de autenticidad
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
