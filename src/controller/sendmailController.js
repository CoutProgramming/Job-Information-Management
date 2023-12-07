"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ngtri2312@gmail.com",
    pass: "wddqoevswtmsxenh",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Huu Tri" <ngtri2312@gmail.com>', // sender address
    to: "tringuyen23122001@gmail.com", // list of receivers
    subject: "Email thông báo ứng tuyển thành công", // Subject line
    text: "Ứng tuyển công việc thành công", // plain text body
    html: "<b>Ứng tuyển công việc thành công</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

// main().catch(console.error);

export default main;
