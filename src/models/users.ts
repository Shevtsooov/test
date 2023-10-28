import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  adminComments: {
    type: [String],
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  likedGames: {
    type: [String],
  },
  cartGames: {
    type: [String],
  },
  orders: {
    type: [String],
  },
  completedOrders: {
    type: Number,
  },
  shouldLeaveReview: {
    type: Boolean,
  },
  userReviews: {
    type: [String],
  },
  isArchived: {
    type: Boolean,
  },
  isBanned: {
    type: Boolean,
  },
});

userSchema.set('timestamps', true);

export const User = mongoose.model('User', userSchema);
