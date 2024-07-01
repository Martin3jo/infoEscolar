const transporter = require('../database/config/mailer');

module.exports = {

  contacto: function contactoControllers(req, res) {
    res.render('contacto/contacto');
  },

  sendEmail: function (req, res, next) {
    const mailOptions = {
      from: 'dinamita.itse2024@gmail.com', // nos enviamos a nosotros mismos el mail
      to: 'dinamita.itse2024@gmail.com',
      subject: 'Consulta de ' + req.body.nombre + ' ' + req.body.apellido,
      text: + '\nEmail: ' + req.body.email + '\nMensaje: ' + req.body.mensaje,
      html: `
          <div style="background-color: #f5f5f5; padding: 20px;">
      <p style="color: #333;">Nombre: ${req.body.nombre}</p>
    <p style="color: #333;">Apellido: ${req.body.apellido}</p>
    <p style="color: #333;">Teléfono: ${req.body.telefono}</p>
    <p style="color: #333;">Email: ${req.body.email}</p>
    <p style="color: #333;">Mensaje: ${req.body.mensaje}</p>
  </div>
`

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).send('Error al enviar el correo');
      } else {
        console.log('Correo enviado:', info.response);
        res.send('Correo enviado');
      }
    });
  }


};
