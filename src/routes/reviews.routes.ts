import express from 'express';
import { addReviewToList, getReviewsList, updateReview } from '../controllers/reviews.controller';

export const reviewsRouter = express.Router();

reviewsRouter.get('/reviews', express.json(), getReviewsList);
reviewsRouter.post('/reviews', express.json(), addReviewToList);

reviewsRouter.patch('/reviews', express.json(), updateReview);
