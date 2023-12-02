import express from 'express';
import {
  getList,
  register,
  activate,
  login,
  update,
  logout,
  refresh,
  ping,
  initializeResetPassword,
  passwordReset,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.post('/registration', express.json(), register);
usersRouter.post('/login', express.json(), login);
usersRouter.post('/logout', express.json(), logout);
usersRouter.post('/ping', express.json(), ping);

usersRouter.get('/activation/:activationToken', express.json(), activate);
usersRouter.post('/refresh', express.json(), refresh);


usersRouter.patch('/users', express.json(), update);
usersRouter.get('/users', express.json(), getList);

usersRouter.post('/initializePasswordReset', express.json(), initializeResetPassword)
usersRouter.post('/passwordReset', express.json(), passwordReset)
