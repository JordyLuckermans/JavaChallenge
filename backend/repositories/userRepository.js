'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.getAllUsers = function (req, callback) {
    User.find({}, callback);
};

exports.getUserById = function (id, callback) {
    User.findById(id,callback);
};

exports.getUserByUsername = function (username,callback) {
   const query={username:username};
   User.findOne(query,callback);
};

exports.addUser = function (req, callback) {
    const newUser = new User(req.body);
    newUser.save(callback);
};


