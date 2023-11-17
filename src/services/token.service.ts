import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { IUser } from '../models/users';
import { Token } from '../models/token.model';

dotenv.config();

export const generateTokens = (payload: Pick<IUser, "email">) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as Secret, { expiresIn: '30m'});
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as Secret, { expiresIn: '30d'});

  return {
    accessToken,
    refreshToken,
  }
};

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId });

  if (tokenData) {
    tokenData.refreshToken = refreshToken;

    return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });

  return token;
};

export const validateAccessToken = async (token: string) => {
  const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as Secret);

  return userData;
};

export const validateRefreshToken = async (token: string) => {
  const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN as Secret);

  return userData;
};

export const removeToken = async (refreshToken: string) => {
  const tokenData = await Token.deleteOne({ refreshToken });

  return tokenData;
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({ refreshToken });

  return tokenData;
};
