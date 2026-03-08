import { GoogleGenerativeAI } from "@google/generative-ai";
import { calculatorTool } from './tools';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let model: any = null;

if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });
}

export interface AIParsedResult {
    text: string;
    date?: Date;
    isEvent: boolean;
    reply: string;
    location?: string;
    people?: string;
    toolUsed?: string;
    toolOutput?: string;
}

const simpleParser = (message: string): AIParsedResult => {
    return {
        text: message,
        isEvent: false,
        reply: "Actualmente estoy operando en modo simplificado. ¿En qué puedo ayudarte con tus Lentes o Carteras?"
    };
};

export const processMessageWithAI = async (message: string, history: { role: string, content: string }[] = []): Promise<AIParsedResult> => {
    if (!model) {
        return simpleParser(message);
    }

    const recentHistory = history.slice(-10).map(h => ({
        role: h.role === 'bot' ? 'model' : 'user',
        parts: [{ text: h.content }]
    }));

    const systemPrompt = `
    Eres "Rubi Assistant", el asistente virtual de "Rubi Details", una tienda boutique de accesorios de lujo.
    
    Tu objetivo es ayudar a los clientes con:
    1. Información sobre nuestras categorías: Lentes, Carteras y Billeteras, y Ropa Deportiva.
    2. Agendar citas para showroom o consultas personalizadas.
    3. Responder dudas sobre envíos y stock.
    
    Personalidad: Elegante, servicial, profesional y moderna. Siempre usa un tono amable y sofisticado.
    
    Herramientas:
    - calculator: Para sumar presupuestos o descuentos.
    - scheduleEvent: Para agendar visitas al showroom.
    
    Hoy es: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' })}
    
    Responde SIEMPRE en formato JSON si vas a usar una herramienta o dar una respuesta de chat:
    {
      "tool": "calculator" | "scheduleEvent" (opcional),
      "parameters": { ... } (si hay tool),
      "reply": "Tu mensaje aquí",
      "isEvent": boolean
    }
    `;

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: systemPrompt }]
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Soy Rubi Assistant y estoy lista para ayudar a los clientes de Rubi Details con elegancia y eficiencia." }]
            },
            ...recentHistory
        ]
    });

    try {
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(cleanText);

            if (data.tool === 'calculator') {
                const calcResult = await calculatorTool.function(data.parameters);
                return {
                    text: `Calculando para ti...`,
                    isEvent: false,
                    reply: `El cálculo total es: **${calcResult}**. ¿Deseas algo más?`,
                    toolUsed: 'calculator',
                    toolOutput: calcResult
                };
            }

            if (data.tool === 'scheduleEvent') {
                return {
                    text: data.parameters.summary,
                    date: new Date(data.parameters.date),
                    isEvent: true,
                    reply: data.reply || "Perfecto, he agendado tu cita en el showroom.",
                    toolUsed: 'scheduleEvent'
                };
            }

            return {
                text: message,
                isEvent: data.isEvent || false,
                reply: data.reply || text
            };
        } catch (e) {
            return {
                text: message,
                isEvent: false,
                reply: text
            };
        }
    } catch (error) {
        return simpleParser(message);
    }
};
