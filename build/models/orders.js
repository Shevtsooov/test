"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    bookedDays: {
        type: [String],
    },
    orderedGames: {
        type: [String],
    },
    deliveryOption: {
        type: String,
    },
    deliveryAddress: {
        type: String,
    },
    userId: {
        type: String,
    },
    orderStatus: {
        type: String,
    },
    sumOfOrder: {
        type: Number,
    },
    userComment: {
        type: String,
    },
    adminComment: {
        type: String,
    },
    isArchived: {
        type: Boolean,
    },
});
orderSchema.set('timestamps', true);
exports.Order = mongoose_1.default.model('Order', orderSchema);
