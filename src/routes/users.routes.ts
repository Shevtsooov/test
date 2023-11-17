import express from 'express';
import {
  getList,
  register,
  activate,
  login,
  update,
  logout,
  refresh,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

// usersRouter.get('/users', express.json(), getUsersList);
// usersRouter.get('/users/:id', express.json(), getOneUser);
// usersRouter.post('/authentication', express.json(), login);
// usersRouter.get('/activation/:activationToken', express.json(), activateUser);



usersRouter.post('/registration', express.json(), register);
usersRouter.post('/login', express.json(), login);
usersRouter.post('/logout', express.json(), logout);

usersRouter.get('/activation/:activationToken', express.json(), activate);
usersRouter.post('/refresh', express.json(), refresh);


usersRouter.patch('/users', express.json(), update);
usersRouter.get('/users', express.json(), getList);
