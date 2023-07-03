const nodemailer = require('nodemailer');
const EmailModel = require('../models/emailModel');

class EmailController {
  async sendEmail(req, res) {
    try {
      const { from, to, subject, message } = req.body;

      // Validar los campos del formulario si es necesario

      const email = new EmailModel(from, to, subject, message);

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: email.from,
        to: email.to,
        subject: email.subject,
        text: email.message
      };

      await transporter.sendMail(mailOptions);

      res.render('success');
    } catch (error) {
      console.error(error);
      res.redirect('/error');
    }
  }

  emails(req, res) {
    res.render('mailer');
  }

  

  error(req, res) {
    res.send('¡Error al enviar el correo electrónico!');
  }
}

module.exports = new EmailController();
