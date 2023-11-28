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
}: IUser ) => {
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
