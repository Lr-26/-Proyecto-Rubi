import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sofía Martínez",
        role: "Cliente VIP",
        comment: "La calidad de la cartera supera mis expectativas. El cuero es increíblemente suave y los acabados son perfectos.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "Carlos Ruiz",
        role: "Arquitecto",
        comment: "Compré unos lentes de la línea Premium y la claridad visual es asombrosa. Definitivamente volveré a comprar.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Valentina López",
        role: "Diseñadora de Modas",
        comment: "Rubi Lentes entiende lo que significa la elegancia sutil. Sus diseños son modernos pero con un toque clásico que me encanta.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-premium-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-serif text-4xl md:text-5xl text-premium-dark mb-4"
                    >
                        Lo que dicen nuestros clientes
                    </motion.h2>
                    <div className="w-24 h-0.5 bg-premium-gold mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">Experiencias reales de personas que han elevado su estilo con nosotros.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-premium-gold relative"
                        >
                            <div className="flex items-center mb-6">
                                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-premium-gold/50" />
                                <div>
                                    <h4 className="font-bold text-premium-dark">{t.name}</h4>
                                    <span className="text-sm text-premium-ruby font-medium">{t.role}</span>
                                </div>
                            </div>

                            <div className="flex mb-4 text-premium-gold">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-600 italic leading-relaxed">"{t.comment}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
