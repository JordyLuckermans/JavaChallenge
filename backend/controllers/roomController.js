'use strict';

var RoomRepository = require('../repositories/roomRepository');

exports.getAllRooms = function (req, res) {
    RoomRepository.getAllRooms(req, function (err, rooms) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get rooms', error:err});
        }
        res.json(rooms);
    });
};

exports.getRoomById = function (req, res) {
    RoomRepository.getRoomById(req, function (err, room) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get room', error:err});
        }
        res.json(room);
    });
};

exports.addRoom = function (req, res) {
    RoomRepository.addRoom(req, function (err, room) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to create room', error:err});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    });
};

exports.updateRoom = function (req, res) {
    RoomRepository.updateRoom(req, function (err, room) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to update room', error:err});
        } else {
            res.json({success: true, msg: 'Room updated'});
        }
    });
};

exports.deleteRoom = function (req, res) {
    RoomRepository.deleteRoom(req, function (err, room) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to remove room', error:err});
        } else {
            res.json({success: true, msg: 'Room removed'});
        }
    });
};
