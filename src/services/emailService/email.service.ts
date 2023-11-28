import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  auth: {
    user: "PlayAtHome@appic.fun",
    pass: "playathome",
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
    from: "PlayAtHome@appic.fun",
    to: email,
    subject,
    html,
  });
};
