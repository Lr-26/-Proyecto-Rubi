import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contacto = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = React.useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || 'Hubo un error al enviar el mensaje.' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ type: 'error', message: 'Error de conexión. Asegúrate de que el servidor esté corriendo.' });
        }
    };

    return (
        <div className="pt-20 bg-premium-cream min-h-screen">
            <div className="bg-premium-dark text-premium-cream py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
                <div className="relative z-10">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4">Contáctanos</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">Estamos aquí para ayudarte. Envíanos un mensaje o visítanos.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="font-serif text-3xl text-premium-dark mb-6">Información</h2>
                        <p className="text-gray-600 mb-8">
                            ¿Tienes alguna pregunta sobre nuestros productos o necesitas asesoramiento personalizado?
                            No dudes en contactarnos. Nuestro equipo de expertos está listo para asistirte.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-premium-gold p-3 rounded-full text-white">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-premium-dark">Ubicación</h3>
                                    <p className="text-gray-600">Av. de la Moda 123, Ciudad de México, CDMX</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-premium-gold p-3 rounded-full text-white">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-premium-dark">Teléfono</h3>
                                    <p className="text-gray-600">+52 55 1234 5678</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-premium-gold p-3 rounded-full text-white">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-premium-dark">Email</h3>
                                    <p className="text-gray-600">contacto@rubidetails.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="font-serif text-3xl text-premium-dark mb-6">Envíanos un mensaje</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-premium-gold focus:border-premium-gold outline-none transition-colors"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-premium-gold focus:border-premium-gold outline-none transition-colors"
                                        placeholder="tucorreo@ejemplo.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-premium-gold focus:border-premium-gold outline-none transition-colors"
                                    placeholder="+52 55 1234 5678"
                                />
                            </div>

                            <div>
                                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-premium-gold focus:border-premium-gold outline-none transition-colors"
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full bg-premium-dark text-white py-3 px-6 rounded-sm font-bold tracking-wide hover:bg-premium-gold hover:text-premium-dark transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {status.type === 'loading' ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        ENVIAR MENSAJE
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
