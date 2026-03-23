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
            from: 'Rubi Lentes <onboarding@resend.dev>', // Cámbialo por hola@proyecto-rubi.vercel cuando esté verificado
            to: [to],
            subject: '💎 Bienvenido al Universo Rubi - Acceso Exclusivo',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Rubi Lentes - Membresía Exclusiva</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #000000; color: #ffffff; font-family: 'Times New Roman', Times, serif; -webkit-font-smoothing: antialiased;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #000000; width: 100%; margin: 0 auto; max-width: 600px; border: 1px solid #1a1a1a;">
                    <tr>
                        <td style="padding: 60px 40px;">
                            <!-- Header / Logo -->
                            <div style="text-align: center; margin-bottom: 50px;">
                                <h1 style="color: #ffffff; font-size: 38px; letter-spacing: 8px; margin: 0; font-weight: 300; text-transform: uppercase;">
                                    <span style="color: #cc0000;">RUBI</span> LENTES
                                </h1>
                                <div style="height: 1px; width: 60px; background-color: #D4AF37; margin: 20px auto;"></div>
                                <p style="color: #D4AF37; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; margin: 0;">Visionary Collection</p>
                            </div>

                            <!-- Greeting -->
                            <div style="margin-bottom: 35px;">
                                <h2 style="font-size: 26px; color: #ffffff; font-weight: 300; margin-bottom: 20px; letter-spacing: 1px;">
                                    Estimado/a <span style="color: #D4AF37;">${name}</span>,
                                </h2>
                                <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 200;">
                                    Nos complace confirmar su ingreso a la comunidad más selecta de óptica de lujo. En <strong>Rubi Lentes</strong>, no solo fabricamos lentes; diseñamos una extensión de su identidad.
                                </p>
                            </div>

                            <!-- Feature Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0a; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 4px; margin-bottom: 40px;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 15px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">Su Beneficio de Bienvenida</p>
                                        <p style="margin: 0; font-size: 20px; color: #ffffff; font-weight: 300;">Acceso prioritario a Lanzamientos y Consultoría de Estilo Personalizada.</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CALL TO ACTION BUTTON -->
                            <div style="text-align: center; margin: 50px 0;">
                                <a href="https://proyecto-rubi.vercel.app/lentes" style="background-color: #D4AF37; color: #000000; padding: 18px 45px; text-decoration: none; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; border-radius: 2px; display: inline-block; box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);">
                                    Explorar la Colección
                                </a>
                            </div>

                            <!-- Message -->
                            <div style="margin-bottom: 45px;">
                                <p style="font-size: 15px; line-height: 1.8; color: #aaaaaa; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; text-align: center;">
                                    Si desea agendar una cita o requiere asistencia directa, nuestro equipo de concierge está a su disposición a través de nuestros canales oficiales.
                                </p>
                            </div>

                            <!-- Footer / Signature -->
                            <div style="border-top: 1px solid #1a1a1a; padding-top: 40px; text-align: center;">
                                <p style="font-family: 'Times New Roman', Times, serif; font-size: 22px; color: #D4AF37; margin: 0 0 10px 0; font-style: italic;">
                                    Rubi Lentes
                                </p>
                                <p style="font-size: 11px; color: #666666; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 30px 0;">
                                    The Art of Vision
                                </p>
                                <p style="font-size: 10px; color: #444444; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6;">
                                    Este correo es una comunicación privada destinada a ${to}.<br/>
                                    &copy; ${new Date().getFullYear()} Rubi Lentes. Todos los derechos reservados.
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
