import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  bookedDays: string[];
  orderedGames: string[];
  deliveryOption: string;
  deliveryAddress: string;
  userId: string;
  orderStatus: string;
  sumOfOrder: number;
  userComment: string;
  adminComment: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const orderSchema = new mongoose.Schema({
  bookedDays: {
    type: [String],
  },
  orderedGames: {
    type: [String],
  },
  deliveryOption: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  orderStatus: {
    type: String,
  },
  sumOfOrder: {
    type: Number,
  },
  userComment: {
    type: String,
  },
  adminComment: {
    type: String,
  },
  isArchived: {
    type: Boolean,
  },
});

orderSchema.set('timestamps', true);

export const Order = mongoose.model('Order', orderSchema);
