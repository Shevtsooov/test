import telegramApi from "node-telegram-bot-api";
import { ChatId } from '../../models/chatId';
const token = "6385076862:AAE_nxHFFhTwyoHtdd1g_kKv6YgO4K0YLvc";

const bot = new telegramApi(token, { polling: true });

export const startTgBot = async () => {
  console.log('Telegram Bot started');
  
  const allTheIds = await ChatId.find();
  const chatIds = allTheIds.map

  bot.setMyCommands([
    { command: "/start", description: "Привітання" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      const chatIdToSave = new ChatId({
        chatId,
      });

      await chatIdToSave.save();

      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/21.webp"
      );
      return bot.sendMessage(
        chatId,
        `Привіт, ${msg.from?.first_name}, радий вітати тебе у своєму тестовому боті! Сюди будуть приходити сповіщення про нові замовлення`
      );
    }

    await bot.sendSticker(
      chatId,
      "https://tlgrm.ru/_/stickers/8a1/9aa/8a19aab4-98c0-37cb-a3d4-491cb94d7e12/24.webp"
    );
    return bot.sendMessage(chatId, `Такої команди не існує. Спробуй ще раз`);
  });
};

export const sendTelegramNotification = async () => {
  const allTheIds = await ChatId.find();
  const allChatIds = allTheIds.map(id => id.chatId)
  const uniqueIds = new Set (allChatIds);
  const chatIds = Array.from(uniqueIds);

  chatIds.map(chatId => {
    bot.sendMessage(
      chatId,
     'Привіт, у нас нове замовлення. Переглянь його <a href="https://ps-rental-service.vercel.app/orders">тут</a>',
     {
       parse_mode: 'HTML',
     }
   )});
 }
