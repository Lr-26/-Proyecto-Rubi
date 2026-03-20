import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight } from 'lucide-react';


interface WelcomeModalProps {
    user: any;
    isOpen: boolean;
    onClose: () => void;
}

const WelcomeModal = ({ user, isOpen, onClose }: WelcomeModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ 
                            type: 'spring', 
                            damping: 20, 
                            stiffness: 100 
                        }}
                        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 sm:p-14 shadow-[0_30px_100px_rgba(0,0,0,1)] overflow-hidden"
                    >
                        {/* Premium Glow Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-premium-gold/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-premium-ruby/5 blur-[100px] pointer-events-none rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 text-gray-500 hover:text-white transition-all hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative z-10 text-center flex flex-col items-center">
                            {/* Icon / Emblem */}
                            <motion.div 
                                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="mb-10 p-5 rounded-full bg-gradient-to-tr from-premium-gold/20 to-transparent border border-premium-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            >
                                <Sparkles size={40} className="text-premium-gold" />
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl font-serif tracking-[0.1em] text-white mb-6 uppercase">
                                <span className="text-premium-ruby">RUBI</span> DETAILS
                            </h2>

                            <div className="w-12 h-[1px] bg-premium-gold/40 mb-8" />

                            <p className="text-xl sm:text-2xl text-white/90 font-serif leading-relaxed mb-4">
                                ¡Bienvenido, {user?.name || 'Cliente Premium'}!
                            </p>
                            
                            <p className="text-sm sm:text-base text-gray-400 font-sans tracking-widest leading-loose mb-12 max-w-sm">
                                Es un placer darte la bienvenida a nuestra comunidad exclusiva. 
                                Descubre la excelencia en cada detalle.
                            </p>

                            <button
                                onClick={onClose}
                                className="group relative flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-premium-gold to-[#e5c06d] text-premium-dark rounded-full text-xs font-black tracking-[0.4em] shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all"
                            >
                                COMENZAR EXPERIENCIA
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-10 text-[9px] text-gray-600 uppercase tracking-[0.5em] font-bold">
                                Elegant Collections &copy; {new Date().getFullYear()}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
