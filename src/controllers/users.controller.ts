import type { Request, Response } from 'express';
import { User } from '../models/users';
import { IUser } from '../models/users';
import { v4 as uuidv4} from 'uuid';
import { normalize } from '../services/user.service';
import bcrypt from 'bcrypt';
import { findToken, generateTokens, removeToken, saveToken, validateRefreshToken } from '../services/token.service';
import { sendActivation } from '../services/emailService/users/activation.email';
// import { Token } from '../models/token.model';
// import { sign } from '../services/jwt.service';

export const getList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  try {
    let users = await User.find();

    const normalizedUsers = users.map(user => normalize(user));

    const sortedUser = normalizedUsers.sort((userA, userB) => {
      const dateA = new Date(userA.createdAt);
      const dateB = new Date(userB.createdAt);
  
      return dateB.getTime() - dateA.getTime()
    });

    res.json(sortedUser);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// export const getOneUser = async (
//   req: Request,
//   res: Response,
//   ): Promise<void> => {
//    const { id } = req.params;

//   try {
//     let user = await User.findOne({ _id: id });

//     const normalizedUser = normalize(user);

//     res.json(normalizedUser);
//   } catch (error) {
//     // res.status(500).json({ message: error.message });
//   }
// };

export const register = async (
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
  const hashedPassword = await bcrypt.hash(password, 3)

  const user = new User({
    email,
    password: hashedPassword,
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
  });

  try {

    const newUser = await user.save();
    await sendActivation(email, activationToken);

    const normalizedUser = normalize(newUser);
    const tokens = generateTokens({ ...normalizedUser });

    await saveToken(normalizedUser.id, tokens.refreshToken);

    // res.cookie('refreshToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });

    res.status(201).json({
      ...tokens,
      user: normalizedUser
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const activate = async (
  req: Request,
  res: Response,
  ) => {
    const { activationToken } = req.params;

    const currentUser = await User.findOne({activationToken: activationToken});

    if (!currentUser) {
      res.sendStatus(404);

      return;
    }

    currentUser.activationToken = 'activated';
    currentUser.save();

    const normalizedUser = normalize(currentUser);
    const tokens = generateTokens({ ...normalizedUser });

    await saveToken(normalizedUser.id, tokens.refreshToken);

    res.status(200).json({
      ...tokens,
      user: normalizedUser
    });
};

export const login = async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;

  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    res.sendStatus(401);

    return;
  }

  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    res.sendStatus(401);

    return;
  }

  const normalizedUser = normalize(user);
  const tokens = generateTokens({ ...normalizedUser });

  await saveToken(normalizedUser.id, tokens.refreshToken);

  // res.cookie('accessToken', tokens.refreshToken, {
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'none',
  // });
  // res.cookie('refreshToken', tokens.refreshToken, {
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'none',
  // });

  res.status(200).json({
    ...tokens,
    user: normalizedUser
  });
};

export const logout = async (
  req: Request,
  res: Response,
) => {
  const { refreshToken } = req.body;
  console.log('logOut refreshToken - ', refreshToken);
  const token = await removeToken(refreshToken);
  // res.clearCookie('refreshToken');
  // res.clearCookie('accessToken');

  return res.json(token);
};


export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    console.log('refreshToken - ', refreshToken)
    if (!refreshToken) {
      return res.status(404).json({ error: 'Refresh token not found' });
    }

    const userData = validateRefreshToken(refreshToken);
    const tokenFromDB = await findToken(refreshToken);

    console.log('tokenFromDB - ', tokenFromDB)

    if (!userData || !tokenFromDB) {
      return res.status(404).json({ error: 'Invalid refresh token' });
    }

    const user: IUser | null = await User.findOne(tokenFromDB.user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const normalizedUser = normalize(user);
    const tokens = generateTokens({ ...normalizedUser });

    await saveToken(normalizedUser.id, tokens.refreshToken);

    // res.cookie('accessToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });

    // res.cookie('refreshToken', tokens.refreshToken, {
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });

    res.status(201).json({
      ...tokens,
      user: normalizedUser,
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      likedGames,
      cartGames,
    } = req.body;

    const user = await User.findOne({ _id: id })

    console.log(user);

    if (user !== null) {
      const updateData: {
        likedGames?: string[],
        cartGames?: string[],
      } = {};

      if (likedGames !== undefined) {
        updateData.likedGames = likedGames;
      }

      if (cartGames !== undefined) {
        updateData.cartGames = cartGames;
      }

      // if (correctAnswer !== undefined) {
      //   updateData.correctAnswer = correctAnswer;
      // }

      // if (category !== undefined) {
      //   updateData.category = category;
      //   updateData.categoryName = categories[category];
      // }

      // if (difficulty !== undefined) {
      //   updateData.difficulty = difficulty;
      // }
      
      console.log('cartGames - ', updateData.cartGames)

      user.set(updateData);

      const updatedUser = await user.save();

      const normalizedUser = normalize(updatedUser);

      res.statusCode = 200;
      res.send(normalizedUser);
    } else {
      res.status(404).json({ error: 'Юзера не знайдено' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось оновити дані' });
  }
};
