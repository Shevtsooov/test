import { sendEmail } from "../email.service";
import { generatePasswordResetEmail } from "../mail_templates/user/passwordReset.template";

export const sendPasswordResetEmail = (
  email: string,
  token: string,
  ) => {

  const html = generatePasswordResetEmail(token);

  return sendEmail({
    email,
    html,
    subject: 'Відновлення паролю PlayAtHome'
  })
};
