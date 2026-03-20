
export interface Tool {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: Record<string, any>;
        required?: string[];
    };
    function: (args: any) => Promise<string>;
}

export const calculatorTool: Tool = {
    name: "calculator",
    description: "Realiza cálculos matemáticos simples y complejos. Úsalo cuando el usuario pida sumar, restar, multiplicar, dividir, etc.",
    parameters: {
        type: "object",
        properties: {
            expression: {
                type: "string",
                description: "La expresión matemática a evaluar, ej: '25 * 48' o '100 / 4'"
            }
        },
        required: ["expression"]
    },
    function: async ({ expression }) => {
        try {
            if (/[^0-9+\-*/().\s]/.test(expression)) {
                return "Error: Solo se permiten números y operadores básicos (+ - * / .)";
            }
            const result = new Function(`return ${expression}`)();
            return String(result);
        } catch (error) {
            return "Error al calcular.";
        }
    }
};

export const schedulerToolDef = {
    name: "scheduleEvent",
    description: "Agenda un evento, reunión o recordatorio en el calendario del negocio.",
    parameters: {
        type: "object",
        properties: {
            summary: { type: "string", description: "El título o resumen del evento" },
            date: { type: "string", description: "Fecha y hora en formato ISO" },
            location: { type: "string", description: "Lugar del evento (opcional)" },
            people: { type: "string", description: "Personas involucradas (opcional)" }
        },
        required: ["summary", "date"]
    }
};
