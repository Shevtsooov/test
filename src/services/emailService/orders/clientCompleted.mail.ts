import { IGame } from "../../../models/games";
import { IUser } from "../../../models/users";
import { sendEmail } from "../email.service";
import { generateClientCompletedEmailHTML } from "../mail_templates/orderStatus/clientOrderCompleted.template";

export const sendClientOrderCompleted = (
  user: IUser,
) => {
  const html = generateClientCompletedEmailHTML(user)

  return sendEmail({
    email: user.email,
    html,
    subject: 'Замовиш ще у PlayAtHome?'
  })
};
