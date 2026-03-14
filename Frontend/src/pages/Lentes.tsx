
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Loader2, ShieldCheck, Zap, Crown, Sparkles, Diamond } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, Product, ProductData } from '../data/products';
import ProductModal from '../components/ProductModal';

interface SectionProps {
    id?: string;
    title: string;
    subtitle: string;
    items: Product[];
    bgClass?: string;
    accentColor: string;
    icon: React.ReactNode;
    onProductClick: (product: Product) => void;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, items, bgClass = "bg-white", accentColor, icon, onProductClick }) => (
    <section id={id} className={`py-24 relative overflow-hidden ${bgClass}`}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-current rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ color: accentColor }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-current rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ color: accentColor }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-6" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                    {icon}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-premium-dark mb-4 tracking-tight uppercase">
                    {title}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-light italic text-lg">
                    {subtitle}
                </p>
                <div className="mt-8 flex justify-center">
                    <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }} />
                </div>
            </motion.div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard
                                {...item}
                                category={title}
                                variant="premium"
                                onClick={() => onProductClick(item)}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-black/5 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-400 font-light">Próximamente nuevas incorporaciones a esta colección.</p>
                </div>
            )}
        </div>
    </section>
);

const SubNavbar = () => {
    const [activeSection, setActiveSection] = useState('premium');

    const navItems = [
        { id: 'premium', label: 'Premium', icon: <Crown size={16} /> },
        { id: 'plus', label: 'Plus', icon: <Zap size={16} /> },
        { id: 'standard', label: 'Estándar', icon: <ShieldCheck size={16} /> }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                // Detect when section enters the top 30% of the viewport
                rootMargin: '-30% 0px -69% 0px',
                threshold: 0
            }
        );

        const targets = ['premium-header', 'plus-section', 'standard-section'];
        targets.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 140; // Navbar + SubNavbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="sticky top-20 z-40 w-full bg-premium-dark border-b border-premium-gold/30 py-4 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4 md:gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id === 'premium' ? 'premium-header' : `${item.id}-section`)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 ${(activeSection === 'premium-header' && item.id === 'premium') ||
                                (activeSection === `${item.id}-section`)
                                ? 'bg-premium-gold text-premium-dark shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105 font-bold'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {item.icon}
                        <span className="text-sm font-serif uppercase tracking-wider">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const Lentes = () => {
    const [products, setProducts] = useState<ProductData['lentesSol'] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isOverHero, setIsOverHero] = useState(false);

    // Parallax mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth movement with springs
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform values for different layers (different intensities for depth)
    // Map from client coordinates to a displacement from center
    const bgX = useTransform(springX, [0, 2000], [-30, 30]);
    const bgY = useTransform(springY, [0, 1000], [-30, 30]);

    const imageX = useTransform(springX, [0, 2000], [-60, 60]);
    const imageY = useTransform(springY, [0, 1000], [-60, 60]);

    const glowX = useTransform(springX, [0, 2000], [70, -70]);
    const glowY = useTransform(springY, [0, 1000], [70, -70]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    const cursorX = useSpring(mouseX, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(mouseY, { damping: 20, stiffness: 250 });

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data?.lentesSol || null);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-premium-cream">
                <div className="text-center">
                    <Loader2 className="animate-spin text-premium-gold mx-auto mb-4" size={48} />
                    <p className="text-premium-dark font-serif italic">Preparando la colección...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="pt-20 min-h-screen bg-neutral-50 selection:bg-premium-gold selection:text-white"
            onMouseMove={handleMouseMove}
        >
            {/* Custom Cursor Light */}
            <motion.div
                animate={{ opacity: isOverHero ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    left: 0,
                    top: 0,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(197, 160, 89, 0.5) 40%, rgba(197, 160, 89, 0) 70%)',
                    boxShadow: '0 0 40px 10px rgba(197, 160, 89, 0.4)'
                }}
            />
            {/* Central Glow Bulb */}
            <motion.div
                animate={{ opacity: isOverHero ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_15px_rgba(255,255,255,1)]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    left: 0,
                    top: 0,
                }}
            />
            <motion.div
                animate={{ opacity: isOverHero ? 0.2 : 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    left: 0,
                    top: 0,
                    background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)'
                }}
            />

            {/* 2. SubNavbar FIRST (above image, below main nav) */}
            <SubNavbar />
            {/* 1. Ultra Premium Hero Section */}
            <div
                className={`relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#020202] ${isOverHero ? 'cursor-none' : 'cursor-default'}`}
                onMouseEnter={() => setIsOverHero(true)}
                onMouseLeave={() => setIsOverHero(false)}
            >
                {/* Parallax Background Layer */}
                <motion.div
                    style={{ x: bgX, y: bgY, scale: 1.1 }}
                    className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1595166453712-4017686d63d0?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center grayscale"
                />

                {/* --- MOVING LIGHT SYSTEM (Professional Background Effects) --- */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Floating Soft Gold Light Orb */}
                    <motion.div
                        animate={{
                            x: [-100, 100, -50, 0],
                            y: [-50, 50, 100, 0],
                            opacity: [0.1, 0.2, 0.15, 0.1]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#c5a059] rounded-full blur-[150px]"
                    />

                    {/* Drifting Ruby Light Orb */}
                    <motion.div
                        animate={{
                            x: [100, -100, 50, 0],
                            y: [50, -100, -50, 0],
                            opacity: [0.05, 0.15, 0.1, 0.05]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#8b0000] rounded-full blur-[150px]"
                    />

                    {/* Sweeping Spotlight (High-End Effect) */}
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0"
                        style={{ transformOrigin: 'center center' }}
                    />
                </div>

                {/* Atmospheric Glows (Ruby & Gold) - Tracked by Mouse */}
                <motion.div
                    style={{ x: glowX, y: glowY }}
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-[#8b0000]/20 rounded-full blur-[120px] z-10"
                />
                <motion.div
                    style={{ x: glowY, y: glowX }}
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#c5a059]/20 rounded-full blur-[120px] z-10"
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center w-full">
                    {/* The Circular Portal Container */}
                    <motion.div
                        style={{ x: bgX, y: bgY }}
                        className="relative w-[320px] h-[320px] md:w-[550px] md:h-[550px] rounded-full border border-premium-gold/30 flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_0_100px_rgba(197,160,89,0.1)] z-20"
                    >
                        {/* Internal Atmospheric Glows inside the circle */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#8b0000]/15 via-transparent to-[#c5a059]/10 pointer-events-none" />

                        {/* The Sunglasses restricted to this circle with Additive Blending to remove all artifacts */}
                        <motion.img
                            src="/assets/premium_sunglasses_hero.png"
                            alt="Premium Sunglasses"
                            style={{
                                x: imageX,
                                y: imageY,
                                filter: 'contrast(1.1) brightness(1.05)',
                                maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                                WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.15 }}
                            transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                            className="w-[88%] h-[88%] object-contain z-30 pointer-events-none mix-blend-screen drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        />

                        {/* Shimmer effect inside circle */}
                        <motion.div
                            animate={{ x: [-500, 500] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                        />
                    </motion.div>

                    {/* Floating Hero Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="font-serif text-7xl md:text-[13rem] text-white uppercase tracking-tighter mix-blend-difference opacity-90"
                        >
                            Lentes
                        </motion.h1>
                    </div>

                    {/* Caption */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-8 text-premium-gold/60 text-[10px] tracking-[0.5em] uppercase font-bold z-20"
                    >
                        Lux Visionary Collection
                    </motion.p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-30">
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
                </div>
            </div>

            {/* 2. SubNavbar SECOND */}
            <SubNavbar />

            {/* --- HEADER LÍNEA PREMIUM --- */}
            <div id="premium-header" className="py-20 bg-gradient-to-b from-premium-dark to-neutral-50 border-b border-premium-gold/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-premium-gold tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Exclusividad Absoluta</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight uppercase mb-6">
                        Línea Premium
                    </h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto font-light italic">
                        El pináculo de la exclusividad. Descubre nuestra selección curada de las casas de moda más prestigiosas del mundo.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Crown className="text-premium-gold opacity-50" size={24} />
                    </div>
                </div>
            </div>

            {/* --- SECCIONES PREMIUM DIVIDIDAS POR MARCAS --- */}

            {/* Miu Miu */}
            <Section
                title="Miu Miu"
                subtitle="Diseños ópticos y de sol con un estilo vanguardista y decididamente femenino."
                items={(products?.premium || []).filter(p => p.brand === 'Miu Miu')}
                accentColor="#E8B4B8" // Premium dusty pink
                icon={<Sparkles size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            {/* Prada */}
            <Section
                title="Prada"
                subtitle="Lujo geométrico, deportividad y minimalismo moderno en su máxima expresión."
                items={(products?.premium || []).filter(p => p.brand === 'Prada')}
                accentColor="#000000" // Premium Black
                icon={<Diamond size={32} />}
                bgClass="bg-neutral-100"
                onProductClick={handleProductClick}
            />

            {/* Chanel */}
            <Section
                title="Chanel"
                subtitle="La elegancia atemporal, siluetas clásicas y detalles verdaderamente exclusivos."
                items={(products?.premium || []).filter(p => p.brand === 'Chanel')}
                accentColor="#D4AF37" // Premium Gold
                icon={<Crown size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            {/* Dior */}
            <Section
                title="Dior"
                subtitle="Diseño atrevido y elegante, con detalles distintivos y sofisticados."
                items={(products?.premium || []).filter(p => p.brand === 'Dior')}
                accentColor="#111111" // Dark Grey/Black for Dior
                icon={<Sparkles size={32} />}
                bgClass="bg-neutral-50"
                onProductClick={handleProductClick}
            />

            {/* --- HEADER LÍNEA PLUS --- */}
            <div id="plus-section" className="py-20 bg-gradient-to-b from-neutral-900 to-neutral-50 border-b border-premium-ruby/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-premium-ruby tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Elegancia Distinguida</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight uppercase mb-6">
                        Línea Plus
                    </h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto font-light italic">
                        El equilibrio perfecto entre diseño contemporáneo y distinción. Una selección diseñada para quienes buscan piezas únicas con un carácter sofisticado y moderno.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Zap className="text-premium-ruby opacity-50" size={24} />
                    </div>
                </div>
            </div>

            <Section
                title="Línea Plus"
                subtitle="Equilibrio perfecto entre sofisticación moderna y versatilidad diaria."
                items={products?.plus || []}
                accentColor="#8B0000" // Premium Ruby/Dark Red
                icon={<Zap size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            <Section
                title="Línea Plus - Descanso"
                subtitle="Protección y salud visual con tecnología de filtro azul para el mundo digital."
                items={(products as any)?.plusDescanso || []}
                accentColor="#4682B4" // Steel Blue
                icon={<ShieldCheck size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            {/* --- HEADER LÍNEA ESTÁNDAR --- */}
            <div id="standard-section" className="py-20 bg-gradient-to-b from-neutral-800 to-neutral-50 border-b border-gray-400/20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-gray-400 tracking-[0.4em] text-sm uppercase mb-4 block font-medium">Estilo Atemporal</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight uppercase mb-6">
                        Línea Estándar
                    </h2>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto font-light italic">
                        La esencia de lo clásico con calidad impecable. Diseños versátiles que definen tu imagen diaria con una sofisticación natural y elegancia funcional.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <ShieldCheck className="text-gray-400 opacity-50" size={24} />
                    </div>
                </div>
            </div>

            <Section
                title="Línea Estándar"
                subtitle="Esenciales atemporales. La base fundamental del estilo contemporáneo."
                items={products?.standard || []}
                accentColor="#1A1A1A" // Dark/Neutral
                icon={<ShieldCheck size={32} />}
                bgClass="bg-white"
                onProductClick={handleProductClick}
            />

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default Lentes;
