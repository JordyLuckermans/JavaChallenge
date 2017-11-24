'use strict';

module.exports = function(app) {
    var RoomController = require('../controllers/roomController');

    // todoList Routes
    app.route('/rooms')
        .get(RoomController.getAllRooms)
        .post(RoomController.addRoom)
        .put(RoomController.updateRoom);

    app.route('/rooms/:id')
        .get(RoomController.getRoomById)
        .delete(RoomController.deleteRoom);
};
