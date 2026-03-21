
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2, ShoppingBag, Sparkles, Diamond } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { getProducts, Product, ProductData } from '../data/products';

interface SectionProps {
    title: string;
    items: Product[];
    bgClass?: string;
    onProductClick: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ title, items, bgClass = "bg-white", onProductClick }) => (
    <section className={`py-24 relative overflow-hidden ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-premium-ruby/10 text-premium-ruby">
                    <Sparkles size={24} />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-premium-dark mb-6 tracking-tight uppercase">
                    {title}
                </h2>
                <div className="h-1 w-24 bg-premium-ruby mx-auto rounded-full opacity-60"></div>
            </motion.div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                {...item}
                                category="Carteras"
                                variant="premium"
                                onClick={() => onProductClick(item)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-black/5 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-400 font-light">Próximamente nuevas incorporaciones a esta colección.</p>
                </div>
            )}
        </div>
    </section>
);

const Carteras = () => {
    const [products, setProducts] = useState<ProductData['carteras'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isOverHero, setIsOverHero] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const bgX = useTransform(springX, [0, 2000], [-40, 40]);
    const bgY = useTransform(springY, [0, 1000], [-40, 40]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data?.carteras || null);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-premium-ruby" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-neutral-900" onMouseMove={handleMouseMove}>
            {/* Bag Premium Hero Section */}
            <div 
                className={`relative h-[85vh] flex items-center justify-center overflow-hidden bg-black ${isOverHero ? 'cursor-none' : 'cursor-default'}`}
                onMouseEnter={() => setIsOverHero(true)}
                onMouseLeave={() => setIsOverHero(false)}
            >
                {/* Background Parallax Layer */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.15 }}
                    className="absolute inset-0 z-0 opacity-40 bg-[url('/assets/premium_bag_hero.png')] bg-cover bg-center"
                />

                {/* Moving Light System (Professional Boutique Effect) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [-100, 100, -50],
                            y: [-50, 50, 100],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-premium-ruby/20 rounded-full blur-[180px]" 
                    />
                    <motion.div 
                        animate={{ 
                            x: [100, -100, 50],
                            y: [100, -50, -100],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-premium-ruby/10 rounded-full blur-[150px]" 
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="flex flex-col items-center"
                    >
                        <ShoppingBag className="text-premium-ruby mb-6 w-16 h-16 opacity-80" />
                        <h1 className="font-serif text-7xl md:text-9xl text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(155,17,30,0.5)]">
                            Carteras
                        </h1>
                        <p className="text-premium-ruby/80 text-lg md:text-xl tracking-[0.3em] uppercase max-w-2xl font-light">
                            Artesanía y Lujo en cada pieza
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* --- PROFESSIONAL HEADER FOR CARTERAS --- */}
            <div className="py-24 bg-gradient-to-b from-premium-dark to-white border-b border-premium-ruby/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-premium-ruby tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Boutique Exclusive</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight uppercase mb-8">
                        La Selección
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light italic leading-relaxed">
                        Explora carteras que son verdaderas obras de arte. Desde diseños clásicos hasta tendencias contemporáneas, cada pieza ha sido elegida por su calidad excepcional y presencia impecable.
                    </p>
                    <div className="mt-12 flex justify-center gap-6">
                        <Diamond className="text-premium-ruby opacity-50" size={24} />
                        <Sparkles className="text-premium-ruby opacity-50" size={24} />
                    </div>
                </div>
            </div>

            <main className="bg-white">
                {(products?.premium && products.premium.length > 0) && (
                    <Section
                        title="Carteras Premium"
                        items={products.premium.filter(p => p.image.includes('/Carteras'))}
                        onProductClick={handleProductClick}
                    />
                )}
                {products?.plus && products.plus.length > 0 && (
                    <Section
                        title="Línea Plus"
                        items={products.plus.filter(p => p.image.includes('/Carteras'))}
                        bgClass="bg-premium-cream/20"
                        onProductClick={handleProductClick}
                    />
                )}
                {products?.standard && products.standard.length > 0 && (
                    <Section
                        title="Estándar"
                        items={products.standard.filter(p => p.image.includes('/Carteras'))}
                        onProductClick={handleProductClick}
                    />
                )}
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default Carteras;
