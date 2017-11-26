'use strict';

module.exports = function (app) {
    var RoomController = require('../controllers/roomController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/rooms')
        .get(RoomController.getAllRooms)
        .post(AuthHelper.adminRequired,RoomController.addRoom);//check

    app.route('/rooms/:id')
        .get(RoomController.getRoomById)
        .delete(AuthHelper.adminRequired,RoomController.deleteRoom)//check
        .put(AuthHelper.adminRequired,RoomController.updateRoom);//check

    app.route('/rooms/reservations/:from/:to')
        .get(RoomController.getAllRoomsWithReservationsByTimespan);

    app.route('/rooms/:id/reservations/:from/:to')
        .get(RoomController.getRoomWithReservationsByTimespan);
};
