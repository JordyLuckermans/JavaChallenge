const mongoose = require('mongoose');
const Infrastructure = require('../models/infrastructure');

const roomSchema = mongoose.Schema({
    name: {
        type: String
    },
    dimensions: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }/*,
    infrastructures: {
        type: [Infrastructure],
        required: false
    }*/
});

const Room = module.exports = mongoose.model('Room', roomSchema);

module.exports.getAllRooms = function (callback) {
    Room.find(callback);
}

module.exports.getRoomById = function (id, callback) {
    Room.findById(id, callback);
}

module.exports.addRoom = function (newRoom, callback) {
    newRoom.save(callback);
}

module.exports.changeRoom = function (room, callback) {
    room.save(callback);
}

