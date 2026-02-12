import React from 'react';
import { motion } from 'framer-motion';
import Catalog from '../components/Catalog';

const Colecciones = () => {
    return (
        <div className="pt-20 min-h-screen bg-neutral-50">
            {/* Hero Header */}
            <div className="bg-premium-dark text-white py-24 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="font-serif text-5xl md:text-6xl mb-6 tracking-tight">Nuestras Colecciones</h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Explora el universo Rubi Details. Diseños exclusivos pensados para elevar tu estilo personal.
                    </p>
                </motion.div>
            </div>

            <Catalog />
        </div>
    );
};

export default Colecciones;
