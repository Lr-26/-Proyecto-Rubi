require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendWelcomeEmail } = require('./config/mailer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('PON_TU_URL')) {
    console.warn('⚠️ Supabase credentials missing or invalid. API functionality will be limited.');
    // Mock supabase to prevent crashes
    supabase = {
        from: (table) => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
            insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) })
        })
    };
} else {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (error) {
        console.error('❌ Failed to initialize Supabase client:', error.message);
        supabase = {
            from: () => ({ select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase error' } }) }) }), insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase error' } }) }) }) })
        };
    }
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

        // Send Welcome Email (Async, don't wait for it)
        sendWelcomeEmail(email, name).catch(err => console.error("Email failed:", err));

        res.status(201).json({ success: true, message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
});

// POST endpoint to save contact form data
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
        }

        const { error: insertError } = await supabase
            .from('contacts')
            .insert([{ name, email, phone, message }]);

        if (insertError) throw insertError;

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
});

const path = require('path');

app.get('/api/health', (req, res) => {
    res.send('API is running with Supabase...');
});

// Serve Frontend Static Files
const frontendPath = path.resolve(__dirname, '../Frontend/dist');
const assetsPath = path.resolve(frontendPath, 'assets');
console.log(`Frontend Path: ${frontendPath}`);
console.log(`Assets Path: ${assetsPath}`);

// 1. Explicitly serve assets folder with custom logging and MIME types
app.use('/assets', (req, res, next) => {
    const filePath = path.join(assetsPath, decodeURIComponent(req.url));
    const ext = path.extname(filePath).toLowerCase();

    // Explicitly set MIME types to avoid "text/html" issues
    if (ext === '.js') {
        res.type('application/javascript');
    } else if (ext === '.css') {
        res.type('text/css');
    }

    console.log(`[Asset Request] ${req.url} -> ${filePath} (Type: ${res.get('Content-Type')})`);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`❌ [Asset Error] ${err.message} for ${req.url}`);
            next();
        } else {
            console.log(`✅ [Asset Success] Served ${req.url}`);
        }
    });
});

// 2. Serve other static files from root
app.use(express.static(frontendPath));

// 3. Fallback to index.html for client-side routing
app.get('*', (req, res) => {
    if (req.url.startsWith('/api/')) {
        return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }

    const indexPath = path.resolve(frontendPath, 'index.html');
    console.log(`[${new Date().toISOString()}] Catch-all: ${req.url} -> ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('❌ SendFile Error:', err.message);
            if (!res.headersSent) {
                res.status(err.status || 500).send(`Server Error: ${err.message}`);
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Force restart 7: Rebuilt ProductCard.tsx to make cards smaller
