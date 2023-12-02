import { sendEmail } from "../email.service";
import { generatePasswordResetSuccessEmail } from "../mail_templates/user/passwordResetSuccess.template";

export const sendPasswordResetSuccessEmail = (
  email: string,
) => {

  const html = generatePasswordResetSuccessEmail();

  return sendEmail({
    email,
    html,
    subject: 'Пароль PlayAtHome було успішно відновлено'
  })
};
