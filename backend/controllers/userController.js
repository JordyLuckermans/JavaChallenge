'use strict';

var UserRepository = require('../repositories/userRepository');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config=require('../config/database');
const jwt=require('jsonwebtoken');

exports.getAllUsers = function (req, res) {
    var promise = UserRepository.getAllUsers(req);
    promise.then(function (users) {
        res.json(users);
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to get users', error:err});
    });
};

// Extra functions

exports.registerUser = function (req, res) {
    const newUser = new User(req.body);
    var promise = bcrypt.genSalt(10);
    promise.then(function (salt) {
        var promise2 = bcrypt.hash(newUser.password, salt);
        promise2.then(function (hash) {
            req.body.password = hash;
            var promise3 = UserRepository.addUser(req);
            promise3.then(function () {
                res.json({success: true, msg: 'User created'});
            }, function (err) {
                res.status(500).json({success: false, msg: 'Failed to create user', error:err});
            });
        }, function (err) {
            res.status(500).json({success: false, msg: 'Failed to create user', error:err});
        });
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to create user', error:err});
    });
};

exports.authenticateUser = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    var promise = UserRepository.getUserByUsername(username);
    promise.then(function (user) {
        if (!user) {
            return res.status(404).json({success: false, msg: 'User not found'});
        }
        var promise2 = bcrypt.compare(password, user.password);
        promise2.then(function (isMatch) {
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
                        phoneNumber: user.phoneNumber,
                        isAdmin: user.isAdmin
                    }
                });
            }
            else {
                return res.status(403).json({success: false, msg: 'Wrong password'});
            }
        }, function (err) {
            return res.status(500).json({success: false, msg: 'Failed to match passwords', error:err});
        });
    }, function (err) {
        return res.status(500).json({success: false, msg: 'Failed to get user', error:err});
    });
};

exports.getProfile = function (req, res) {
    res.json({user:req.user})
};
