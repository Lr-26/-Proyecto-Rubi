import React from 'react';
import { motion } from 'framer-motion';
import Catalog from '../components/Catalog';

const Colecciones = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
            {/* Subtle Texture/Grain Overlay for luxury feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-50"></div>
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                {/* Parallax Background with stronger overlay */}
                {/* Cinematic Triptych Montage (Bags, Lenses, Sportswear) */}
                <div className="absolute inset-0 z-0 flex gap-[2px] opacity-40 grayscale-[20%]">
                    {/* Handbags Panel */}
                    <motion.div 
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, delay: 0.1 }}
                        className="flex-1 bg-[url('/assets/premium_bag_hero.png')] bg-cover bg-center" 
                    />
                    {/* Sunglasses Panel */}
                    <motion.div 
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, delay: 0.3 }}
                        className="flex-1 bg-[url('/assets/premium_sunglasses_hero.png')] bg-cover bg-center" 
                    />
                    {/* Billeteras Panel */}
                    <motion.div 
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, delay: 0.5 }}
                        className="flex-1 bg-[url('https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center" 
                    />
                    
                    {/* Luxury Overlay to unify the montage */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-neutral-50" />
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                </div>

                {/* Dynamic Lighting Effects */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-premium-ruby/20 rounded-full blur-[120px]" 
                    />
                    <motion.div 
                        animate={{ 
                            x: [0, -100, 0],
                            y: [0, 50, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-premium-gold/10 rounded-full blur-[100px]" 
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 text-center px-4"
                >
                    <span className="text-premium-gold tracking-[0.5em] text-[10px] uppercase font-bold block mb-6 px-4 py-1 border-x border-premium-gold/30 mx-auto w-fit">
                        The Master Collection
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl text-white mb-8 tracking-tighter leading-none">
                        Nuestras <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/40 italic font-light">Colecciones</span>
                    </h1>
                    <div className="w-20 h-[1px] bg-premium-gold/50 mx-auto mb-8" />
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                        Un viaje por la técnica y la sofisticación. Descubre piezas diseñadas para perdurar en el tiempo y elevar tu presencia.
                    </p>
                </motion.div>

                {/* Elegant Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[9px] tracking-[0.3em] text-premium-gold uppercase">Explorar</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-premium-gold to-transparent" />
                </div>
            </div>

            <Catalog />
        </div>
    );
};

export default Colecciones;
