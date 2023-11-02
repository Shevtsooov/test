import express from 'express';
import {
  getUsersList,
  createNewUser,
  activateUser,
  login,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/users', express.json(), getUsersList);
usersRouter.post('/users', express.json(), createNewUser);
usersRouter.post('/authentication', express.json(), login);
usersRouter.get('/activation/:activationToken', express.json(), activateUser);
