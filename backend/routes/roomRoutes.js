'use strict';

module.exports = function(app) {
    var RoomController = require('../controllers/roomController');

    app.route('/rooms')
        .get(RoomController.getAllRooms)
        .post(RoomController.addRoom);

    app.route('/rooms/:id')
        .get(RoomController.getRoomById)
        .delete(RoomController.deleteRoom)
        .put(RoomController.updateRoom);
};
