import { IUser, User } from "../models/users";

export const getAllActivated = () => {
  return User.find({ activationToken: 'activated' });
};

export const normalize = ({
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
}: Omit<IUser, "password">) => {
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
  }
};

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
