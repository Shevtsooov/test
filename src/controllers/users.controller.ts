import type { Request, Response } from 'express';
import { User } from '../models/users';

export const getUsersList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  try {
    let users = await User.find();

    res.json(users);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

export const createNewUser = async (
  req: Request,
  res: Response
) => {
  const {
    email,
    password,
    fullName,
    phoneNumber,
    address,
    
    role = 'user',
    adminComments = [],
    likedGames = [],
    cartGames = [],
    orders = [],
    completedOrders = 0,
    shouldLeaveReview = false,
    userReviews = [],
    isArchived = false,
    isBanned = false,
  } = req.body;

  const user = new User({
    email,
    password,
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
  })

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
