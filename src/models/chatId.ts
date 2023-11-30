import mongoose from 'mongoose';
type ChatId = {
  chatId: number,
};

const chatIdSchema = new mongoose.Schema<ChatId>({
  chatId: {
    type: Number,
  },
})

export const ChatId = mongoose.model('ChatIds', chatIdSchema);
