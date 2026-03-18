import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=60&w=1600&auto=format&fit=crop")',
                    y: backgroundY,
                    scale: 1.1 // Slight scale to prevent whitespace during parallax
                }}
            />

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

            {/* Content */}
            <motion.div
                style={{ opacity: opacityText }}
                className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.span
                    variants={titleVariants}
                    className="text-premium-gold font-medium tracking-[0.4em] uppercase text-xs md:text-sm mb-6 pb-2 border-b border-premium-gold/30"
                >
                    Estilo Atemporal & Lujo Moderno
                </motion.span>

                <h1 className="font-serif text-5xl md:text-8xl lg:text-[10rem] text-white mb-8 tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <motion.span className="block" variants={titleVariants}>RUBI</motion.span>
                    <motion.span
                        className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/40 italic font-light text-glow"
                        variants={titleVariants}
                    >
                        DETAILS
                    </motion.span>
                </h1>

                <motion.p
                    variants={titleVariants}
                    className="max-w-2xl mx-auto text-white/70 text-base md:text-lg font-light mb-14 leading-relaxed tracking-wide"
                >
                    Eleva tu esencia con nuestra colección exclusiva de accesorios.
                    <br className="hidden md:block" />
                    Diseñados para quienes entienden que el lujo está en los detalles.
                </motion.p>

                <motion.div
                    variants={titleVariants}
                    className="mt-4"
                >
                    <button
                        onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-10 py-4 overflow-hidden rounded-full transition-all duration-500 hover:shadow-gold"
                    >
                        <div className="absolute inset-0 glass-dark group-hover:bg-premium-gold transition-colors duration-500" />
                        <span className="relative text-white group-hover:text-premium-dark text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-500">
                            Explorar Colección
                        </span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-premium-gold/40"
                animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
                <ChevronDown size={28} strokeWidth={1} />
            </motion.div>
        </div >
    );
};

export default Hero;
