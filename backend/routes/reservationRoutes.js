'use strict';

module.exports = function(app) {
    var ReservationController = require('../controllers/reservationController');

    app.route('/reservations')
        .get(ReservationController.getAllReservations)
        .post(ReservationController.addReservation);

    app.route('/reservations/confirmed')
        .get(ReservationController.getConfirmedReservations);

    app.route('/reservations/unconfirmed')
        .get(ReservationController.getUnconfirmedReservations);

    app.route('/reservations/:id')
        .get(ReservationController.getReservationById)
        .delete(ReservationController.deleteReservation)
        .put(ReservationController.updateReservation);

    app.route('/reservations/:id/confirm')
        .patch(ReservationController.confirmReservation);

    app.route('/reservations/:id/deny')
        .patch(ReservationController.deleteReservation);
};
