const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    users: { type: Array, require: true },
    status: { type: String, require: true }
});

module.exports = mongoose.model('Game', gameSchema);