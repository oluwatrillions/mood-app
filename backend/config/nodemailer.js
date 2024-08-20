const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
})

module.exports = {transporter}