'use strict';

var RoomRepository = require('../repositories/roomRepository');

exports.getAllRooms = function (req, res) {
    RoomRepository.getAllRooms(req, res);
};

exports.getRoomById = function (req, res){
    RoomRepository.getRoomById(req, res);
};

exports.addRoom = function (req, res) {
    RoomRepository.addRoom(req, res);
};

exports.updateRoom = function (req, res) {
    RoomRepository.updateRoom(req, res);
};

exports.deleteRoom = function (req, res) {
    RoomRepository.deleteRoom(req, res);
};