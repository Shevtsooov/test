import { Month } from "../../Types/Month";
import { ukrMonths } from "../../correctWordForms/months";
import { ChatId } from "../../models/chatId";
import { IGame } from "../../models/games";
import { IUser } from "../../models/users";
import { bot } from "./tgBot";

export const sendTelegramOrderNotification = async (
  user: IUser,
  bookedDays: string[],
  deliveryOption: string,
  deliveryAddress: string,
  orderStatus: string,
  sumOfOrder: number,
  userComment: string,
  games: IGame[]
) => {
  const allTheIds = await ChatId.find();
  const allChatIds = allTheIds.map(id => id.chatId)
  const uniqueIds = new Set (allChatIds);
  const chatIds = Array.from(uniqueIds);

  let [fbMonth, fbDay] = bookedDays[0].split(' ');
  if (fbDay[0] === '0') {
    fbDay = fbDay[1]
  };
  const firstDay = `${fbDay} ${ukrMonths[fbMonth as keyof Month]}`

  let [lbMonth, lbDay] = bookedDays[bookedDays.length - 1].split(' ');
  if (lbDay[0] === '0') {
    lbDay = lbDay[1]
  };
  const lastDay = `${lbDay} ${ukrMonths[lbMonth as keyof Month]}`

  let correctDayWord = bookedDays.length > 4
  ? 'діб'
  : 'доби'

  const days = bookedDays.length > 1
  ? `📅 Заброньовані дні:
      <b>${firstDay} - ${lastDay}: ${bookedDays.length} ${correctDayWord}</b>`
  : `📅 Заброньований день:
      <b>${firstDay}: 1 доба</b>`;

  const chosenGames = games.map(game => (
    `  •   <a href="${process.env.PRODUCTION_LINK}/games/${game.gameId}">${game.title}</a>`
  ))
  
  const renderedGames = chosenGames.join(',\n');

  const delivery = deliveryOption === 'Доставка'
    ? `📍 Адреса доставки: <a href="https://www.google.com/maps/search/?api=1&query=${deliveryAddress}
">${deliveryAddress}</a>`
    : ``;

  const comment = userComment !== ''
    ? `<b>✍🏻 Коментар:</b>
      <i>"${userComment}"</i>`
    : `❌ Коментар відсутній`;

  chatIds.map(chatId => {
    bot.sendMessage(
      chatId,
      `🛒 Нове замовлення 🎉

👤Замовник: ${user.fullName}
📱Номер телефону: <a href="tel:+38${user.phoneNumber}">+38${user.phoneNumber}</a>

${comment}

${days}

🚚 Спосіб доставки: <b>${deliveryOption}</b>
${delivery}

🎮 Обрані ігри: <b>${chosenGames.length} шт.</b> 
${renderedGames}

💸 Сума: <b>${sumOfOrder}грн</b>

🌐 Переглянь це замовлення <a href="${process.env.PRODUCTION_LINK}/orders">на сайті</a>
__________________________
      `,
     {
       parse_mode: 'HTML',
       disable_web_page_preview: true,
      //  protect_content: true,
     }
   )});
 }
