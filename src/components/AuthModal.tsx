import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (userData: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Save to localStorage
                localStorage.setItem('rubi_user', JSON.stringify(data.user));
                window.dispatchEvent(new CustomEvent('authChange'));
                onSuccess(data.user);
                onClose();
            } else {
                setError(data.message || 'Error al registrarse. Intenta nuevamente.');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        {/* Header Image/Design */}
                        <div className="bg-premium-dark text-premium-cream p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1595166453712-4017686d63d0?auto=format&fit=crop&q=80&v=3')] bg-cover bg-center" />
                            <div className="relative z-10">
                                <h2 className="font-serif text-3xl mb-2">Bienvenido a Rubi</h2>
                                <p className="text-white/80 text-sm">Regístrate para acceder a nuestra colección exclusiva.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-premium-gold/50 focus:border-premium-gold outline-none transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-premium-gold/50 focus:border-premium-gold outline-none transition-all"
                                            placeholder="tucorreo@ejemplo.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-premium-gold/50 focus:border-premium-gold outline-none transition-all"
                                            placeholder="+54 9 ..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-premium-dark text-white py-4 rounded-lg font-bold tracking-wide hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        VER COLECCIÓN
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Al registrarte aceptas recibir novedades exclusivas de Rubi.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
