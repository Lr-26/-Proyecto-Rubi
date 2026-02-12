// React import removed to fix lint warning as it's not needed in React 19+

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutPreview = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-premium-gold/10 rounded-full z-0 blur-3xl"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-premium-ruby/10 rounded-full z-0 blur-3xl"></div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1200"
                                alt="Artesanía y detalle"
                                className="rounded-sm shadow-2xl h-[600px] w-full object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-premium-cream p-6 shadow-xl max-w-xs hidden md:block">
                                <p className="font-serif text-2xl text-premium-dark italic">"El lujo reside en los detalles que nadie ve, pero todos sienten."</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:pl-10"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl text-premium-dark mb-6 leading-tight">
                            Redefiniendo la <span className="text-premium-ruby italic">Excelencia</span> en Cada Pieza
                        </h2>
                        <div className="w-20 h-1 bg-premium-gold mb-8"></div>

                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            En Rubi Details, creemos que los accesorios no son solo complementos, sino extensiones de tu personalidad. Cada cartera y cada par de lentes es seleccionado meticulosamente para ofrecerte no solo un producto, sino una experiencia de distinción.
                        </p>
                        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                            Desde el cuero más suave hasta los cristales ópticos más precisos, nuestra obsesión por la calidad es innegociable. Descubre por qué nuestros clientes nos eligen para elevar su estilo diario a un nuevo nivel de sofisticación.
                        </p>

                        {/* Since About page doesn't exist yet, we can link to Contacto or just have a button that looks nice */}
                        <Link to="/colecciones" className="inline-flex items-center space-x-2 text-premium-dark font-medium border-b-2 border-premium-gold pb-1 hover:text-premium-ruby hover:border-premium-ruby transition-all group">
                            <span>Explorar Catálogo</span>
                            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
