import { IGame } from "../../../models/games";
import { sendEmail } from "../email.service";
import { generateAdminConfirmationEmailHTML } from "../mail_templates/orderStatus/adminOrderConfirmation.template";

export const sendAdminOrderConfirmation = (
  email: string[],
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[]
) => {
  const html = generateAdminConfirmationEmailHTML(
    bookedDays,
    deliveryOption,
    deliveryAddress,
    // orderStatus,
    sumOfOrder,
    userComment,
    games
  );

  return sendEmail({
    email,
    html,
    subject: "Нове замовлення PlayAtHome",
  });
};
