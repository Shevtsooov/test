import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import { gamesRouter } from './routes/games.routes';
import { usersRouter } from './routes/users.routes';
// import { sendEmail } from './services/email.service';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

mongoose.connect('mongodb+srv://psRentalService:psRentalService@cluster0.bsgedck.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('eror', (error) => console.error(error));
db.once('open', () => console.log('Connected to db'));

app.use(express.json());
app.use(express.static('public'));

app.use(gamesRouter);
app.use(usersRouter);
// app.use(ordersRouter);
// app.use(reviewsRouter);

const PORT = 5020;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`)
});
