import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { getProducts, Product, ProductData } from '../data/products';

// ... (categories array stays same)
const categories = [
    {
        id: 'carteras',
        label: 'Carteras de Lujo',
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        description: "Descubre nuestra colección exclusiva de bolsos y carteras."
    },
    {
        id: 'lentesSol',
        label: 'Lentes de Sol',
        image: "https://images.unsplash.com/photo-1572635196184-84e35138cf62?q=80&w=800&auto=format&fit=crop",
        description: "Protección y estilo para tus días más soleados."
    },
    {
        id: 'lentesCristal',
        label: 'Lentes de Cristal',
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop",
        description: "Claridad visual con monturas de diseño premium."
    },
    {
        id: 'ropaDeportiva',
        label: 'Ropa Deportiva',
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
        description: "Rendimiento y confort para tu estilo de vida activo."
    },
];

const subSections: Record<string, string> = {
    premium: "Colección Premium",
    plus: "Línea Plus",
    standard: "Estándar",
    hombre: "Hombre",
    mujer: "Mujer",
    accesorios: "Accesorios"
};

import AuthModal from './AuthModal';

// ... (existing imports, but removed repeating imports if any)

const Catalog = () => {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productsData, setProductsData] = useState<ProductData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Auth State
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

    // Check if user is already logged in
    const isUserLoggedIn = () => {
        return !!localStorage.getItem('rubi_user');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProductsData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Search Logic
    const getAllProducts = () => {
        if (!productsData) return [];
        let all: Product[] = [];

        // Iterate over the known keys of ProductData
        Object.values(productsData).forEach((cat) => {
            // Each 'cat' is an object of subcategories (premium, plus, standard, etc)
            // We need to iterate over its values which are Product[]
            if (typeof cat === 'object' && cat !== null) {
                Object.values(cat).forEach((subList) => {
                    if (Array.isArray(subList)) {
                        all = [...all, ...subList];
                    }
                });
            }
        });
        return all;
    };

    const filteredProducts = searchTerm
        ? getAllProducts().filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
        setTimeout(() => {
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleBackClick = () => {
        setActiveCategory(null);
    };

    const activeContent = (activeCategory && productsData) ? productsData[activeCategory] : null;

    const handleProductClick = (product: Product) => {
        if (isUserLoggedIn()) {
            setSelectedProduct(product);
        } else {
            setPendingProduct(product);
            setIsAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        // User just registered
        if (pendingProduct) {
            setSelectedProduct(pendingProduct);
            setPendingProduct(null);
        }
    };

    // ... (rest of component logic)

    return (
        <section className="py-12 bg-neutral-50 min-h-screen" id="catalogo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search Bar */}
                {/* ... (search bar logic same as before) ... */}
                {/* (I must be careful not to delete the search bar code. I will include the full return block if needed or just splice carefully) */}
                {/* To avoid deleting code, I will use Targeted Replace properly. But since I need to replace onClick everywhere, it might be better to replace the whole file content OR be very specific with chunks. 
                    Given the file size, I'll replace the relevant parts.
                */}

                <div className="mb-12 relative max-w-md mx-auto">
                    {/* ... Search Input ... */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar en la colección..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-premium-gold/50 focus:border-premium-gold outline-none transition-all placeholder-gray-400 font-light tracking-wide text-gray-800"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Loader2 size={20} className={`animate-spin ${loading ? 'opacity-100' : 'opacity-0 hidden'}`} />
                            {!loading && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            )}
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        )}
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    {searchTerm ? (
                        <motion.div
                            key="search-results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="min-h-[50vh]"
                        >
                            <h3 className="text-2xl font-serif text-premium-dark mb-8 text-center">
                                {filteredProducts.length > 0
                                    ? `Resultados para "${searchTerm}"`
                                    : `No encontramos "${searchTerm}"`
                                }
                            </h3>

                            {filteredProducts.length > 0 ? (
                                <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto">
                                    {filteredProducts.map((item) => (
                                        <ProductCard
                                            key={item.id}
                                            {...item}
                                            variant="default" // Use default variant for search results to be uniform
                                            onClick={() => handleProductClick(item)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 opacity-50">
                                    <p className="text-lg font-light">Intenta con otra búsqueda.</p>
                                </div>
                            )}
                        </motion.div>
                    ) : !activeCategory ? (
                        <motion.div
                            key="category-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {categories.map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="group relative h-[500px] overflow-hidden cursor-pointer shadow-2xl bg-black"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                        style={{ backgroundImage: `url(${cat.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                    <div className="absolute inset-4 border border-white/0 group-hover:border-white/30 transition-colors duration-700 scale-95 group-hover:scale-100 ease-out" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        <span className="text-premium-gold text-xs tracking-[0.3em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            COLECCIÓN EXCLUSIVA
                                        </span>
                                        <h3 className="font-serif text-5xl text-white mb-4 drop-shadow-2xl tracking-tighter">
                                            {cat.label}
                                        </h3>
                                        <p className="text-gray-200 text-sm max-w-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-4 group-hover:translate-y-0 px-4">
                                            {cat.description}
                                        </p>
                                        <div className="mt-8 h-[1px] w-12 bg-premium-gold/0 group-hover:bg-premium-gold transition-colors duration-500 delay-300" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="product-detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="mb-10 flex items-center justify-between">
                                <button
                                    onClick={handleBackClick}
                                    className="flex items-center space-x-2 text-premium-dark hover:text-premium-ruby transition-colors group"
                                >
                                    <div className="p-2 rounded-full bg-white shadow-md group-hover:shadow-lg transition-shadow">
                                        <ArrowLeft size={20} />
                                    </div>
                                    <span className="font-medium text-lg tracking-wide">Volver a Colecciones</span>
                                </button>
                                <h2 className="font-serif text-3xl text-premium-dark hidden md:block">
                                    {categories.find(c => c.id === activeCategory)?.label}
                                </h2>
                            </div>

                            <h2 className="font-serif text-3xl text-premium-dark mb-10 text-center md:hidden">
                                {categories.find(c => c.id === activeCategory)?.label}
                            </h2>

                            {activeContent && Object.entries(activeContent).map(([subKey, items]) => {
                                const overlineMap: Record<string, string> = {
                                    premium: "SIGNATURE SERIES",
                                    plus: "MODERN LUXURY",
                                    standard: "TIMELESS ESSENTIALS",
                                    hombre: "RUBI MEN",
                                    mujer: "RUBI WOMEN",
                                    accesorios: "EXCLUSIVE DETAILS"
                                };
                                const overline = overlineMap[subKey] || "RUBI COLLECTION";

                                return (
                                    <div key={subKey} className="relative py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-20 bg-neutral-900 last:mb-0">
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-premium-gold/50 to-transparent" />
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-premium-gold/50 to-transparent" />
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="text-center mb-12"
                                        >
                                            <span className="text-premium-gold text-sm tracking-[0.4em] uppercase mb-4 block">
                                                {overline}
                                            </span>
                                            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">
                                                {subSections[subKey] || subKey}
                                            </h3>
                                            <div className="w-24 h-1 bg-premium-gold mx-auto" />
                                        </motion.div>

                                        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto">
                                            {(items as Product[]).map((item) => (
                                                <ProductCard
                                                    key={item.id}
                                                    {...item}
                                                    category={subSections[subKey] || subKey}
                                                    variant="premium"
                                                    onClick={() => handleProductClick(item)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Quick View Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Auth Modal (Lead Capture) */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
            />
        </section>
    );
};

export default Catalog;
