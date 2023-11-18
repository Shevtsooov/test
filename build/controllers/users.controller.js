"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.refresh = exports.logout = exports.login = exports.activate = exports.register = exports.getOneUser = exports.getList = void 0;
const users_1 = require("../models/users");
const uuid_1 = require("uuid");
const user_service_1 = require("../services/user.service");
const email_service_1 = require("../services/email.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = require("../services/token.service");
// import { Token } from '../models/token.model';
// import { sign } from '../services/jwt.service';
const getList = async (req, res) => {
    try {
        let users = await users_1.User.find();
        res.json(users);
    }
    catch (error) {
        // res.status(500).json({ message: error.message });
    }
};
exports.getList = getList;
const getOneUser = async (req, res) => {
    const { id } = req.body;
    try {
        let user = await users_1.User.findOne({ id });
        res.json(user);
    }
    catch (error) {
        // res.status(500).json({ message: error.message });
    }
};
exports.getOneUser = getOneUser;
const register = async (req, res) => {
    const { email, password, fullName, phoneNumber, address, role = 'user', adminComments = [], likedGames = [], cartGames = [], orders = [], completedOrders = 0, shouldLeaveReview = false, userReviews = [], isArchived = false, isBanned = false, } = req.body;
    const activationToken = (0, uuid_1.v4)();
    const hashedPassword = await bcrypt_1.default.hash(password, 3);
    const user = new users_1.User({
        email,
        password: hashedPassword,
        role,
        adminComments,
        fullName,
        phoneNumber,
        address,
        likedGames,
        cartGames,
        orders,
        completedOrders,
        shouldLeaveReview,
        userReviews,
        isArchived,
        isBanned,
        activationToken,
    });
    try {
        const newUser = await user.save();
        await email_service_1.mailService.sendActivation(email, activationToken);
        const normalizedUser = (0, user_service_1.normalize)(newUser);
        const tokens = (0, token_service_1.generateTokens)(Object.assign({}, normalizedUser));
        await (0, token_service_1.saveToken)(normalizedUser.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(201).json(Object.assign(Object.assign({}, tokens), { user: normalizedUser }));
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
};
exports.register = register;
const activate = async (req, res) => {
    const { activationToken } = req.params;
    const user = await users_1.User.findOne({ activationToken: activationToken });
    if (!user) {
        res.sendStatus(404);
        return;
    }
    user.activationToken = 'activated';
    user.save();
    res.send(user);
};
exports.activate = activate;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await users_1.User.findOne({ email });
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const isPassCorrect = await bcrypt_1.default.compare(password, user.password);
    if (!isPassCorrect) {
        res.sendStatus(401);
        return;
    }
    const normalizedUser = (0, user_service_1.normalize)(user);
    const tokens = (0, token_service_1.generateTokens)(Object.assign({}, normalizedUser));
    await (0, token_service_1.saveToken)(normalizedUser.id, tokens.refreshToken);
    // res.cookie('accessToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });
    // res.cookie('refreshToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });
    res.status(200).json(Object.assign(Object.assign({}, tokens), { user: normalizedUser }));
};
exports.login = login;
const logout = async (req, res) => {
    const { refreshToken } = req.body;
    console.log('logOut refreshToken - ', refreshToken);
    const token = await (0, token_service_1.removeToken)(refreshToken);
    // res.clearCookie('refreshToken');
    // res.clearCookie('accessToken');
    return res.json(token);
};
exports.logout = logout;
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        console.log('refreshToken - ', refreshToken);
        if (!refreshToken) {
            return res.status(404).json({ error: 'Refresh token not found' });
        }
        const userData = (0, token_service_1.validateRefreshToken)(refreshToken);
        const tokenFromDB = await (0, token_service_1.findToken)(refreshToken);
        console.log('tokenFromDB - ', tokenFromDB);
        if (!userData || !tokenFromDB) {
            return res.status(404).json({ error: 'Invalid refresh token' });
        }
        const user = await users_1.User.findOne(tokenFromDB.user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const normalizedUser = (0, user_service_1.normalize)(user);
        const tokens = (0, token_service_1.generateTokens)(Object.assign({}, normalizedUser));
        await (0, token_service_1.saveToken)(normalizedUser.id, tokens.refreshToken);
        // res.cookie('accessToken', tokens.refreshToken, {
        //   maxAge: 30 * 24 * 60 * 60 * 1000,
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        // });
        // res.cookie('refreshToken', tokens.refreshToken, {
        //   maxAge: 30 * 24 * 60 * 60 * 1000,
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        // });
        res.status(201).json(Object.assign(Object.assign({}, tokens), { user: normalizedUser }));
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.refresh = refresh;
const update = async (req, res) => {
    try {
        const { id, likedGames, cartGames, } = req.body;
        const user = await users_1.User.findOne({ _id: id });
        console.log(user);
        if (user !== null) {
            const updateData = {};
            if (likedGames !== undefined) {
                updateData.likedGames = likedGames;
            }
            if (cartGames !== undefined) {
                updateData.cartGames = cartGames;
            }
            // if (correctAnswer !== undefined) {
            //   updateData.correctAnswer = correctAnswer;
            // }
            // if (category !== undefined) {
            //   updateData.category = category;
            //   updateData.categoryName = categories[category];
            // }
            // if (difficulty !== undefined) {
            //   updateData.difficulty = difficulty;
            // }
            console.log('cartGames - ', updateData.cartGames);
            user.set(updateData);
            const updatedUser = await user.save();
            const normalizedUser = (0, user_service_1.normalize)(updatedUser);
            res.statusCode = 200;
            res.send(normalizedUser);
        }
        else {
            res.status(404).json({ error: 'Юзера не знайдено' });
        }
    }
    catch (error) {
        res.status(404).json({ error: 'Не вдалось оновити дані' });
    }
};
exports.update = update;
