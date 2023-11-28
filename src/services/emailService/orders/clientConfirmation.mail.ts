import { IGame } from "../../../models/games";
import { IUser } from "../../../models/users";
import { sendEmail } from "../email.service";
import { generateClientConfirmationEmailHTML } from "../mail_templates/orderStatus/clientOrderConfirmation.template";

export const sendClientOrderConfirmation = (
  user: IUser,
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[],
) => {
  const html = generateClientConfirmationEmailHTML(
    bookedDays,
    deliveryOption,
    deliveryAddress,
    // orderStatus,
    sumOfOrder,
    userComment,
    games,
  )

  return sendEmail({
    email: user.email,
    html,
    subject: 'Ваше нове замовлення PlayAtHome'
  })
};
