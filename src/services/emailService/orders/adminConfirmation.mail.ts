import { IGame } from "../../../models/games";
import { IUser } from "../../../models/users";
import { sendEmail } from "../email.service";
import { generateAdminConfirmationEmailHTML } from "../mail_templates/orderStatus/adminOrderConfirmation.template";

export const sendAdminOrderConfirmation = (
  user: IUser,
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[]
) => {
  const html = generateAdminConfirmationEmailHTML(
    user,
    bookedDays,
    deliveryOption,
    deliveryAddress,
    // orderStatus,
    sumOfOrder,
    userComment,
    games
  );

  return sendEmail({
    email: ["igorshevtsooov1995@gmail.com", "contact.shevtsov@gmail.com"],
    html,
    subject: "Нове замовлення PlayAtHome",
  });
};
