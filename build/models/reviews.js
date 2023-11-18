"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    status: {
        type: String,
    },
    stars: {
        type: Number,
    },
    text: {
        type: String,
    },
    pros: {
        type: String,
    },
    cons: {
        type: String,
    },
});
reviewSchema.set('timestamps', true);
exports.Review = mongoose_1.default.model('Review', reviewSchema);
