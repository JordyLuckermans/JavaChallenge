'use strict';

var UserRepository = require('../repositories/userRepository');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config=require('../config/database');
const jwt=require('jsonwebtoken');

exports.getAllUsers = function (req, res) {
    UserRepository.getAllUsers(req, function (err, users) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get users', error:err});
        }
        res.json(users);
    });
};

// Extra functions

exports.registerUser = function (req, res) {
    const newUser = new User(req.body);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw err;
            req.body.password = hash;
            UserRepository.addUser(req, function (err, user) {
                if (err) {
                    res.status(500).json({success: false, msg: 'Failed to create user', error:err});
                } else {
                    res.json({success: true, msg: 'User created'});
                }
            });
        });
    });
};

exports.authenticateUser = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    UserRepository.getUserByUsername(username, function (err, user) {
        if (err) {
            return res.status(500).json({success: false, msg: 'Failed to get user', error:err});
        }
        if (!user) {
            return res.status(404).json({success: false, msg: 'User not found'});
        }

        comparePassword(password, user.password, function (err, isMatch) {
            if (err)  {
                return res.status(500).json({success: false, msg: 'Failed to match passwords', error:err});
            }
            if (isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token/*,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        isAdmin: user.isAdmin
                    }*/
                });
            }
            else {
                return res.status(403).json({success: false, msg: 'Wrong password'});
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
};
