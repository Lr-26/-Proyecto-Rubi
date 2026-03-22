const { Resend } = require('resend');
require('dotenv').config();

// Create Resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a premium welcome email to a new user.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} name - The recipient's name.
 */
const sendWelcomeEmail = async (to, name) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log('⚠️ Email skipped: No RESEND_API_KEY configured.');
            return;
        }

        const { data, error } = await resend.emails.send({
            from: 'Rubi Lentes <onboarding@resend.dev>', // Change this once domain is verified
            to: [to],
            subject: '💎 Bienvenido al Universo Rubi - Acceso Exclusivo',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenida Premium - Rubi Lentes</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #050505; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050505; width: 100%; margin: 0 auto; max-width: 600px;">
                    <tr>
                        <td style="padding: 40px 20px;">
                            <!-- Header Section -->
                            <div style="text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 30px; margin-bottom: 40px;">
                                <h1 style="color: #ffffff; font-family: 'Times New Roman', Times, serif; font-size: 32px; letter-spacing: 4px; margin: 0; font-weight: normal; line-height: 1;">
                                    <span style="color: #cc0000;">RUBI</span> LENTES
                                </h1>
                                <p style="color: #D4AF37; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; margin-top: 15px; font-weight: 600;">
                                    Visionary Collection
                                </p>
                            </div>

                            <!-- Content Section -->
                            <div style="padding: 0 20px;">
                                <h2 style="font-family: 'Times New Roman', Times, serif; font-size: 24px; color: #ffffff; font-weight: normal; margin-bottom: 25px; letter-spacing: 1px;">
                                    Estimado/a ${name},
                                </h2>
                                
                                <p style="font-size: 15px; line-height: 1.8; color: #cccccc; margin-bottom: 25px; font-weight: 300;">
                                    Es un honor para nosotros darle la bienvenida oficial a nuestra comunidad exclusiva. En <strong>Rubi Lentes</strong>, forjamos piezas atemporales que definen la excelencia y elevan la sofisticación personal.
                                </p>

                                <p style="font-size: 15px; line-height: 1.8; color: #cccccc; margin-bottom: 35px; font-weight: 300;">
                                    Al unirse a nosotros, acaba de desbloquear el acceso a colecciones reservadas. Cada diseño bajo nuestra firma refleja una meticulosa atención artesanal y materiales de la más alta gama global.
                                </p>

                                <!-- Quote Box -->
                                <div style="background-color: #0a0a0a; border-left: 3px solid #D4AF37; padding: 25px 20px; margin: 35px 0;">
                                    <p style="margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 16px; font-style: italic; color: #D4AF37; line-height: 1.6; text-align: center;">
                                        "El lujo es una declaración silenciosa de quién eres."
                                    </p>
                                </div>

                                <p style="font-size: 15px; line-height: 1.8; color: #cccccc; margin-bottom: 40px; font-weight: 300;">
                                    Le invitamos a explorar nuestro catálogo privado. Si requiere asistencia personalizada, no dude en contactar a nuestro equipo de ventas a través de WhatsApp.
                                </p>

                                <!-- Signature -->
                                <div style="margin-top: 50px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 30px;">
                                    <p style="font-size: 14px; color: #ffffff; margin: 0; font-weight: 400; letter-spacing: 1px;">Mis mejores deseos,</p>
                                    <p style="font-family: 'Times New Roman', Times, serif; font-size: 20px; color: #D4AF37; margin: 10px 0 0 0; font-style: italic;">
                                        La Dirección de Rubi Lentes
                                    </p>
                                </div>
                            </div>

                            <!-- Footer Section -->
                            <div style="margin-top: 60px; text-align: center;">
                                <p style="font-size: 10px; color: #666666; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 10px 0;">
                                    Rubi Lentes &bull; Excelencia Definida
                                </p>
                                <p style="font-size: 10px; color: #444444; margin: 0;">
                                    Este mensaje ha sido enviado exclusivamente a ${to}.<br/>
                                    &copy; ${new Date().getFullYear()} Todos los derechos reservados.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `
        });

        if (error) {
            console.error('❌ Resend Error:', error);
            return;
        }

        console.log('📧 Welcome Email sent with Resend:', data.id);
        return data;
    } catch (error) {
        console.error('❌ Critical Mailer Error:', error);
    }
};

module.exports = { sendWelcomeEmail };
