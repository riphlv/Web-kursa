const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/db');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Registration failed'
            });
        } else {
            res.json({
                success: true,
                msg: 'Registration successful'
            });
        }
    })
});
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'Incorrect credentials'
            });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.json({
                    success: false,
                    msg: 'Incorrect credentials'
                });
            } else {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 // 1 hour
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username
                    }
                });
            }
        });
    });
});

module.exports = router;