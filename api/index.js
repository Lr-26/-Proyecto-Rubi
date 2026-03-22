// Backend server entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendWelcomeEmail } = require('./config/mailer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5005;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('PON_TU_URL')) {
    console.error('⚠️ CRUCIAL: Te faltan las credenciales de Supabase (SUPABASE_URL y SUPABASE_ANON_KEY). La base de datos no funcionará.');
    // Quitamos la simulación (mock) para que puedas ver el error real si algo falla.
}

try {
    supabase = createClient(supabaseUrl || "http://localhost", supabaseKey || "dummykey");
} catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error.message);
}

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes

// POST endpoint to register a user (Lead Capture)
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'Please provide all fields.' });
        }

        // Check if user already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(200).json({ success: true, message: 'Welcome back!', user: existingUser });
        }

        // Create new user
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ name, email, phone }])
            .select()
            .single();

        if (insertError) throw insertError;

        // En Vercel Serverless es OBLIGATORIO usar await. 
        // Si no esperamos a que el correo se envíe, Vercel "congela" la función ni bien hacemos res.status() y el correo nunca sale.
        console.log("Enviando correo de bienvenida...");
        sendWelcomeEmail(email, name)
            .then(() => console.log("Correo enviado con éxito."))
            .catch(err => console.error("Fallo al enviar el correo:", err));

        res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Error detallado registrando usuario:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error during registration.',
            details: error.details || 'Revisa los logs de Vercel'
        });
    }
});

// POST endpoint to save contact form data
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
        }

        const { error: insertError } = await supabase
            .from('contacts')
            .insert([{ name, email, phone, message }]);

        if (insertError) throw insertError;

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error enviando contacto:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error, please try again.',
            details: error.details || ''
        });
    }
});

const path = require('path');

app.get('/api/health', (req, res) => {
    res.send('API is running with Supabase...');
});

// Vercel serverless function export
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
