const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Game = require('../models/game');
const { restart } = require('nodemon');

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

// Need to fix to query the object of players correctly
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

//works
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
    let games;
    try {
        games = await Game.find({}, 'id players status').exec();
    } catch (err) {
        const error = new HttpError(
            'Getting all games failed',
            500
        );
        return next(error);
    }
    res.json({ games: games.map(game => game.toObject({ getters: true })) });
}

//Finished for now
const createGame = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs', 422)
        );
    }
    const { creatorPlayer, players, status, type, timers } = req.body;

    const createdGame = new Game({
        creatorPlayer,
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

    res.status(201).json({ game: createdGame.toObject({ getters: true }) });
}

//works correctly
const updateGameById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check data', 422)
        );
    }

    const { status, timers } = req.body;
    const gameId = req.params.gameId;

    let game;
    try {
        game = await Game.findById(gameId);
    } catch (err) {
        const error = new HttpError(
            'Could not update game', 500
        );
        return next (error);
    }

    game.status = status;
    game.timers.timer1 = timers.timer1;
    game.timers.timer2 = timers.timer2;

    try {
        await game.save();
    } catch (err) {
        const error = new HttpError(
            'Could not update game', 500
        );
        return next (error);
    }

    res.status(200).json({ game: game.toObject({ getters: true })});

};

const deleteGameById = async (req, res, next) => {
    const gameId = req.params.gameId;

    let game;
    try {
        game = await Game.findById(gameId);
    } catch (err) {
        const error = new HttpError(
            'Could not delete game', 400
        );
        return next (error);
    }

    try {
        game.remove();
    } catch (err) {
        const error = new HttpError(
            'Could not delete game', 400
        );
        return next (error);
    }

    res.status(200).json({ response: `Game ${gameId} has been deleted`});
}


exports.getGameById = getGameById;
exports.getGamesByStatus = getGamesByStatus;
exports.createGame = createGame;
exports.updateGameById = updateGameById;
exports.getGames = getGames;
exports.deleteGameById = deleteGameById;

exports.getGamesByUserId = getGamesByUserId;
