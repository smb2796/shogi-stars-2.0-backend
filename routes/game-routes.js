const express = require('express');
const { check } = require('express-validator');

const gameController = require('../controllers/game-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// router.use(checkAuth);

router.get('/all', gameController.getGames);

router.get('/:gameId', gameController.getGameById);

router.get('/user/:userId', gameController.getGamesByUserId);

router.get('/status/:status', gameController.getGamesByStatus);

router.post('/', 
    [
        check('players')
            .not()
            .isEmpty()
    ],
    gameController.createGame);

router.patch('/:gameId', gameController.updateGameById);

router.delete('/:gameId', gameController.deleteGameById);

module.exports = router;