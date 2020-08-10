const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rating: { type: Number, required: true},
    profilePicture: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);