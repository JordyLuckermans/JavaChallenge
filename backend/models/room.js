'use strict';

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dimensions: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Room = module.exports = mongoose.model('Room', roomSchema);

/*module.exports.getAllRooms = function (callback) {
    Room.find(callback);
}

module.exports.getRoomById = function (id, callback) {
    Room.findById(id, callback);
}

module.exports.addRoom = function (newRoom, callback) {
    newRoom.save(callback);
}*/


