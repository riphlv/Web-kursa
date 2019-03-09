const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
    res.send('auth');
});

module.exports = router;