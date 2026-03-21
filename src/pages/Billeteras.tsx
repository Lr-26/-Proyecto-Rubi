
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2, Wallet, Sparkles, Diamond, ShieldCheck } from 'lucide-react';
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
    <section className={`py-24 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-6 bg-premium-gold/10 text-premium-gold">
                    <Sparkles size={24} />
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-premium-dark mb-6 tracking-tight uppercase">
                    {title}
                </h2>
                <div className="h-1 w-24 bg-premium-gold mx-auto rounded-full"></div>
            </motion.div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                {...item}
                                category="Billeteras"
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

const Billeteras = () => {
    const [products, setProducts] = useState<ProductData['billeteras'] | null>(null);
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
                setProducts(data?.billeteras || null);
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
            {/* Wallet Premium Hero Section */}
            <div 
                className={`relative h-[85vh] flex items-center justify-center overflow-hidden bg-black ${isOverHero ? 'cursor-none' : 'cursor-default'}`}
                onMouseEnter={() => setIsOverHero(true)}
                onMouseLeave={() => setIsOverHero(false)}
            >
                {/* Background Parallax Layer */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.15 }}
                    className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"
                />

                {/* Moving Light System (Professional Luxury Effect) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [-80, 80, -40],
                            y: [-40, 40, 80],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-premium-gold/15 rounded-full blur-[180px]" 
                    />
                    <motion.div 
                        animate={{ 
                            x: [80, -80, 40],
                            y: [80, -40, -80],
                            opacity: [0.08, 0.18, 0.08]
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-premium-gold/10 rounded-full blur-[160px]" 
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="flex flex-col items-center"
                    >
                        <Wallet className="text-premium-gold mb-6 w-16 h-16 opacity-80" />
                        <h1 className="font-serif text-7xl md:text-9xl text-white uppercase tracking-tighter mb-4 drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                            Billeteras
                        </h1>
                        <p className="text-premium-gold/80 text-lg md:text-xl tracking-[0.3em] uppercase max-w-2xl font-light">
                            Esencia y distinción en cada detalle
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* --- PROFESSIONAL HEADER FOR BILLETERAS --- */}
            <div className="py-24 bg-gradient-to-b from-premium-dark to-white border-b border-premium-gold/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-premium-gold tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Boutique de Marroquinería</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-white tracking-tight uppercase mb-8">
                        La Colección
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light italic leading-relaxed">
                        Pequeños objetos de deseo diseñados para acompañarte con elegancia. Nuestra selección curada de billeteras combina funcionalidad y lujo en cada costura.
                    </p>
                    <div className="mt-12 flex justify-center gap-6">
                        <Diamond className="text-premium-gold opacity-50" size={24} />
                        <ShieldCheck className="text-premium-gold opacity-50" size={24} />
                    </div>
                </div>
            </div>


            <main className="bg-white">
                {products?.hombre && products.hombre.length > 0 && (
                    <Section
                        title="Colección Hombre"
                        items={products.hombre.filter(p => p.image.toLowerCase().includes('billetera'))}
                        onProductClick={handleProductClick}
                    />
                )}
                {(products?.mujer && products.mujer.length > 0) && (
                    <Section
                        title="Colección Mujer"
                        items={products.mujer.filter(p => p.image.toLowerCase().includes('billetera'))}
                        bgClass="bg-neutral-50"
                        onProductClick={handleProductClick}
                    />
                )}
                {products?.accesorios && products.accesorios.length > 0 && (
                    <Section
                        title="Accesorios de Cuero"
                        items={products.accesorios.filter(p => p.image.toLowerCase().includes('billetera'))}
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

export default Billeteras;
