const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/db')

// User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Retrieve user by ID
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// Retrieve user by username
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    }
    User.findOne(query, callback);
}

// Add new user with hashed + salted password
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// Checks if the entered password matches with the one saved in DB
module.exports.comparePassword = function (pass, hash, callback) {
    bcrypt.compare(pass, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}