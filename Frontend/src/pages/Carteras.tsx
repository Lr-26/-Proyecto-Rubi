
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { getProducts, Product, ProductData } from '../data/products';

// ... (SectionProps and Section component remain same)
// Note: In Carteras.tsx, Section component is defined at the top. I should preserve it. 
// However, to avoid the same mistake, I will target the imports and the component body separately.

interface SectionProps {
    title: string;
    items: Product[];
    bgClass?: string;
    onProductClick: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ title, items, bgClass = "bg-white", onProductClick }) => (
    <section className={`py-16 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-premium-dark mb-8 pl-4 border-l-4 border-premium-gold">{title}</h2>
            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <p className="text-gray-500 italic">No hay productos disponibles en esta sección por el momento.</p>
            )}
        </div>
    </section>
);

const Carteras = () => {
    const [products, setProducts] = useState<ProductData['carteras'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="animate-spin text-premium-gold" size={48} />
            </div>
        );
    }

    return (
        <div className="pt-20">
            <div className="bg-premium-dark text-premium-cream py-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl mb-4">Nuestras Carteras</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">Explora nuestra selección curada de bolsos, desde piezas de declaración premium hasta esenciales diarios.</p>
            </div>

            <Section
                title="Colección Premium"
                items={products?.premium || []}
                onProductClick={handleProductClick}
            />
            <Section
                title="Línea Plus"
                items={products?.plus || []}
                bgClass="bg-premium-cream"
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
