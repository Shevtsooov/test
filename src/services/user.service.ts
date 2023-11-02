import { IUser, User } from "../models/users";

export const getAllActivated = () => {
  return User.find({ activationToken: 'activated' });
};

export const normalize = ({
  email,
  role,
  adminComments,
  fullName,
  phoneNumber,
  likedGames,
  cartGames,
  orders,
  completedOrders,
  shouldLeaveReview,
  isArchived,
  isBanned,
  activationToken,
}: Omit<IUser, "password">) => {
  return {
    email,
    role,
    adminComments,
    fullName,
    phoneNumber,
    likedGames,
    cartGames,
    orders,
    completedOrders,
    shouldLeaveReview,
    isArchived,
    isBanned,
    activationToken,
  }
};
