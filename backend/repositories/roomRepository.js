'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.getAllRooms = function (req, callback) {
    Room.find({}, callback);
};

exports.getRoomById = function (req, callback) {
    Room.findById({_id: req.params.id}, callback);
};

exports.addRoom = function (req, callback) {
    const newRoom = new Room(req.body);
    newRoom.save(callback);
};

exports.updateRoom = function (req, callback) {
    const newRoom = new Room(req.body);
    Room.update({_id: req.params.id}, newRoom,callback);
};

exports.deleteRoom = function (req, callback) {
    Room.remove({_id: req.params.id}, callback);
};
