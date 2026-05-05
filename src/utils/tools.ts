
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
            const sanitized = expression.replace(/\s/g, '');
            if (!/^[0-9+\-*/().]+$/.test(sanitized)) {
                return "Error: Solo se permiten números y operadores básicos (+ - * / .)";
            }
            if (/[+\-*/]{2,}/.test(sanitized.replace(/\(/g, '').replace(/\)/g, ''))) {
                return "Error: Expresión inválida.";
            }
            const tokens: (number | string)[] = [];
            let currentNum = '';
            for (let i = 0; i < sanitized.length; i++) {
                const ch = sanitized[i];
                if (ch === '-' && (i === 0 || /[+\-*/(]/.test(sanitized[i - 1]))) {
                    currentNum += ch;
                } else if (/[0-9.]/.test(ch)) {
                    currentNum += ch;
                } else if ('+-*/()'.includes(ch)) {
                    if (currentNum !== '') {
                        const num = Number(currentNum);
                        if (isNaN(num)) return "Error: Número inválido.";
                        tokens.push(num);
                        currentNum = '';
                    }
                    tokens.push(ch);
                } else {
                    return "Error: Carácter no permitido.";
                }
            }
            if (currentNum !== '') {
                const num = Number(currentNum);
                if (isNaN(num)) return "Error: Número inválido.";
                tokens.push(num);
            }
            const applyOp = (op: string, b: number, a: number): number => {
                if (op === '+') return a + b;
                if (op === '-') return a - b;
                if (op === '*') return a * b;
                if (op === '/') {
                    if (b === 0) throw new Error('División por cero');
                    return a / b;
                }
                throw new Error('Operador desconocido');
            };
            const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };
            const values: number[] = [];
            const ops: string[] = [];
            for (const token of tokens) {
                if (typeof token === 'number') {
                    values.push(token);
                } else if (token === '(') {
                    ops.push(token);
                } else if (token === ')') {
                    while (ops.length && ops[ops.length - 1] !== '(') {
                        const op = ops.pop()!;
                        const b = values.pop()!;
                        const a = values.pop()!;
                        values.push(applyOp(op, b, a));
                    }
                    ops.pop();
                } else {
                    while (ops.length && ops[ops.length - 1] !== '(' && precedence[ops[ops.length - 1]] >= precedence[token]) {
                        const op = ops.pop()!;
                        const b = values.pop()!;
                        const a = values.pop()!;
                        values.push(applyOp(op, b, a));
                    }
                    ops.push(token);
                }
            }
            while (ops.length) {
                const op = ops.pop()!;
                const b = values.pop()!;
                const a = values.pop()!;
                values.push(applyOp(op, b, a));
            }
            const result = values[0];
            if (result === undefined || !isFinite(result)) {
                return "Error: Resultado inválido.";
            }
            return String(Math.round(result * 1e10) / 1e10);
        } catch (error: any) {
            return error.message === 'División por cero' ? "Error: División por cero." : "Error al calcular.";
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
