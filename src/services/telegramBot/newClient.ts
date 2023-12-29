
import { ChatId } from "../../models/chatId";
import { IUser } from "../../models/users";
import { bot } from "./tgBot";

export const sendTelegramNewClientNotification = async (
  user: IUser,
) => {
  const allTheIds = await ChatId.find();
  const allChatIds = allTheIds.map(id => id.chatId)
  const uniqueIds = new Set (allChatIds);
  const chatIds = Array.from(uniqueIds);

  const { fullName, address } = user;

  chatIds.map(chatId => {
    bot.sendMessage(
      chatId,
      `У нас новий клієнт 🥳

👤 ${fullName}
🏠 ${address}
      `,
     {
       parse_mode: 'HTML',
       disable_web_page_preview: true,
      //  protect_content: true,
     }
   )});
 }
