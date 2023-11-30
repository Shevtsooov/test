import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { gamesRouter } from './routes/games.routes';
import { usersRouter } from './routes/users.routes';
import { ordersRouter } from './routes/orders.routes';
import { sendTelegramNotification, startTgBot } from './services/telegramBot/tgBot';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  // origin: 'http://localhost:3000',
  // origin: 'https://web.postman.co',
  origin: 'https://ps-rental-service.vercel.app',
  credentials: true
}));
 
app.use(gamesRouter);
app.use(usersRouter);
app.use(ordersRouter);
// app.use(reviewsRouter);

const PORT = process.env.PORT || 5020;


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`)
    });
});

// startTgBot();
