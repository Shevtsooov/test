"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToken = exports.removeToken = exports.validateRefreshToken = exports.validateAccessToken = exports.saveToken = exports.generateTokens = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_model_1 = require("../models/token.model");
dotenv_1.default.config();
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken,
    };
};
exports.generateTokens = generateTokens;
const saveToken = async (userId, refreshToken) => {
    const tokenData = await token_model_1.Token.findOne({ user: userId });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await token_model_1.Token.create({ user: userId, refreshToken });
    return token;
};
exports.saveToken = saveToken;
const validateAccessToken = async (token) => {
    const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN);
    return userData;
};
exports.validateAccessToken = validateAccessToken;
const validateRefreshToken = async (token) => {
    const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN);
    return userData;
};
exports.validateRefreshToken = validateRefreshToken;
const removeToken = async (refreshToken) => {
    const tokenData = await token_model_1.Token.deleteOne({ refreshToken });
    return tokenData;
};
exports.removeToken = removeToken;
const findToken = async (refreshToken) => {
    const tokenData = await token_model_1.Token.findOne({ refreshToken });
    return tokenData;
};
exports.findToken = findToken;
