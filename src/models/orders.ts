import mongoose, { Schema } from 'mongoose';

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
