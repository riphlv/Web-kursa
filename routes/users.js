const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/db');
const mappy = require('../models/mapModel');



module.exports = function (app) {
    var todoList = require('../controllers/todoListController');
    // Map Routes
    app.route('/map')
        .get(mappy.listAll)
        .post(mappy.createNew);
    //GET /api/0.6/map?bbox=left,bottom,right,top
    app.route('/map/:left,:bottom,:right,:top')
        .get(mappy.readPosition)
        .put(mappy.updatePosition)
        .delete(mappy.deletePosition);
};

// Route to register page
// After posting new users inputs return either true for succeeding 
// or false for failing registration process
router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    // Uses models/user.js created function to add new user to the database  
    // and attempts to register user
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

// Authorization
// Checks between input and database results 
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Finds user by username
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'Incorrect credentials'
            });
        }
        // And then compares input password with DB password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) console.log("error on login");
            if (!isMatch) {
                return res.json({
                    success: false,
                    msg: 'Incorrect credentials'
                });
            } else {
                // If auth successful - create new token
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