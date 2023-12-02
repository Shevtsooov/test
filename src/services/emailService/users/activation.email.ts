import { sendEmail } from "../email.service";
import { generateActivationEmail } from "../mail_templates/user/activation.template";

export const sendActivation = (
  email: string,
  token: string,
  ) => {

  const html = generateActivationEmail(token);

  return sendEmail({
    email,
    html,
    subject: 'Активація аккаунту PlayAtHome'
  })
};
