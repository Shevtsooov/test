import mongoose from 'mongoose';

export interface IGame {
  title: string;
  iconLink: string;
  icon: string;
  gameId: string;
  poster: string;
  description: string;
  videoReview: string;
  videoGameplay: string;
  price: number;
  discountedPrice: number;
  category: string[];
  players: string;
  disclaimers: string[];
  releasedOn: string;
  isAvailable: boolean;
  popularity: number;
};

const gameSchema = new mongoose.Schema<IGame>({
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
