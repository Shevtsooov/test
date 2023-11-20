import { mailService } from './../services/email.service';
import type { Request, Response } from 'express';
import { Order } from '../models/orders';
import { User } from '../models/users';
import { Game } from '../models/games';

export const getList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  try {
    let orders = await Order.find();

    res.json(orders);
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
    let orders = await Order.find({ userId: id });

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
    deliveryOption,
    deliveryAddress,
    userId,
    orderStatus,
    sumOfOrder,
    userComment,
    adminComment,
    isArchived,
  } = req.body;

  const order = new Order({
    bookedDays,
    orderedGames,
    deliveryOption,
    deliveryAddress,
    userId,
    orderStatus,
    sumOfOrder,
    userComment,
    adminComment,
    isArchived,
  })

  try {
    const newOrder = await order.save();

    const user = await User.findOne({ _id: newOrder.userId });
    const games = await Game.find({ gameId: [...newOrder.orderedGames]})

    if (user) {
      await mailService.sendOrderConfirmation(
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
 
    await mailService.sendAdminOrderConfirmation(
      ["igorshevtsooov1995@gmail.com", "contact.shevtsov@gmail.com"],
      bookedDays,
      deliveryOption,
      deliveryAddress,
      orderStatus,
      sumOfOrder,
      userComment,
      games,
    )
    res.status(201).json(newOrder);
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
};


// {
//   "bookedDays": [10, 20, 30],
//   "orderedGames":  [10, 20, 30],
//   "deliveryOption":  "delisd fsgdf gsd dfgdghsvery",
//   "deliveryAddress": "addr gdfgdsfgdfs gess",
//   "userId": "6557d7576cbe54049bfa14d1",
//   "orderStatus": "В обробці",
//   "sumOfOrder": 1200,
//   "userComment": "comment here",
//   "adminComment": "comment here",
//   "isArchived": false
// }

// {
//   "bookedDays": ['3143124', '4234234 23'],
//   "orderedGames":  [10, 20, 30],
//   "deliveryOption":  "delisd fsgdf gsd dfgdghsvery",
//   "deliveryAddress": "addr gdfgdsfgdfs gess",
//   "userId": "655757daec7e941b083da991",
//   "orderStatus": "В обробці",
//   "sumOfOrder": 1200,
//   "userComment": "comment here",
//   "adminComment": "comment here",
//   "isArchived": false
// }
