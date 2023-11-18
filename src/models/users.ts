import mongoose from 'mongoose';

export interface IUser {
  id: string;
  email: string;
  password: string;
  role: string;
  adminComments: string[];
  fullName: string;
  phoneNumber: string;
  address: string;
  likedGames: string[];
  cartGames: string[];
  orders: string[];
  completedOrders: number;
  shouldLeaveReview: boolean;
  userReviews: string[];
  isArchived: boolean;
  isBanned: boolean;
  activationToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  // _id: {
  //   type: String,
  // },
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
  activationToken: {
    type: String,
  },
  
});

userSchema.set('timestamps', true);

export const User = mongoose.model('User', userSchema);
