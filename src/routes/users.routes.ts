import express from 'express';
import {
  getUsersList,
  createNewUser,
  activateUser,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/users', express.json(), getUsersList);
usersRouter.post('/users', express.json(), createNewUser);
usersRouter.get('/activation/:activationToken', express.json(), activateUser);
