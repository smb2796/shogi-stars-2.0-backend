const mongoose = require('mongoose');

const User = require('../models/user');

require('dotenv').config();

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aeyfv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    ).then(() => {
        console.log('Connected to db');
    }).catch(() => {
        console.log('Connection to db failed');
    });


const createUser = async (req, res, next) => {
    const createdUser = new User({
        username: { type: String, require: true },
        password: { type: String, require: true },
        rating: { type: Number, require: true}
    });

    const result = await createdUser.save();
    res.json(result);
};

const getUsers = async (req, res, next) => {
    const users = await User.find().exec();
    res.json(users);
}

exports.createUser = createUser;
exports.getUsers = getUsers;