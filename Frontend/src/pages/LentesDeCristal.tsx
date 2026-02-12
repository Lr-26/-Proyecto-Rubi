
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const LentesDeCristal = () => {
    const [products, setProducts] = useState<ProductData['lentesCristal'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data?.lentesCristal || null);
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
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="animate-spin text-premium-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-neutral-50">
            {/* Header Section */}
            <div className="relative bg-premium-dark text-premium-cream overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-5xl md:text-7xl mb-6 tracking-tight text-white"
                    >
                        Lentes de Cristal
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Claridad perfecta y diseño sofisticado. Marcos ópticos que definen tu mirada con elegancia.
                    </motion.p>
                </div>
            </div>

            <Section
                title="Colección Premium"
                items={products?.premium || []}
                onProductClick={setSelectedProduct}
            />
            <Section
                title="Línea Plus"
                items={products?.plus || []}
                bgClass="bg-premium-cream/30"
                onProductClick={setSelectedProduct}
            />
            <Section
                title="Estándar"
                items={products?.standard || []}
                onProductClick={setSelectedProduct}
            />

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default LentesDeCristal;
