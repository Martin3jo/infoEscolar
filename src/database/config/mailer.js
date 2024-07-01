//configuracion de nodemailer

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: 'dinamita.itse2024@gmail.com',
        pass: 'tetp yeac melb vhxp',
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error al configurar el transporte de nodemailer:', error);
    } else {
        console.log('Configuración del transporte de nodemailer correcta:', success);
    }
});

module.exports = transporter;