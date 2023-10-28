import mongoose from 'mongoose';

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
    type: String,
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
