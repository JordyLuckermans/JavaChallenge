'use strict';

module.exports = function(app) {
    var ReservationController = require('../controllers/reservationController');

    app.route('/reservations')
        .get(ReservationController.getAllReservations)
        .post(ReservationController.addReservation);

    app.route('/reservations/:id')
        .get(ReservationController.getReservationById)
        .delete(ReservationController.deleteReservation)
        .put(ReservationController.updateReservation);
};
