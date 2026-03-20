const nodemailer = require('nodemailer');
require('dotenv').config();

// Create Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // e.g. 'tucorreo@gmail.com'
        pass: process.env.EMAIL_PASS  // The App Password (16 chars)
    }
});

const sendWelcomeEmail = async (to, name) => {
    try {
        const mailOptions = {
            from: `"Rubi" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: 'Bienvenido al Mundo Rubi - Acceso Exclusivo',
            html: `
            <div style="font-family: 'Times New Roman', serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px;">
                <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 20px;">
                    <h1 style="color: #d4af37; margin: 0;">RUBI</h1>
                    <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; color: #666;">Luxury & Elegance</p>
                </div>
                
                <p>Estimado/a <strong>${name}</strong>,</p>
                
                <p>Es un placer darte la bienvenida a nuestra exclusiva comunidad.</p>
                
                <p>Ahora tienes acceso completo a nuestro catálogo de productos premium, donde cada pieza ha sido seleccionada por su calidad y distinción.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
                    <p style="margin: 0;"><em>"El estilo es una forma de decir quién eres sin tener que hablar."</em></p>
                </div>
                
                <p>Si tienes alguna pregunta o deseas asistencia personalizada, no dudes en responder a este correo o contactarnos a través de nuestra web.</p>
                
                <p style="margin-top: 30px;">Atentamente,</p>
                <p><strong>El Equipo de Rubi</strong></p>
                
                <div style="text-align: center; margin-top: 40px; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
                    &copy; ${new Date().getFullYear()} Rubi. Todos los derechos reservados.
                </div>
            </div>
            `
        };

        if (!process.env.EMAIL_PASS) {
            console.log('⚠️ Email skipped: No App Password configured.');
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Welcome Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
};

module.exports = { sendWelcomeEmail };
