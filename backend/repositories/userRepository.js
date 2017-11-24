'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getAllUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.json(err);
        }
        res.json(users);
    });
};

exports.getUserById = function (req, res) {
    User.findById({_id: req.params.id}, function (err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
};

exports.getUserByUsername = function (req, res) {
    User.findById({username: req.params.username}, function (err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
};

exports.addUser = function (req, res) {
    const newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) {
            res.json({success: false, msg: 'Failed to create user'});
        } else {
            res.json({success: true, msg: 'User created'});
        }
    });
};

exports.updateUser = function (req, res) {
    const newUser = new User(req.body);

    User.update({_id: req.params.id}, newUser,function (err, user) {
        if (err) {
            res.json({success: false, msg: 'Failed to update user'});
        } else {
            res.json({success: true, msg: 'User updated'});
        }
    });
};

exports.deleteUser = function (req, res) {
    User.remove({_id: req.params.id}, function (err, user) {
        if (err) {
            res.json({success: false, msg: 'Failed to remove user'});
        } else {
            res.json({success: true, msg: 'User removed'});
        }
    });
};