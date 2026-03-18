import { motion } from 'framer-motion';
import { CreditCard, Wallet, Banknote, MessageCircle, Truck } from 'lucide-react';

const PaymentMethods = () => {
    const methods = [
        {
            icon: <Wallet className="text-premium-gold" size={32} />,
            title: "Transferencia Bancaria",
            description: "Aprovecha un 10% de descuento abonando por transferencia inmediata. La opción más rápida y económica.",
            badge: "Sugerido"
        },
        {
            icon: <CreditCard className="text-premium-ruby" size={32} />,
            title: "Tarjetas de Crédito",
            description: "Aceptamos todas las tarjetas en hasta 3 cuotas fijas (consultar promociones vigentes).",
        },
        {
            icon: <Banknote className="text-premium-gold" size={32} />,
            title: "Efectivo / Showroom",
            description: "Coordinamos el pago en efectivo para retiros locales en nuestro exclusivo showroom de ventas.",
        },
        {
            icon: <Truck className="text-premium-ruby" size={32} />,
            title: "Envíos a Todo el País",
            description: "Despachamos tus piezas a toda Argentina con logística de primera clase y seguimiento paso a paso.",
        }
    ];

    const handleWhatsAppInquiry = () => {
        const phoneNumber = "549381449040";
        const message = "Hola! Quisiera recibir información detallada sobre las formas de pago y facilidades disponibles.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="py-24 bg-neutral-900 overflow-hidden relative border-t border-premium-gold/10">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-premium-gold tracking-[0.4em] text-[10px] uppercase font-bold mb-4 block"
                    >
                        Facilidades de Compra
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl text-white mb-6"
                    >
                        Formas de <span className="italic">Pago & Financiación</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 font-light max-w-2xl mx-auto text-sm leading-relaxed"
                    >
                        Diseñamos una experiencia de pago segura y versátil para que obtengas tus piezas exclusivas con total comodidad. 
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {methods.map((method, idx) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-neutral-800/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl group hover:border-premium-gold/30 transition-all duration-500 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                {method.icon}
                            </div>
                            
                            {method.badge && (
                                <span className="bg-premium-gold text-premium-dark text-[9px] font-bold px-2 py-0.5 rounded-full uppercase mb-4 tracking-wider">
                                    {method.badge}
                                </span>
                            )}
                            
                            <h3 className="font-serif text-xl text-white mb-4 tracking-wide">{method.title}</h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">
                                {method.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <button
                        onClick={handleWhatsAppInquiry}
                        className="group relative px-12 py-5 overflow-hidden rounded-full bg-premium-ruby hover:bg-premium-gold transition-colors duration-500 shadow-2xl hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.4)] flex items-center gap-3"
                    >
                        <MessageCircle size={20} className="text-white group-hover:text-premium-dark transition-colors" />
                        <span className="text-white group-hover:text-premium-dark text-xs tracking-[0.3em] uppercase font-bold transition-colors">
                            Consultar Facilidades por WhatsApp
                        </span>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentMethods;
