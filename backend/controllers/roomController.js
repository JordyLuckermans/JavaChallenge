'use strict';

var RoomService = require('../dataservices/roomService');

exports.getAllRooms = function (req, res) {
    RoomService.getAllRooms(req, res);
};

exports.getRoomById = function (req, res){
    RoomService.getRoomById(req, res);
};

exports.addRoom = function (req, res) {
    RoomService.addRoom(req, res);
};
