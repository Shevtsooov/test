import type { Request, Response } from 'express';
import { IOrder, Order } from '../models/orders';
import { IUser, User } from '../models/users';
import { v4 as uuidv4} from 'uuid';
import { Game } from '../models/games';
import { sendClientOrderConfirmation } from '../services/emailService/orders/clientConfirmation.mail';
import { sendAdminOrderConfirmation } from '../services/emailService/orders/adminConfirmation.mail';
import { sendTelegramNotification } from '../services/telegramBot/tgBot';
import { sendClientOrderCompleted } from '../services/emailService/orders/clientCompleted.mail';

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
    orderStatus = 'Нове замовлення',
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

      await sendTelegramNotification(
        user,
        bookedDays,
        deliveryOption,
        deliveryAddress,
        orderStatus,
        sumOfOrder,
        userComment,
        games,
      );

      await sendClientOrderConfirmation(
        user,
        bookedDays,
        deliveryOption,
        deliveryAddress,
        orderStatus,
        sumOfOrder,
        userComment,
        games,
      )

      // await sendAdminOrderConfirmation(
      //   user,
      //   bookedDays,
      //   deliveryOption,
      //   deliveryAddress,
      //   orderStatus,
      //   sumOfOrder,
      //   userComment,
      //   games,
      // );
    };
      
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error)
    // res.status(400).json({ message: error.message });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      _id,
      orderStatus,
    } = req.body;

    const order = await Order.findOne({ _id });
    const orderUser = await User.findOne({ _id: order?.userId });

    if (order !== null) {
      const updateData: {
        orderStatus?: string,
      } = {};

      if (orderStatus !== undefined) {
        updateData.orderStatus = orderStatus;

        if (orderUser && orderStatus === 'Завершене') {
          const reviewLink = uuidv4();
          
          orderUser.reviewLink = reviewLink;
          orderUser.completedOrders = orderUser.completedOrders + 1;
          
          await sendClientOrderCompleted(orderUser);
          
          await orderUser.save();
        }
      }

      order.set(updateData);

      const updatedOrder = await order.save();

      res.statusCode = 200;
      res.send(updatedOrder);
    } else {
      res.status(404).json({ error: 'Замовлення не знайдено' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось оновити дані' });
  }
};
