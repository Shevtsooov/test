import { IUser, User } from "../models/users";

export const getAllActivated = () => {
  return User.find({ activationToken: 'activated' });
};

export const normalize = ({ email }: Pick<IUser, "email">) => {
  return {email}
};
