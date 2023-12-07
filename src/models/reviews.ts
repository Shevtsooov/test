import mongoose, { Schema } from 'mongoose';

export interface IReview {
  id: string,
  userId: string;
  status: string;
  stars: number;
  comment: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const reviewSchema = new mongoose.Schema<IReview>({
  userId: {
    type: String,
    ref: 'User',
  },
  status: {
    type: String,
  },
  stars: {
    type: Number,
  },
  comment: {
    type: String,
  },
  isArchived: {
    type: Boolean,
  },
});

reviewSchema.set('timestamps', true);

export const Review = mongoose.model('Review', reviewSchema);
