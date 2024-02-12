const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_ADMINISTRATOR } = process.env;
const { User } = require("../db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});
if(!transporter){
    console.error("Error al crear el transporter");
}

 const sendNewIncidence = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    const optionsRegisterMail = {
      from: "INCIDENCIAS SAC",
      to: MAIL_ADMINISTRATOR,
      subject: "Nueva Incidencia Registrada",
      html: `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>NUEVA INCIDENCIA DE ${user.name}</title>
        <style>
            body {
                font-family: Poppins, sans-serif;
                background-color: #f2f2f2;
                color: #333333;
                font-size: 16px;
                line-height: 1.5;
                margin: 0;
                padding: 0;
                align-items: center;
                justify-content: center;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                border: 1px solid black;
                text-align: center;
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .content {
                margin-bottom: 30px;
            }
    
            .thank-you {
                font-size: 24px;
                margin-bottom: 10px;
            }
    
            .message {
                font-size: 16px;
                line-height: 1.5;
            }
    
            .cta-button {
              display: inline-block;
              align-items: center;
              justify-content: center;
              padding: 10px 20px;
              background-color: #f2f2f2;
              color: #000000;
              text-decoration: none;
              text-style: none;
              border-radius: 5px;
            }
    
            .footer {
                text-align: center;
                font-size: 14px;
                font-weight: 800;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Hemos Recibido una nueva incidencia!</h1>
            </div>
            <div class="content">
                <p class="thank-you">¡Hola Administrador!</p>
                <p class="message">Tenemos una nuevo reporte por parte de ${user.name}<br/> 
                Este mensaje es para comunicarte que el residente ${user.name} ha registrado una nueva incidencia
                y necesita de tu ayuda para poder resolverla</p>
                <p class="message">No olvides que si hay alguna duda al respecto deja un comentario en la incidencia.</p>
                <p class="message">Haz click en el botón de abajo para ir directamente al sitio y atenderlo ahora.</p>
                <a class="cta-button" href="https://incident-manager-client.vercel.app">Visitar Incidencias App</a>
            </div>
            <div class="footer">
                <p>© 2024 Incidencias App. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    
    </html>`,
    };

    transporter.sendMail(optionsRegisterMail, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado con éxito");
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
};

exports.sendNewIncidence = sendNewIncidence