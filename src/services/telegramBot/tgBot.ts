import telegramApi from "node-telegram-bot-api";
import { ChatId } from '../../models/chatId';
import { IGame } from "../../models/games";
import { IUser } from "../../models/users";
import { Month } from "../../Types/Month";
import { ukrMonths } from "../../correctWordForms/months";
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TG_BOT_TOKEN as string;

export const bot = new telegramApi(token, { polling: true });

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


