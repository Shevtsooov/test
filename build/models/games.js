"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
;
const gameSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    iconLink: {
        type: String,
    },
    icon: {
        type: String,
    },
    gameId: {
        type: String,
    },
    poster: {
        type: String,
    },
    description: {
        type: String,
    },
    videoReview: {
        type: String,
    },
    videoGameplay: {
        type: String,
    },
    price: {
        type: Number,
    },
    discountedPrice: {
        type: Number,
    },
    category: {
        type: [String],
    },
    players: {
        type: String,
    },
    disclaimers: {
        type: [String],
    },
    releasedOn: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
    },
    popularity: {
        type: Number,
    },
});
exports.Game = mongoose_1.default.model('Game', gameSchema);
