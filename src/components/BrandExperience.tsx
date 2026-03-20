
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

const BrandExperience = () => {
    return (
        <section className="bg-white overflow-hidden">
            {/* Features Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="py-24 border-y border-gray-100 bg-neutral-50/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {/* Items with internal staggered delay */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-premium-gold/10 flex items-center justify-center mb-8 group-hover:bg-premium-gold/20 transition-all duration-700 transform group-hover:scale-110">
                                <Truck className="text-premium-gold" size={32} />
                            </div>
                            <h3 className="font-serif text-2xl text-premium-dark mb-3 tracking-wide">Envío Priority</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[250px]">
                                Logística nacional de guante blanco. Tus piezas llegan protegidas y a tiempo.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-premium-ruby/10 flex items-center justify-center mb-8 group-hover:bg-premium-ruby/20 transition-all duration-700 transform group-hover:scale-110">
                                <ShieldCheck className="text-premium-ruby" size={32} />
                            </div>
                            <h3 className="font-serif text-2xl text-premium-dark mb-3 tracking-wide">Autenticidad Rubi</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[250px]">
                                Garantía de calidad en cada material. Seleccionamos solo lo mejor para ti.
                            </p>
                        </div>

                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-premium-gold/10 flex items-center justify-center mb-8 group-hover:bg-premium-gold/20 transition-all duration-700 transform group-hover:scale-110">
                                <Sparkles className="text-premium-gold" size={32} />
                            </div>
                            <h3 className="font-serif text-2xl text-premium-dark mb-3 tracking-wide">Exclusividad VIP</h3>
                            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[250px]">
                                Diseños que no encontrarás en otro lugar. Eleva tu presencia con piezas únicas.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BrandExperience;
