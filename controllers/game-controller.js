
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

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

const getGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    const games = exampleGames.filter(foundGame => {
        return foundGame.gameId === gameId;
    });

    if(!games || games.length === 0) {
        
        return next(new HttpError('Could not find games by this id', 404));
    }
    console.log('GET game by game id');
    res.json({game: game});
}

const getGames = (req, res, next) => {
    res.json({games: exampleGames});
}

const createGame = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs', 422);
    }
    const { gameId, gameName, gtin } = req.body;

    const createdGame = {
        gameId,
        gameName,
        gtin
    }

    exampleGames.push(createdGame);

    res.status(201).json({game: createdGame});
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