const express = require('express');
const { check } = require('express-validator');

const gameController = require('../controllers/game-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// router.use(checkAuth);

router.get('/games', gameController.getGames);

router.get('/game/:gameId', gameController.getGameById);

router.post('/', 
    [
        check('players')
            .not()
            .isEmpty()
    ],
    gameController.createGame);

router.patch('/game/:gameId', gameController.updateGameById);

module.exports = router;