import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  auth: {
    user: "contact.shevtsov@zohomail.eu",
    pass: "X738 XMc5 gwWc",
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'contact.shevtsov@zohomail.eu', // sender address
    to: "contact.shevtsov@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
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

interface sendEmail {
  email: string,
  subject: string,
  html: string,
}


export const sendEmail = ({
  email,
  subject,
  html
}: sendEmail) => {
  return transporter.sendMail({
    to: email,
    subject,
    html,
  });
};

export const sendActivation = (
  email: string,
  token: string,
  ) => {
  const href = `https://ps-rental-service.vercel.app/activate/${token}`
  const html = `
    <h1>Activate account</h1>
    <a href="${href}">${href}</a>
  `;

  sendEmail({
    email,
    html,
    subject: 'Активація аккаунту PlayAtHome'
  })
};

export const mailService = {
  sendEmail,
  sendActivation,
}
