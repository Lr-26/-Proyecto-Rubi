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
                    backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2080&auto=format&fit=crop")',
                    y: backgroundY,
                    scale: 1.1 // Slight scale to prevent whitespace during parallax
                }}
            />

            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />

            {/* Grain Texture Overlay (Optional subtle texture) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

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
                    className="text-premium-gold font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-6 border-b border-premium-gold/50 pb-2"
                >
                    Estilo Atemporal & Lujo Moderno
                </motion.span>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 tracking-tight drop-shadow-2xl">
                    <motion.span className="block" variants={titleVariants}>RUBI</motion.span>
                    <motion.span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 italic font-light" variants={titleVariants}>
                        DETAILS
                    </motion.span>
                </h1>

                <motion.p
                    variants={titleVariants}
                    className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl font-light mb-12 leading-relaxed tracking-wide mix-blend-screen"
                >
                    Eleva tu esencia con nuestra colección exclusiva de accesorios.
                    <br className="hidden md:block" />
                    Diseñados para quienes entienden que el lujo está en los detalles.
                </motion.p>

                <motion.div
                    variants={titleVariants}
                    className="mt-12"
                >
                    <button
                        onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-white/80 hover:text-white text-xs tracking-[0.3em] uppercase border-b border-transparent hover:border-premium-gold transition-all duration-500 pb-1"
                    >
                        Explorar Colección
                    </button>
                </motion.div>
            </motion.div>

            {/* Animated Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/50"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <ChevronDown size={32} strokeWidth={1} />
            </motion.div>
        </div >
    );
};

export default Hero;
