'use strict';

var RoomRepository = require('../repositories/roomRepository');

exports.getAllRooms = function (req, res) {
    RoomRepository.getAllRooms(req, function (err, rooms) {
        if (err) {
            res.json(err);
        }
        res.json(rooms);
    });
};

exports.getRoomById = function (req, res) {
    RoomRepository.getRoomById(req, function (err, room) {
        if (err) {
            res.json(err);
        }
        res.json(room);
    });
};

exports.addRoom = function (req, res) {
    RoomRepository.addRoom(req, function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to create room'});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    });
};

exports.updateRoom = function (req, res) {
    RoomRepository.updateRoom(req, function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to update room'});
        } else {
            res.json({success: true, msg: 'Room updated'});
        }
    });
};

exports.deleteRoom = function (req, res) {
    RoomRepository.deleteRoom(req, function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to remove room'});
        } else {
            res.json({success: true, msg: 'Room removed'});
        }
    });
};
