import { Month } from "../../Types/Month";
import { ChatId } from "../../models/chatId";
import { IReview } from "../../models/reviews";
import { IUser } from "../../models/users";
import { bot } from "./tgBot";

export const sendTelegramReviewNotification = async (
  review: IReview,
  user: IUser,
) => {
  const {
    comment,
    stars,

  } = review;

  const allTheIds = await ChatId.find();
  const allChatIds = allTheIds.map(id => id.chatId)
  const uniqueIds = new Set (allChatIds);
  const chatIds = Array.from(uniqueIds);

  const userComment = comment !== ''
  ? `<b>✍🏻 Коментар:</b>
    <i>"${comment}"</i>`
  : `❌ Коментар відсутній`;

  let reviewStars = '';

  switch (stars) {
    case 1:
      reviewStars = '⭐'
      break;
    case 2:
      reviewStars = '⭐⭐'
      break;
    case 3:
      reviewStars = '⭐⭐⭐'
      break;
    case 4:
      reviewStars = '⭐⭐⭐⭐'
      break;
    case 5:
      reviewStars = '⭐⭐⭐⭐⭐'
      break;
  }

  chatIds.map(chatId => {
    bot.sendMessage(
      chatId,
      `💬 Новий відгук

👤Автор: ${user.fullName}
📱Номер телефону: <a href="tel:+38${user.phoneNumber}">+38${user.phoneNumber}</a>

${reviewStars}

${userComment}

🌐 Переглянь цей відгук <a href="${process.env.PRODUCTION_LINK}/reviews">на сайті</a>
__________________________
      `,
     {
       parse_mode: 'HTML',
       disable_web_page_preview: true,
       protect_content: true,
     }
   )});
 }
