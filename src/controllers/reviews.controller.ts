import type { Request, Response } from 'express';
import { Game } from '../models/games'
import { Review } from '../models/reviews';

export const getReviewsList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  try {
    let reviews = await Review.find();

    const sortedReviews = reviews.sort((reviewA, reviewB) => {
      const dateA = new Date(reviewA.createdAt);
      const dateB = new Date(reviewB.createdAt);
  
      return dateB.getTime() - dateA.getTime()
    });
    res.json(sortedReviews);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

export const addReviewToList = async (
  req: Request,
  res: Response
) => {
  const {
    userId,
    status = 'На перегляді',
    stars,
    comment = '',
    isArchived = false,
  } = req.body;

  const review = new Review({
    userId,
    status,
    stars,
    comment,
    isArchived,
  })

  try {
    const newReview = await review.save();
    console.log('here');

    res.status(201).json(newReview);
  } catch (error) {
    // res.status(400).json({ message: error.message });
  }
};


export const updateReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      _id,
      status,
    } = req.body;

    const review = await Review.findOne({ _id })

    if (review !== null) {
      const updateData: {
        status?: string,
      } = {};

      if (status !== undefined) {
        updateData.status = status;
      }

      review.set(updateData);

      const updatedReview = await review.save();

      res.statusCode = 200;
      res.send(updatedReview);
    } else {
      res.status(404).json({ error: 'Відгук не знайдено' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось оновити дані' });
  }
};
