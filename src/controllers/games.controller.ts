import type { Request, Response } from 'express';
import { Game } from '../models/games'

export const getGamesList = async (
  req: Request,
  res: Response,
  ): Promise<void> => {
  const {
    sortBy = 'DESC',
    query = '',
    categories,
    year,
    players,
  } = req.query;

  try {
    let games = await Game.find();

    if (query !== '') {
      const formattedQuery = new RegExp(query.toString(), 'i');
      games = games.filter((game) => (
        game.title.match(formattedQuery) || game.description.match(formattedQuery)
      ));
    }

    if (year) {
      games = games.filter((game) => game.releasedOn.includes(year.toString()));
    }

    if (players) {
      games = games.filter((game) => game.players.includes(players.toString()));
    }

    if (categories) {
      const searchedCategories = categories.toString().split(',').map((category) => category.trim());
      games = games.filter((game) => {
        const gameCategories = game.category.map((cat) => cat.trim());
        return searchedCategories.every((cat) => gameCategories.includes(cat));
      });
    }

    games.sort((gA, gB) => {
      const [dayA, monthA, yearA] = gA.releasedOn.toString().split('/').map(Number);
      const [dayB, monthB, yearB] = gB.releasedOn.toString().split('/').map(Number);

      if (yearA !== yearB) {
        return sortBy === 'DESC'
          ? yearB - yearA
          : yearA - yearB
      } 
      
      if (monthA !== monthB) {
        return sortBy === 'DESC'
          ? monthB - monthA
          : monthA - monthB
      }

      return sortBy === 'DESC'
        ? dayB - dayA
        : dayA - dayB
      });

    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addGameToList = async (req, res) => {
  const {
    title,
    icon,
    iconLink,
    gameId,
    poster,
    description,
    videoReview,
    videoGameplay,
    price,
    discountedPrice,
    category,
    players,
    disclaimers,
    releasedOn,
    isAvailable,
    popularity,
  } = req.body;

  const game = new Game({
    title,
    icon,
    iconLink,
    gameId,
    poster,
    description,
    videoReview,
    videoGameplay,
    price,
    discountedPrice,
    category,
    players,
    disclaimers,
    releasedOn,
    isAvailable,
    popularity,
  })

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



    // if (query !== '') {
    //   const formattedQuery = query.toString().trim().toLowerCase();
    //   games = games.filter((game) => (
    //     game.title.toLowerCase().includes(formattedQuery) ||
    //     game.description.toLowerCase().includes(formattedQuery)
    //   ));
    // }

    // if (year !== 'all') {
    //   games = games.filter((game) => game.releasedOn.includes(year.toString()));
    // }

    // if (players !== 'all') {
    //   games = games.filter((game) => game.players.includes(players.toString()));
    // }

    // if (categories !== 'all') {
    //   const searchedCategories = categories.toString().split(',');
    //   games = games.filter((game) => {
    //     const gameCategories = game.category.map((cat) => cat.toLowerCase());
    //     return searchedCategories.every((cat) => gameCategories.includes(cat));
    //   });
    // }

    // if (sortBy === 'ASC') {
    //   games.sort((gA, gB) => {
    //     const [dayA, monthA, yearA] = gA.releasedOn.split('/').map(Number);
    //     const [dayB, monthB, yearB] = gB.releasedOn.split('/').map(Number);
    //     if (yearA !== yearB) {
    //       return yearB - yearA; // Sort by year in descending order
    //     } else if (monthA !== monthB) {
    //       return monthB - monthA; // If years are the same, sort by month in descending order
    //     } else {
    //       return dayB - dayA; // If years and months are the same, sort by day in descending order
    //     }
    //   });
    // }
