'use strict';

var mongoose = require('mongoose');
var Room = mongoose.model('Room');

exports.getAllRooms = function (req, res) {
    Room.find({}, function (err, rooms) {
        if (err) {
            res.json(err);
        }
        res.json(rooms);
    });
};

exports.getRoomById = function (req, res){
    Room.findById({_id : req.params.id}, function (err, room){
        if (err){
            res.json(err);
        }
        res.json(room);
    });
};

exports.addRoom = function (req, res) {
    const newRoom = new Room(req.body);

    newRoom.save(function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to create room'});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    })
};
