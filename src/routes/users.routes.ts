import express from 'express';
import {
  getUsersList,
  createNewUser,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/users', express.json(), getUsersList);
usersRouter.post('/users', express.json(), createNewUser);
