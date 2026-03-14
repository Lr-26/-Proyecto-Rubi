
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
            <h2 className="font-serif text-4xl text-premium-dark mb-10 pl-6 border-l-4 border-premium-gold">{title}</h2>
            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                            category={title}
                            onClick={() => onProductClick(item)}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic py-10">No hay productos disponibles en esta sección por el momento.</p>
            )}
        </div>
    </section>
);

const Carteras = () => {
    const [products, setProducts] = useState<ProductData['carteras'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isOverHero, setIsOverHero] = useState(false);

    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement with springs
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform values
    const bgX = useTransform(springX, [0, 2000], [-30, 30]);
    const bgY = useTransform(springY, [0, 1000], [-30, 30]);
    
    const imageX = useTransform(springX, [0, 2000], [-40, 40]);
    const imageY = useTransform(springY, [0, 1000], [-40, 40]);

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
            <div className="min-h-screen flex items-center justify-center bg-premium-dark">
                <Loader2 className="animate-spin text-premium-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-neutral-50" onMouseMove={handleMouseMove}>
            {/* Ultra Premium Hero Section */}
            <div 
                className={`relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#050505] ${isOverHero ? 'cursor-none' : 'cursor-default'}`}
                onMouseEnter={() => setIsOverHero(true)}
                onMouseLeave={() => setIsOverHero(false)}
            >
                {/* Background Parallax Layer */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.1 }}
                    className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center grayscale"
                />

                {/* Moving Lights Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [-150, 150, -50, 0],
                            y: [-50, 50, 80, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-[800px] h-[800px] bg-premium-gold/20 rounded-full blur-[160px]" 
                    />

                    <motion.div 
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[120px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0"
                        style={{ transformOrigin: 'center center' }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center w-full">
                    {/* Architectural Portal */}
                    <motion.div
                        style={{ x: bgY, y: bgX }}
                        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-premium-gold/20 flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-2xl shadow-[0_0_80px_rgba(212,175,55,0.05)] z-20"
                    >
                        {/* Internal Glow for depth */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-premium-gold/5 via-transparent to-transparent pointer-events-none" />

                        <motion.img
                            src="/assets/premium_bag_hero.png"
                            alt="Premium Bag"
                            style={{ 
                                x: imageX, 
                                y: imageY,
                                filter: 'contrast(1.1) brightness(1.05)',
                                maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1.15 }}
                            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                            className="w-[88%] h-[88%] object-contain z-30 pointer-events-none mix-blend-screen drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        />

                        {/* Subtle Shimmer across the item */}
                        <motion.div 
                            animate={{ x: [-500, 500] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                        />
                    </motion.div>

                    {/* Hero Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="font-serif text-6xl md:text-[11rem] text-white uppercase tracking-tighter opacity-90 drop-shadow-2xl text-center"
                        >
                            Carteras
                        </motion.h1>
                    </div>
                </div>
            </div>

            <Section
                title="Colección Premium"
                items={products?.premium || []}
                onProductClick={handleProductClick}
            />
            <Section
                title="Línea Plus"
                items={products?.plus || []}
                bgClass="bg-premium-cream/20"
                onProductClick={handleProductClick}
            />
            <Section
                title="Estándar"
                items={products?.standard || []}
                onProductClick={handleProductClick}
            />

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default Carteras;
