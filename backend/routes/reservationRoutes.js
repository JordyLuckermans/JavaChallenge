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
        .get(AuthHelper.loginRequired,ReservationController.getReservationById)//check
        .delete(AuthHelper.adminRequired,ReservationController.deleteReservation)//check
        .put(AuthHelper.adminRequired,ReservationController.updateReservation);//check

    app.route('/reservations/:id/confirm')
        .patch(AuthHelper.adminRequired,ReservationController.confirmReservation);//check

    app.route('/reservations/:id/deny')
        .patch(AuthHelper.adminRequired,ReservationController.deleteReservation);//check
};
