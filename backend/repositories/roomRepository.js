'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.getAllRooms = function () {
    return Room.find({});
};

exports.getRoomById = function (req) {
    return Room.findById({_id: req.params.id});
};

exports.addRoom = function (req) {
    const newRoom = new Room(req.body);
    return newRoom.save();
};

exports.updateRoom = function (req) {
    const newRoom = new Room(req.body);
    return Room.update({_id: req.params.id}, newRoom);
};

exports.deleteRoom = function (req) {
    return Room.remove({_id: req.params.id});
};
