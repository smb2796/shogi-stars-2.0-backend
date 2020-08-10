const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Game = require('../models/game');

//works
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

    //removes _ from _id in mongoose object
    res.json({ game: game.toObject( {getters: true }) });
};

//
const getGamesByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    
    let games;
    try {
        games = await Game.find({ players: {
            player1: userId
        }});
    } catch (err) {
        const error = new HttpError(
            'Could not find the game.', 500
        );
        return next(error);
    }
   
    if(!games || games.length === 0) {
        const error = new HttpError(
            'Could not find games by this user id', 404
        );
        return next(error);
    }

    //removes _ from _id in mongoose object
    res.json({ games: games.map(game => game.toObject({ getters: true })) });
};

const getGamesByStatus = async (req, res, next) => {
    const status = req.params.status;
    
    let games;
    try {
        games = await Game.find({ status: status });
    } catch (err) {
        const error = new HttpError(
            'Could not find the game.', 500
        );
        return next(error);
    }
   
    if(!games || games.length === 0) {
        const error = new HttpError(
            `Could not find any games in status ${status}`, 404
        );
        return next(error);
    }

    //removes _ from _id in mongoose object
    res.json({ games: games.map(game => game.toObject({ getters: true })) });
};

//Finished
const getGames = async (req, res, next) => {
    const games = await Game.find().exec();
    res.json({games: games});
}

//Finished for now
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
exports.getGamesByUserId = getGamesByUserId;
exports.getGamesByStatus = getGamesByStatus;
exports.createGame = createGame;

exports.getGames = getGames;
exports.updateGameById = updateGameById;