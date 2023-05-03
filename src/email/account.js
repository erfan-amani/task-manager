const nodemailer = require("nodemailer");
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  tls: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email server is ready to take our messages");
//   }
// });

const sendWelcomeEmail = async (email, name) => {
  transporter.sendMail({
    from: "Test App <info@mail.erfanamanabadi.ir>",
    to: email,
    subject: "Thanks for joining us!",
    text: `Welcome to app ${name}. Please contact us when you have any question.`,
  });
  // .then(() => console.log("OK, Email has been sent."))
  // .catch(console.error);
};

const sendCancelEmail = async (email, name) => {
  transporter.sendMail({
    from: "Test App <info@mail.erfanamanabadi.ir>",
    to: email,
    subject: "Sorry to see you go!",
    text: `Good bye ${name}. We hope to see you back later soon.`,
  });
  // .then(() => console.log("OK, Email has been sent."))
  // .catch(console.error);
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
