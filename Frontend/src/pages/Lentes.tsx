import React from 'react';
import ProductCard from '../components/ProductCard';

// Dummy Data
const glasses = {
    premium: [
        { id: 1, title: "Aviador Gold Edition", price: "$250", image: "https://images.unsplash.com/photo-1572635196184-84e35138cf62?auto=format&fit=crop&q=80&w=800", description: "Marcos bañados en oro de 18k con lentes polarizados." },
        { id: 2, title: "Cat-Eye Oversized", price: "$220", image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800", description: "Un look audaz y sofisticado para la mujer moderna." },
    ],
    plus: [
        { id: 3, title: "Wayfarer Clásico", price: "$120", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800", description: "El diseño icónico que nunca pasa de moda." },
        { id: 4, title: "Round Metal", price: "$135", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800", description: "Estilo retro con un toque contemporáneo." },
    ],
    standard: [
        { id: 5, title: "Casual Square", price: "$65", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800", description: "Protección UV400 en un marco ligero y resistente." },
        { id: 6, title: "Clubmaster Basic", price: "$70", image: "https://images.unsplash.com/photo-1533725796841-f5bc7308728d?auto=format&fit=crop&q=80&w=800", description: "Elegancia a un precio accesible." },
    ],
    sports: [
        { id: 7, title: "Racer X Pro", price: "$150", image: "https://images.unsplash.com/photo-1622445272461-901b0b57e45b?auto=format&fit=crop&q=80&w=800", description: "Diseñados para el alto rendimiento y velocidad." },
        { id: 8, title: "Trail Runner", price: "$110", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800", description: "Agarre antideslizante y ventilación optimizada." }, // Reusing generic as placeholder if sports specific not found easily
    ]
};

interface Product {
    id: number;
    title: string;
    price: string;
    image: string;
    description: string;
}

interface SectionProps {
    title: string;
    items: Product[];
    bgClass?: string;
}

const Section: React.FC<SectionProps> = ({ title, items, bgClass = "bg-white" }) => (
    <section className={`py-16 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-premium-dark mb-8 pl-4 border-l-4 border-premium-gold">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map(item => (
                    <ProductCard key={item.id} {...item} category={title} />
                ))}
            </div>
        </div>
    </section>
);

const Lentes = () => {
    return (
        <div className="pt-20">
            <div className="bg-premium-dark text-premium-cream py-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl mb-4">Colección de Lentes</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">Visión clara, estilo impecable. Descubre nuestra gama de gafas de sol y deportivas.</p>
            </div>

            <Section title="Premium Eyewear" items={glasses.premium} />
            <Section title="Línea Plus" items={glasses.plus} bgClass="bg-premium-cream" />
            <Section title="Estándar" items={glasses.standard} />
            <Section title="Deportivos" items={glasses.sports} bgClass="bg-gray-100" />
        </div>
    );
};

export default Lentes;
