import type { Request, Response } from 'express';
import { User } from '../models/users';
import { IUser } from '../models/users';
import { sendActivation } from '../services/email.service';
import { v4 as uuidv4} from "uuid";
import { sign } from '../services/jwt.service';
import { normalize } from '../services/user.service';

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
  const activationToken = uuidv4();

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
    activationToken,
  })

  try {
    const newUser = await user.save();


    await sendActivation(email, activationToken);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const activateUser = async (
  req: Request,
  res: Response,
  ) => {
    const { activationToken } = req.params;

    const user = await User.findOne({activationToken: activationToken});

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.activationToken = 'activated';
    user.save();

    res.send(user);
};

export const login = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (!user || user.password !== password) {
    res.sendStatus(401);

    return;
  }

  const normalizedUser = normalize(user);

  const accesToken = sign(normalizedUser);

  res.send({
    user,
    accesToken,
  });
};
