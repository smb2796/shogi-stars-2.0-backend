const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , minlength: 6 },
    profilePicture: { type: String, required: true},
    games: { type: String, required: true},
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    rating: { type: Number, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);