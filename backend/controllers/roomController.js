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
}

/*const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

router.get('/', function (req, res, next) {
    Room.getAllRooms(function (err, rooms) {
        if (err) {
            res.json({success: false})
        } else {
            res.json(rooms);
        }
    })
})

router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    Room.getRoomById(id, function (err, room) {
        if (err) {
            res.json({success: false})
        } else {
            res.json(room);
        }
    })
})

router.post('/', function (req, res, next) {
    const newRoom = new Room(req.body);

    Room.addRoom(newRoom, function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to create room'});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    });
});*/


//module.exports = router;