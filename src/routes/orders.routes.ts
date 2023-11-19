import express from 'express';
import { getList, getUserOrders, makeNewOrder } from '../controllers/orders.controller';


export const ordersRouter = express.Router();

ordersRouter.get('/orders', express.json(), getList);
ordersRouter.get('/orders/:id', express.json(), getUserOrders);

ordersRouter.post('/orders', express.json(), makeNewOrder);
