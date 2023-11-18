"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import cookieParser from 'cookie-parser';
const games_routes_1 = require("./routes/games.routes");
const users_routes_1 = require("./routes/users.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({
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
app.use(games_routes_1.gamesRouter);
app.use(users_routes_1.usersRouter);
// app.use(ordersRouter);
// app.use(reviewsRouter);
const PORT = process.env.PORT || 5020;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`)
// });
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.DB_URL);
        console.log('connected to db');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
//Routes go here
app.all('*', (req, res) => {
    res.json({ "every thing": "is awesome" });
});
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`);
    });
});
