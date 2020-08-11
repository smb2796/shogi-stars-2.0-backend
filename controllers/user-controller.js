const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Game = require('../models/game');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, 'email name').exec();
    } catch (err) {
        const error = new HttpError(
            'Getting users failed',
            500
        );
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       return next(
         new HttpError('Invalid input', 422)
       );
    }

    const { username, email, password, name, birthdate, rating, profilePicture } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Error with signing up. Please try again later',
            500
        );
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError(
            'Your email already has an account associated with it. Please login or try another email.',
            422
        );
        return next(error);
    }

    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'User could not be created.',
            500
        );
        return next (error);
    }

    const createdUser = new User({
        username, 
        email, 
        password: hashedPass, 
        name, 
        birthdate, 
        rating,
        profilePicture,
        games: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again.',
          500
        );
        return next(error);
    } 

    res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Error with logging in. Please try again later',
            500
        );
        return next(error);
    }

    // let token;
    // try {
    //     token = jwt.sign({userId: identifiedUser.id, email: identifiedUser.email}, 
    //         'examplesecret', 
    //         {expiresIn: '1h'});    
    // } catch (err) {
    //     return next(
    //         new HttpError('Login failed', 500)
    //     );
    // }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError(
            'Username or password is incorrect.',
            401
        );
        return next (error)
    }
    
    res.json({ message: 'Logged in successfully'});
};

const updateUserById = async (req, res, next) => {

    // const { password, profilePicture, games, name, birthdate, rating } = req.body;
    const { name } = req.body;
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Could not update user', 500
        );
        return next (error);
    }

    // user.password = password;
    // user.profilePicture = profilePicture;
    // user.games = games;
    user.name = name;
    // user.birthdate = birthdate;
    // user.rating = rating;

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Could not update user', 500
        );
        return next (error);
    }

    res.status(200).json({ user: user.toObject({ getters: true })});
};

const deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Could not delete user', 500
        );
        return next (error);
    }

    try {
        user.remove();
    } catch (err) {
        const error = new HttpError(
            'Could not delete user', 500
        );
        return next (error);
    }

    res.status(200).json({ response: `User ${userId} has been deleted`});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.deleteUserById = deleteUserById;
exports.updateUserById = updateUserById;