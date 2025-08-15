require('dotenv')

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PAssword
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
})