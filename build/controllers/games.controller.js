"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGameToList = exports.getGamesList = void 0;
const games_1 = require("../models/games");
const getGamesList = async (req, res) => {
    const { sortBy = 'DESC', query = '', categories, year, players, } = req.query;
    try {
        let games = await games_1.Game.find();
        if (query !== '') {
            const formattedQuery = new RegExp(query.toString(), 'i');
            games = games.filter((game) => {
                var _a, _b;
                return (((_a = game.title) === null || _a === void 0 ? void 0 : _a.match(formattedQuery)) || ((_b = game.description) === null || _b === void 0 ? void 0 : _b.match(formattedQuery)));
            });
        }
        if (year) {
            games = games.filter((game) => { var _a; return (_a = game.releasedOn) === null || _a === void 0 ? void 0 : _a.includes(year.toString()); });
        }
        if (players) {
            games = games.filter((game) => { var _a; return (_a = game.players) === null || _a === void 0 ? void 0 : _a.includes(players.toString()); });
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
                    : yearA - yearB;
            }
            if (monthA !== monthB) {
                return sortBy === 'DESC'
                    ? monthB - monthA
                    : monthA - monthB;
            }
            return sortBy === 'DESC'
                ? dayB - dayA
                : dayA - dayB;
        });
        res.json(games);
    }
    catch (error) {
        // res.status(500).json({ message: error.message });
    }
};
exports.getGamesList = getGamesList;
const addGameToList = async (req, res) => {
    const { title, icon, iconLink, gameId, poster, description, videoReview, videoGameplay, price, discountedPrice, category, players, disclaimers, releasedOn, isAvailable, popularity, } = req.body;
    const game = new games_1.Game({
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
    });
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    }
    catch (error) {
        // res.status(400).json({ message: error.message });
    }
};
exports.addGameToList = addGameToList;
