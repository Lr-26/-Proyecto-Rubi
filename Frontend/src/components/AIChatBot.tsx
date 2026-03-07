import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { processMessageWithAI } from '../utils/ai_config';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type?: 'text' | 'system';
}

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: 'welcome',
                text: '¡Hola! Soy **Rubi Assistant**. ✨\n\n¿En qué puedo ayudarte hoy? Consultas sobre Lentes, Carteras o agendar una cita en el showroom.',
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);

        try {
            const history = messages.slice(-10).map(m => ({
                role: m.sender === 'user' ? 'user' : 'bot',
                content: m.text
            }));

            const response = await processMessageWithAI(inputText, history);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: response.reply,
                sender: 'bot',
                timestamp: new Date()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Lo siento, tuve un pequeño inconveniente. ¿Podrías intentar de nuevo?",
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-28 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] md:w-[400px] h-[550px] glass-dark rounded-3xl overflow-hidden mb-4 shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-r from-premium-ruby to-premium-ruby/80 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                                    <Sparkles className="text-premium-gold w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-serif text-lg leading-tight">Rubi Assistant</h3>
                                    <p className="text-white/60 text-[10px] uppercase tracking-widest">En línea • IA</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        >
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                                        msg.sender === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div className={cn(
                                        "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                                        msg.sender === 'user'
                                            ? "bg-premium-gold/20 text-white rounded-tr-none border border-premium-gold/30"
                                            : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                                    )}>
                                        <div className="markdown-chat">
                                            <ReactMarkdown>
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                        <p className="text-[9px] mt-2 opacity-40 text-right">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-premium-gold/50 rounded-full" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-premium-gold/50 rounded-full" />
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-premium-gold/50 rounded-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-black/40 border-t border-white/5">
                            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-1 border border-white/5">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm py-2"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-2 text-premium-gold hover:text-white transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-premium-ruby flex items-center justify-center text-white shadow-2xl hover:bg-premium-gold transition-colors duration-500 relative group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-premium-gold rounded-full flex items-center justify-center text-black text-[10px] font-bold">
                        1
                    </span>
                )}

                <span className="absolute right-20 bg-premium-dark text-white text-[10px] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest border border-white/10 shadow-xl">
                    ¿En qué puedo ayudarte?
                </span>
            </motion.button>
        </div>
    );
};

export default AIChatBot;
