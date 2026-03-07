require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');
const User = require('./models/User');
const { sendWelcomeEmail } = require('./config/mailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lentes-cartera';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes


// POST endpoint to register a user (Lead Capture)
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'Please provide all fields.' });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ success: true, message: 'Welcome back!', user });
        }

        // Create new user
        user = new User({ name, email, phone });
        await user.save();

        // Send Welcome Email (Async, don't wait for it)
        sendWelcomeEmail(email, name).catch(err => console.error("Email failed:", err));

        res.status(201).json({ success: true, message: 'Registration successful', user });
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

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });

        await newContact.save();

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
});

const path = require('path');

app.get('/api/health', (req, res) => {
    res.send('API is running...');
});

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Fallback to React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
