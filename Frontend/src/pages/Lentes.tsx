
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Star, ShieldCheck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import { getProducts, Product, ProductData } from '../data/products';
import ProductModal from '../components/ProductModal';

interface SectionProps {
    title: string;
    subtitle: string;
    items: Product[];
    bgClass?: string;
    accentColor: string;
    icon: React.ReactNode;
    onProductClick: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, items, bgClass = "bg-white", accentColor, icon, onProductClick }) => (
    <section className={`py-24 relative overflow-hidden ${bgClass}`}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-current rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ color: accentColor }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-current rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ color: accentColor }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-6" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                    {icon}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-premium-dark mb-4 tracking-tight uppercase">
                    {title}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-light italic text-lg">
                    {subtitle}
                </p>
                <div className="mt-8 flex justify-center">
                    <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }} />
                </div>
            </motion.div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                {...item}
                                category={title}
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

const Lentes = () => {
    const [products, setProducts] = useState<ProductData['lentesSol'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

    const isUserLoggedIn = () => !!localStorage.getItem('rubi_user');

    const handleProductClick = (product: Product) => {
        if (isUserLoggedIn()) {
            setSelectedProduct(product);
        } else {
            setPendingProduct(product);
            setIsAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        if (pendingProduct) {
            setSelectedProduct(pendingProduct);
            setPendingProduct(null);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data?.lentesSol || null);
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
            <div className="min-h-screen flex items-center justify-center bg-premium-cream">
                <div className="text-center">
                    <Loader2 className="animate-spin text-premium-gold mx-auto mb-4" size={48} />
                    <p className="text-premium-dark font-serif italic">Preparando la colección...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-neutral-50 selection:bg-premium-gold selection:text-white">
            {/* Ultra Premium Hero Section */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-premium-dark">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595166453712-4017686d63d0?auto=format&fit=crop&q=80&w=1920&v=3')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-premium-dark/70 via-transparent to-neutral-50" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-premium-gold tracking-[0.6em] text-sm uppercase mb-6 block font-medium">Luxe Visionary</span>
                        <h1 className="font-serif text-6xl md:text-8xl text-white mb-8 tracking-tighter uppercase">
                            Lentes
                        </h1>
                        <p className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
                            Una mirada exclusiva a través de diseños que definen personalidades.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent to-premium-gold" />
                </div>
            </div>

            {/* Lineas de Producto */}
            <Section
                title="Línea Premium"
                subtitle="El pináculo de la exclusividad. Materiales nobles y diseños de vanguardia."
                items={products?.premium || []}
                accentColor="#D4AF37" // Premium Gold
                icon={<Star size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            <Section
                title="Línea Plus"
                subtitle="Equilibrio perfecto entre sofisticación moderna y versatilidad diaria."
                items={products?.plus || []}
                accentColor="#8B0000" // Premium Ruby/Dark Red
                icon={<Zap size={32} />}
                bgClass="bg-premium-cream/40"
                onProductClick={handleProductClick}
            />

            <Section
                title="Línea Estándar"
                subtitle="Esenciales atemporales. La base fundamental del estilo contemporáneo."
                items={products?.standard || []}
                accentColor="#1A1A1A" // Dark/Neutral
                icon={<ShieldCheck size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
            />
        </div>
    );
};

export default Lentes;
