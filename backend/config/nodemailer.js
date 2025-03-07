const nodemailer = require("nodemailer");

const sendVerificationEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    debug: false,
    logger: true,
  });

  const messageOptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(messageOptions);
};

module.exports = sendVerificationEmail;
