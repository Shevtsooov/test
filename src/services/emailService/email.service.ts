import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  auth: {
    user: "contact.shevtsov@zohomail.eu",
    pass: "X738 XMc5 gwWc",
  },
});

interface sendEmail {
  email: string | string[],
  subject: string,
  html: string,
};

export const sendEmail = ({
  email,
  subject,
  html
}: sendEmail) => {
  return transporter.sendMail({
    from: "contact.shevtsov@zohomail.eu",
    to: email,
    subject,
    html,
  });
};
