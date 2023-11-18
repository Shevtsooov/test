"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sign = (user) => {
    const token = jsonwebtoken_1.default.sign(user, 'hello_token');
    return token;
};
exports.sign = sign;
const verify = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, 'hello_token');
    }
    catch (error) {
        return null;
    }
};
exports.verify = verify;
