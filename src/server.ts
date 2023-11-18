import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import { gamesRouter } from './routes/games.routes';
import { usersRouter } from './routes/users.routes';

dotenv.config();

const app = express();

// app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  // origin: '*',
  // origin: 'http://localhost:3000',
  // origin: 'https://web.postman.co',
  origin: 'https://ps-rental-service.vercel.app',
  credentials: true
}));

// mongoose.connect(process.env.DB_URL as string);

// const db = mongoose.connection;

// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to db'));

app.use(gamesRouter);
app.use(usersRouter);
// app.use(ordersRouter);
// app.use(reviewsRouter);

const PORT = process.env.PORT || 5020;


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`)
// });
 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL as string);
    console.log('connected to db');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`)
    });
})
