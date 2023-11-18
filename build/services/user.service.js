"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = exports.getAllActivated = void 0;
const users_1 = require("../models/users");
const getAllActivated = () => {
    return users_1.User.find({ activationToken: 'activated' });
};
exports.getAllActivated = getAllActivated;
const normalize = ({ id, email, role, adminComments, fullName, phoneNumber, address, likedGames, cartGames, orders, completedOrders, shouldLeaveReview, userReviews, isArchived, isBanned, activationToken, createdAt, updatedAt, }) => {
    return {
        id,
        email,
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
        createdAt,
        updatedAt,
    };
};
exports.normalize = normalize;
// export const normalize = ({
//   id,
//   email,
//   activationToken,
// }: Omit<IUser, "password" | "email" | "activationToken">) => {
//   return {
//     id,
//     email,
//     activationToken,
//   }
// };
