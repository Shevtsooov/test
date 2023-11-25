import { sendEmail } from "../email.service";
import { genereateActivationEmail } from "../mail_templates/user/activation.template";

export const sendActivation = (
  email: string,
  token: string,
  ) => {

  const html = genereateActivationEmail(token);

  return sendEmail({
    email,
    html,
    subject: 'Активація аккаунту PlayAtHome'
  })
};
