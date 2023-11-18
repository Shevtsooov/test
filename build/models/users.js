"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    // _id: {
    //   type: String,
    // },
    email: {
        type: String,
        required: true,
        index: { unique: true, sparse: true }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    adminComments: {
        type: [String],
    },
    fullName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    likedGames: {
        type: [String],
    },
    cartGames: {
        type: [String],
    },
    orders: {
        type: [String],
    },
    completedOrders: {
        type: Number,
    },
    shouldLeaveReview: {
        type: Boolean,
    },
    userReviews: {
        type: [String],
    },
    isArchived: {
        type: Boolean,
    },
    isBanned: {
        type: Boolean,
    },
    activationToken: {
        type: String,
    },
});
userSchema.set('timestamps', true);
exports.User = mongoose_1.default.model('User', userSchema);
