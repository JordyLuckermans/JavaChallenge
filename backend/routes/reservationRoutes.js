'use strict';

module.exports = function(app) {
    var ReservationController = require('../controllers/reservationController');
    var AuthHelper = require('../helpers/authHelper');

    app.route('/reservations')
        .get(ReservationController.getAllReservations)
        .post(ReservationController.addReservation);

    app.route('/reservations/confirmed')
        .get(AuthHelper.loginRequired, ReservationController.getConfirmedReservations);

    app.route('/reservations/unconfirmed')
        .get(AuthHelper.adminRequired, ReservationController.getUnconfirmedReservations);

    app.route('/reservations/:id')
        .get(ReservationController.getReservationById)
        .delete(ReservationController.deleteReservation)
        .put(ReservationController.updateReservation);

    app.route('/reservations/:id/confirm')
        .patch(ReservationController.confirmReservation);

    app.route('/reservations/:id/deny')
        .patch(ReservationController.deleteReservation);
};
