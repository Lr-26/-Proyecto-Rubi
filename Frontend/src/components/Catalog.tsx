import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { getProducts, Product, ProductData } from '../data/products';

// ... (categories array stays same)
const categories = [
    {
        id: 'carteras',
        label: 'Carteras',
        image: "/assets/premium_bag_hero.png",
        description: "Artesanía en cuero y diseños atemporales que definen tu elegancia diaria."
    },
    {
        id: 'billeteras',
        label: 'Billeteras',
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
        description: "Esencia y distinción en piezas compactas de alta marroquinería."
    },
    {
        id: 'lentesSol',
        label: 'Gafas de Sol',
        image: "/assets/sunglasses_category.png",
        description: "Una mirada de distinción a través de ópticas de precisión y marcos icónicos."
    },
];

const subSections: Record<string, string> = {
    premium: "Colección Premium",
    plus: "Línea Plus",
    plusDescanso: "Línea Plus - Descanso",
    standard: "Estándar",
    hombre: "Hombre",
    mujer: "Mujer",
    accesorios: "Accesorios"
};

// AuthModal import removed, replaced by global guard in ProductCard

// ... (existing imports, but removed repeating imports if any)

// ... (imports)

const Catalog = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [productsData, setProductsData] = useState<ProductData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Auth check removed here, handled in ProductCard component

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProductsData(data);
            } catch (error) {
                console.error("Error fetching products:", error);
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

    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryClick = (categoryId: string) => {
        if (categoryId === 'lentesSol') {
            navigate('/lentes');
        } else if (categoryId === 'carteras') {
            navigate('/carteras');
        } else if (categoryId === 'billeteras') {
            navigate('/billeteras');
        } else {
            setActiveCategory(categoryId);
            setTimeout(() => {
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleBackClick = () => {
        if (location.pathname !== '/' && location.pathname !== '/colecciones') {
            navigate('/colecciones');
        } else {
            setActiveCategory(null);
        }
    };

    const activeContent = (activeCategory && productsData) ? productsData[activeCategory] : null;

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    // ... (rest of component logic)

    return (
        <section className="py-12 bg-neutral-50 min-h-screen" id="catalogo">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >

                {/* Search Bar */}
                {/* ... (search bar logic same as before) ... */}
                {/* (I must be careful not to delete the search bar code. I will include the full return block if needed or just splice carefully) */}
                {/* To avoid deleting code, I will use Targeted Replace properly. But since I need to replace onClick everywhere, it might be better to replace the whole file content OR be very specific with chunks. 
                    Given the file size, I'll replace the relevant parts.
                */}

                {/* Professional Collection Navigation */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-premium-gold/30" />
                        <span className="text-premium-ruby tracking-[0.5em] text-[11px] uppercase font-bold">Catálogo Maestro</span>
                        <div className="h-[1px] w-12 bg-premium-gold/30" />
                    </motion.div>
                    <h2 className="font-serif text-5xl text-premium-dark mb-6 tracking-tight">Elige tu <span className="italic">Distinción</span></h2>
                    <p className="text-gray-400 font-light max-w-xl mx-auto text-sm leading-relaxed mb-12">
                        Navega por nuestras categorías exclusivas y descubre la pieza que resuena con tu esencia personal.
                    </p>
                    
                    <div className="relative max-w-xl mx-auto group">
                        <div className="absolute inset-0 bg-premium-gold/5 rounded-full blur-2xl group-hover:bg-premium-gold/10 transition-all duration-700" />
                        <input
                            type="text"
                            placeholder="Buscar en el archivo premium..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="relative w-full pl-16 pr-14 py-5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.03)] focus:shadow-[0_25px_60px_rgba(212,175,55,0.1)] focus:border-premium-gold/30 outline-none transition-all duration-500 placeholder-gray-300 font-light tracking-wide text-gray-700 z-10"
                        />
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-premium-gold z-20 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-premium-ruby transition-colors z-20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
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
                        <>
                            <motion.div
                            key="category-selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10"
                        >
                            {categories.map((cat, index) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="group relative h-[450px] overflow-hidden cursor-pointer shadow-2xl bg-black rounded-sm border border-white/5 transition-all duration-700"
                                >
                                    <Link to={cat.id === 'lentesSol' ? '/lentes' : (cat.id === 'carteras' ? '/carteras' : (cat.id === 'billeteras' ? '/billeteras' : '#'))} className="absolute inset-0 z-30" />
                                    
                                    {/* Image with zoom effect - 100% opacity for maximum visibility */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-100"
                                        style={{ backgroundImage: `url(${cat.image})` }}
                                    />

                                    {/* Cinematic Vignette - Adjusted for better product clarity */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    {/* Premium Glowing Border */}
                                    <div className="absolute inset-0 border border-premium-gold/0 group-hover:border-premium-gold/40 transition-all duration-700 m-4 z-20 pointer-events-none" />

                                    {/* Text Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-center z-20 px-6">
                                        <motion.span 
                                            className="text-premium-gold text-[10px] tracking-[0.5em] uppercase mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-bold"
                                        >
                                            Colección Exclusiva
                                        </motion.span>
                                        <h3 className="font-serif text-4xl text-white mb-4 tracking-tighter transition-transform duration-700 group-hover:-translate-y-2">
                                            {cat.label}
                                        </h3>
                                        <div className="w-0 group-hover:w-16 h-[1px] bg-premium-gold transition-all duration-700 mb-6" />
                                        <p className="text-gray-400 text-xs max-w-[240px] font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                            {cat.description}
                                        </p>
                                    </div>

                                    {/* Hover Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-gradient-to-tr from-premium-gold/20 via-transparent to-transparent pointer-events-none z-10" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
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
                                if (!Array.isArray(items) || items.length === 0) return null;
                                const overlineMap: Record<string, string> = {
                                    premium: "SIGNATURE SERIES",
                                    plus: "MODERN LUXURY",
                                    standard: "TIMELESS ESSENTIALS",
                                    hombre: "RUBI MEN",
                                    mujer: "RUBI WOMEN",
                                    accesorios: "EXCLUSIVE DETAILS"
                                };
                                const overline = overlineMap[subKey] || "RUBI COLLECTION";

                                // Dynamic colors and icons based on subcategory
                                const configMap: Record<string, { color: string; bg: string; isDark: boolean; overline: string; title: string; description: string }> = {
                                    premium: {
                                        color: '#D4AF37',
                                        bg: 'bg-premium-dark',
                                        isDark: true,
                                        overline: "Exclusividad Absoluta",
                                        title: "Colección Premium",
                                        description: "El pináculo de la exclusividad. Descubre nuestra selección curada de las casas de moda más prestigiosas del mundo."
                                    },
                                    plus: {
                                        color: '#8B0000',
                                        bg: 'bg-[#1a1a1a]',
                                        isDark: true,
                                        overline: "Estilo & Distinción",
                                        title: "Línea Plus",
                                        description: "Nuestra selección intermedia. El equilibrio perfecto entre diseño vanguardista y accesibilidad, sin comprometer la calidad."
                                    },
                                    plusDescanso: {
                                        color: '#4682B4',
                                        bg: 'bg-[#121212]',
                                        isDark: true,
                                        overline: "Salud Visual & Filtro Azul",
                                        title: "Línea Plus - Descanso",
                                        description: "Protección contra la luz azul para tus pantallas. Elegancia que cuida tu mirada en el mundo digital."
                                    },
                                    standard: {
                                        color: '#4a4a4a',
                                        bg: 'bg-[#111111]',
                                        isDark: true,
                                        overline: "Esenciales Atemporales",
                                        title: "Línea Estándar",
                                        description: "Diseños clásicos y versátiles para el día a día. Calidad Rubi Details en cada detalle para complementar cualquier look."
                                    },
                                };
                                const config = configMap[subKey] || {
                                    color: '#1A1A1A',
                                    bg: 'bg-white',
                                    isDark: false,
                                    overline: overline,
                                    title: subSections[subKey] || subKey,
                                    description: ""
                                };

                                // CUSTOM LAYOUT FOR LENTES SOL PREMIUM (BRAND DIVISION)
                                if (subKey === 'premium' && activeCategory === 'lentesSol') {
                                    const brands = [
                                        {
                                            name: 'Miu Miu',
                                            title: 'Vanguardia Femenina',
                                            color: '#E8B4B8',
                                            products: (items as Product[]).filter(p => p.brand === 'Miu Miu')
                                        },
                                        {
                                            name: 'Dior',
                                            title: 'Atrevimiento y Sofisticación',
                                            color: '#111111',
                                            products: (items as Product[]).filter(p => p.brand === 'Dior')
                                        },
                                        {
                                            name: 'Chanel',
                                            title: 'Elegancia Atemporal',
                                            color: '#D4AF37',
                                            products: (items as Product[]).filter(p => p.brand === 'Chanel')
                                        },
                                        {
                                            name: 'Prada',
                                            title: 'Lujo Geométrico',
                                            color: '#000000',
                                            products: (items as Product[]).filter(p => p.brand === 'Prada')
                                        }
                                    ];

                                    return (
                                        <div key={subKey} className="flex flex-col w-full mb-12">
                                            {/* Header Premium */}
                                            <div className="py-16 text-center bg-gradient-to-b from-premium-dark to-neutral-900 border-b border-premium-gold/20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <span className="text-premium-gold tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Exclusividad Absoluta</span>
                                                    <h3 className="font-serif text-4xl md:text-5xl text-white tracking-tight uppercase mb-6">
                                                        Colección Premium
                                                    </h3>
                                                    <p className="text-white/80 text-lg max-w-2xl mx-auto font-light italic">
                                                        El pináculo de la exclusividad. Descubre nuestra selección curada de las casas de moda más prestigiosas del mundo.
                                                    </p>
                                                </motion.div>
                                            </div>

                                            {/* 4 Brand Cards Grid */}
                                            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
                                                {brands.map((brand, idx) => (
                                                    <motion.div
                                                        key={brand.name}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="bg-neutral-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col h-full group/card hover:border-premium-gold/20 transition-colors duration-500"
                                                    >
                                                        <div className="p-8 text-center bg-transparent border-b border-white/5 relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                                                            {/* Brand Background Text */}
                                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-serif text-white/[0.02] pointer-events-none select-none uppercase tracking-[0.2em] whitespace-nowrap">
                                                                {brand.name}
                                                            </span>

                                                            <div className="relative z-10">
                                                                <span className="text-[10px] tracking-[0.5em] uppercase mb-3 block font-bold" style={{ color: brand.color }}>{brand.name}</span>
                                                                <h4 className="font-serif text-2xl text-white mb-4 uppercase tracking-tighter">{brand.title}</h4>
                                                                <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: brand.color }} />
                                                            </div>
                                                        </div>

                                                        <div className="p-6 bg-transparent flex-grow">
                                                            <div className="grid grid-cols-2 gap-6">
                                                                {brand.products.length > 0 ? (
                                                                    brand.products.map(item => (
                                                                        <ProductCard
                                                                            key={item.id}
                                                                            {...item}
                                                                            category={brand.name}
                                                                            variant="premium" // Using premium to have dark cards as requested
                                                                            onClick={() => handleProductClick(item)}
                                                                        />
                                                                    ))
                                                                ) : (
                                                                    <div className="col-span-2 py-10 text-center text-gray-400 italic font-light">
                                                                        Próximamente...
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={subKey} className={`relative py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-4 last:mb-0 ${config.bg} border-b border-premium-gold/10 overflow-hidden`}>
                                        {/* Dynamic Black Banner Header */}
                                        <div className="py-16 text-center mb-12 border-b border-white/5 relative z-10">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                            >
                                                <span className="tracking-[0.4em] text-sm uppercase mb-4 block font-medium" style={{ color: config.color }}>
                                                    {config.overline}
                                                </span>
                                                <h3 className="font-serif text-4xl md:text-5xl text-white tracking-tight uppercase mb-6">
                                                    {config.title}
                                                </h3>
                                                {config.description && (
                                                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-light italic">
                                                        {config.description}
                                                    </p>
                                                )}
                                                <div className="w-16 h-1 mx-auto rounded-full mt-8" style={{ backgroundColor: config.color }} />
                                            </motion.div>
                                        </div>

                                        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 relative z-10">
                                            {(items as Product[]).map((item) => (
                                                <ProductCard
                                                    key={item.id}
                                                    {...item}
                                                    category={subSections[subKey] || subKey}
                                                    variant={config.isDark ? "premium" : "default"}
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
            </motion.div>

            {/* Quick View Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            {/* Auth Modal removed, now handled globally */}
        </section>
    );
};

export default Catalog;
