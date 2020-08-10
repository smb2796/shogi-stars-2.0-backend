const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Game = require('../models/game');

const exampleGames = [
    {
        gameId: 'ex1',
        gameName: 'medicine',
        gtin: '12346123571234',
        description: {
            qty: 1325,
            color: 'blue'
        }
    }
];

const getGameById = async (req, res, next) => {
    const gameId = req.params.gameId;
    
    let game;
    try {
        game = await Game.findById(gameId);
    } catch (err) {
        const error = new HttpError(
            'Could not find the game.', 500
        );
        return next(error);
    }
   
    if(!game || game.length === 0) {
        const error = new HttpError(
            'Could not find games by this id', 404
        );
        return next(error);
    }

    res.json({ game });
};

const getGames = (req, res, next) => {
    res.json({games: exampleGames});
}

const createGame = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs', 422)
        );
    }
    const { players, status, type, timers } = req.body;

    const createdGame = new Game({
        players,
        status,
        type,
        timers,
        turn: 1
    });

    try {
        await createdGame.save();
    } catch (err) {
        const error = new HttpError(
          'Creating game failed, please try again.',
          500
        );
        return next(error);
    } 

    res.status(201).json({ game: createdGame });
}

const updateGameById = (req, res, next) => {
    const { gameName, gtin } = req.body;
    const gameId = req.params.gameId;

    const updatedGame = { ...exampleGames.find(game => game.gameId === gameId) };
    const gameIndex = exampleGames.findIndex(game => game.gameId === gameId);

    updatedGame.gameName = gameName;
    updatedGame.gtin = gtin;

    exampleGames[gameIndex] = updatedGame;
    res.status(200).json({game: updatedGame});

};


exports.getGameById = getGameById;
exports.getGames = getGames;
exports.createGame = createGame;
exports.updateGameById = updateGameById;