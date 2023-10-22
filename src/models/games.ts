import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  iconLink: {
    type: String,
  },
  icon: {
    type: String,
  },
  gameId: {
    type: String,
  },
  poster: {
    type: String,
  },
  description: {
    type: String,
  },
  videoReview: {
    type: String,
  },
  videoGameplay: {
    type: String,
  },
  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  category: {
    type: [String],
  },
  players: {
    type: String,
  },
  disclaimers: {
    type: [String],
  },
  releasedOn: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
  popularity: {
    type: Number,
  },
})

export const Game = mongoose.model('Game', gameSchema);
