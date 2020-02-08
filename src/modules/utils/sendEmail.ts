import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  console.log('creating new nodemailer account');
  let account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure:false,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const mailOptions = {
    form: '"Fred Foo " <foo@example.com>',
    to: email,
    subject: "Hello",
    text: "Hello word?",
    html: `<a href="${url}">${url}</a>`
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview Url: %s", nodemailer.getTestMessageUrl(info));
}