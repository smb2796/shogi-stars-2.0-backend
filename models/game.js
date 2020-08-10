const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameName: { type: String, required: true },
    players: { 
        player1: { type: String, required: true },
        player2: { type: String, required: true }
    },
    status: { type: String, required: true },
    type: { 
        handicap: { type: String, required: true },
        speed: { type: String, required: true }
    },
    timers: {
        timer1: { type: Number, required: false },
        timer2: { type: Number, required: false }
    },
    turn: { type: Boolean, required: true }
});

module.exports = mongoose.model('Game', gameSchema);