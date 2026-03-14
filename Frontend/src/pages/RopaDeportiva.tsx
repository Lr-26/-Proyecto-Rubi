
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2, Activity } from 'lucide-react';
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
    <section className={`py-20 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="font-serif text-4xl text-premium-dark mb-4 border-l-4 border-premium-gold pl-6">{title}</h2>
                <div className="h-1 w-24 bg-premium-gold/30 ml-6 rounded-full"></div>
            </motion.div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                {...item}
                                category={title}
                                onClick={() => onProductClick(item)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No hay productos disponibles en esta sección por el momento.</p>
            )}
        </div>
    </section>
);

const RopaDeportiva = () => {
    const [products, setProducts] = useState<ProductData['ropaDeportiva'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isOverHero, setIsOverHero] = useState(false);

    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement with springs
    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform values
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
                setProducts(data?.ropaDeportiva || null);
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
                <Loader2 className="animate-spin text-premium-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-neutral-900" onMouseMove={handleMouseMove}>
            {/* Athletic Premium Hero Section */}
            <div 
                className={`relative h-[85vh] flex items-center justify-center overflow-hidden bg-black ${isOverHero ? 'cursor-none' : 'cursor-default'}`}
                onMouseEnter={() => setIsOverHero(true)}
                onMouseLeave={() => setIsOverHero(false)}
            >
                {/* Background Parallax Layer */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.15 }}
                    className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"
                />

                {/* --- MOVING LIGHT SYSTEM (Sport Pulse) --- */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Pulsing Neon Blue Light (Sport feel) */}
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.25, 0.1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[180px]" 
                    />

                    {/* Drifting Gold Light */}
                    <motion.div 
                        animate={{ 
                            x: [0, 200, -200, 0],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-premium-gold/15 rounded-full blur-[200px]" 
                    />

                    {/* Rapid Sweeping Light */}
                    <motion.div 
                        animate={{ x: [-1000, 1000] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-[500px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[30deg]"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center w-full">
                    {/* The "Power" Icon Portal */}
                    <motion.div
                        style={{ x: bgY, y: bgX }}
                        className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-2xl rotate-12 z-20 hover:rotate-0 transition-transform duration-1000"
                    >
                        <Activity className="text-white/20 w-1/2 h-1/2 -rotate-12" />
                    </motion.div>

                    {/* Hero Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
                        <motion.h1 
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="font-serif text-5xl md:text-[9rem] text-white uppercase font-black tracking-widest text-glow text-center leading-none"
                        >
                            <span className="block text-white">Power</span>
                            <span className="block text-transparent stroke-white stroke-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Performance</span>
                        </motion.h1>
                    </div>
                </div>
            </div>

            <main className="bg-white">
                <Section
                    title="Hombre"
                    items={products?.hombre || []}
                    onProductClick={handleProductClick}
                />
                <Section
                    title="Mujer"
                    items={products?.mujer || []}
                    bgClass="bg-neutral-50"
                    onProductClick={handleProductClick}
                />
                <Section
                    title="Accesorios"
                    items={products?.accesorios || []}
                    onProductClick={handleProductClick}
                />
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default RopaDeportiva;
