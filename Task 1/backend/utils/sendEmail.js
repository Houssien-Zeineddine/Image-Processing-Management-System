require('dotenv')

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASWORD
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
})

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    }

    try {
        await transporter.sendEmail(mailOptions)
        console.log(`Email sent to ${to}`)
    } catch ( error ) {
        console.log('Failed to send email:', error)
    }
}

module.exports = sendEmail