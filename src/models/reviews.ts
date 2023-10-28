import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  status: {
    type: String,
  },
  
  stars: {
    type: Number,
  },
  text: {
    type: String,
  },

  pros: {
    type: String,
  },
  cons: {
    type: String,
  },
});

reviewSchema.set('timestamps', true);

export const Review = mongoose.model('Review', reviewSchema);
