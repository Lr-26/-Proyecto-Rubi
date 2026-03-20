require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lentes-cartera';

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
        console.log('✅ Conectado a MongoDB');

        try {
            const contacts = await Contact.find().sort({ createdAt: -1 });
            console.log('\n--- LISTA DE CONTACTOS RECIBIDOS ---\n');
            if (contacts.length === 0) {
                console.log('No hay mensajes aún.');
            } else {
                contacts.forEach((c, index) => {
                    console.log(`#${index + 1}`);
                    console.log(`Nombre: ${c.name}`);
                    console.log(`Email: ${c.email}`);
                    console.log(`Celular: ${c.phone || 'N/A'}`);
                    console.log(`Mensaje: ${c.message}`);
                    console.log(`Fecha: ${c.createdAt}`);
                    console.log('-----------------------------------');
                });
            }
        } catch (err) {
            console.error('Error al leer contactos:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('❌ Error de conexión:', err));
