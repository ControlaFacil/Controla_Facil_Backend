const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function enviarEmailVerificacao() {
    await transporter.sendMail({
        from: 'controlafaciluscs@gmail.com',
        to: 'guilherme.galdino@uscsonline.com.br',
        subject: "Verificação de E-mail - Controla Fácil",
        html: `
            <h1>Verificação de E-mail</h1>
            <p>Clique no link abaixo para verificar seu e-mail:</p>
            <a href="#">Verificar E-mail</a>
        `
    })
}

module.exports = { enviarEmailVerificacao };