"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRouter = void 0;
const express_1 = __importDefault(require("express"));
const games_controller_1 = require("../controllers/games.controller");
exports.gamesRouter = express_1.default.Router();
exports.gamesRouter.get('/games', express_1.default.json(), games_controller_1.getGamesList);
exports.gamesRouter.post('/games', express_1.default.json(), games_controller_1.addGameToList);
