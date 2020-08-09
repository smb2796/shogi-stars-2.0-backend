const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth-controller');
const router = express.Router();

router.get('/', authController.getUsers);


router.post(
    '/signup',
    [
    check('name')
        .not()
        .isEmpty(),
    check('email')
        .normalizeEmail()
        .isEmail(),
    check('password').isLength({ min: 6 })
    ],
    authController.signup);

router.post('/login', authController.login);


module.exports = router;