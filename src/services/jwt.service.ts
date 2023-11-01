import { IUser } from '../models/users';
import jwt from 'jsonwebtoken';

export const sign = (user: Pick<IUser, "email">) => {
  const token = jwt.sign(user, 'hello_token');

  return token;
}

export const verify = (token: string) => {
  try { 
    jwt.verify(token, 'hello_token');
  } catch (error) {
    return null;
  }
};
