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
async function main(job, date) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Huu Tri" <ngtri2312@gmail.com>', // sender address
    to: "tringuyen23122001@gmail.com", // list of receivers
    subject: "Email thông báo ứng tuyển thành công", // Subject line
    text: "Ứng tuyển công việc thành công", // plain text body
    html: `<b>Ứng tuyển công việc thành công vào công việc có mã là ${job} vào ngày ${date}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

async function mailPhongVan(date) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Huu Tri" <ngtri2312@gmail.com>', // sender address
    to: "tringuyen23122001@gmail.com", // list of receivers
    subject: "Email thông báo lịch phỏng vấn", // Subject line
    text: "Thư mời phỏng vấn", // plain text body
    html: `<b>${date}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

// main().catch(console.error);

export {main, mailPhongVan};
