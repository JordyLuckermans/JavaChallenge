'use strict';

var UserRepository = require('../repositories/userRepository');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config=require('../config/database');
const jwt=require('jsonwebtoken');

// Default functions (maybe remove these?)

exports.getAllUsers = function (req, res) {
    UserRepository.getAllUsers(req, res);
};

exports.getUserById = function (req, res) {
    UserRepository.getUserById(req, res);
};

exports.getUserByUsername = function (req, res) {
    UserRepository.getUserByUsername(req, res);
};

exports.addUser = function (req, res) {
    UserRepository.addUser(req, res);
};

exports.updateUser = function (req, res) {
    UserRepository.updateUser(req, res);
};

exports.deleteUser = function (req, res) {
    UserRepository.deleteUser(req, res);
};

// Extra functions

exports.registerUser = function (req, res) {
    const newUser = new User(req.body);

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            req.body.password = hash;
            UserRepository.addUser(req, res);
        });
    });
}

exports.authenticateUser = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    UserRepository.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        comparePassword(password, user.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                    }
                });
            }
            else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
};

exports.getProfile = function (req, res) {
    res.json({user:req.user})
};

// bcrypt functions //

const comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

const addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback());
        });
    });
}