// helpers/sendMail.helper.js

const nodemailer = require("nodemailer");

function sendMail(recieverEmailId, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter
    .sendMail({
      from: process.env.EMAIL_USER,
      to: recieverEmailId,
      subject,
      text: body,
    })
    .then((sentInfo) => {
      console.log("email sent: ", sentInfo);
    })
    .catch((error) => {
      console.log("email not sent: ", error);
      throw "OTP send failed, retry after some time";
    });
}

module.exports = { sendMail };
