import type { Request, Response } from 'express';
import { IOrder, Order } from '../models/orders';
import { User } from '../models/users';
import { Game } from '../models/games';
import { sendClientOrderConfirmation } from '../services/emailService/orders/clientConfirmation.mail';
import { sendAdminOrderConfirmation } from '../services/emailService/orders/adminConfirmation.mail';

export const getList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  try {
    let orders: IOrder[] = await Order.find();

    const sortedOrders = orders.sort((orderA, orderB) => {
      const dateA = new Date(orderA.createdAt);
      const dateB = new Date(orderB.createdAt);
  
      return dateB.getTime() - dateA.getTime()
    });

    res.json(sortedOrders);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
   const { id } = req.params;

  try {
    let orders: IOrder[] = await Order.find({ userId: id });

    const sortedOrders = orders.sort((orderA, orderB) => {
      const dateA = new Date(orderA.createdAt);
      const dateB = new Date(orderB.createdAt);
  
      return dateB.getTime() - dateA.getTime()
    });

    res.json(sortedOrders);

    res.json(orders);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

export const makeNewOrder = async (
  req: Request,
  res: Response
) => {
  const {
    bookedDays,
    orderedGames,
    deliveryOption = 'Доставка',
    deliveryAddress,
    userId,
    orderStatus = 'В обробці',
    sumOfOrder,
    userComment = '',
    adminComment = '',
    isArchived = false,
  } = req.body;

  const order = new Order({
    bookedDays,
    orderedGames,
    deliveryOption,
    deliveryAddress,
    userId,
    orderStatus,
    sumOfOrder,
    adminComment,
    userComment,
    isArchived,
  })

  try {
    const newOrder = await order.save();
    
    const user = await User.findOne({ _id: newOrder.userId });
    const games = await Game.find({ gameId: [...newOrder.orderedGames]})

    if (user) {
      await sendClientOrderConfirmation(
        user.email,
        bookedDays,
        deliveryOption,
        deliveryAddress,
        orderStatus,
        sumOfOrder,
        userComment,
        games,
      )
    };

    await sendAdminOrderConfirmation(
      ["igorshevtsooov1995@gmail.com", "contact.shevtsov@gmail.com"],
      bookedDays,
      deliveryOption,
      deliveryAddress,
      orderStatus,
      sumOfOrder,
      userComment,
      games,
    );
      
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error)
    // res.status(400).json({ message: error.message });
  }
};
