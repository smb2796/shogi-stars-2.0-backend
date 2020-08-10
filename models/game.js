const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    players: { 
        player1: { type: String, required: true },
        player2: { type: String, required: true }
    },
    status: { type: String, required: true },
    type: { 
        handicap: { type: String, required: true },
        speed: { type: Number, required: true }
    },
    timers: {
        timer1: { type: Number, required: false },
        timer2: { type: Number, required: false }
    },
    turn: { type: Number, required: true }
});

module.exports = mongoose.model('Game', gameSchema);