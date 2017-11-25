'use strict';

var ReservationRepository = require('../repositories/reservationRepository');

exports.getAllReservations = function (req, res) {
    ReservationRepository.getAllReservations(req, function (err, reservations) {
        if (err) {
            res.json(err);
        }
        res.json(reservations);
    });
};

exports.getReservationById = function (req, res) {
    ReservationRepository.getReservationById(req, function (err, reservation) {
        if (err) {
            res.json(err);
        }
        res.json(reservation);
    });
};

exports.addReservation = function (req, res) {
    checkAvailability(req, res,
        ReservationRepository.addReservation(req, function (err, reservation) {
            if (err) {
                res.json({success: false, msg: 'Failed to create reservation'});
            } else {
                res.json({success: true, msg: 'Reservation created'});
            }
        })
    );
};

exports.updateReservation = function (req, res) {
    checkAvailability(req, res,
        ReservationRepository.updateReservation(req, function (err, reservation) {
            if (err) {
                res.json({success: false, msg: 'Failed to update reservation'});
            } else {
                res.json({success: true, msg: 'Reservation updated'});
            }
        })
    );
};

exports.deleteReservation = function (req, res) {
    ReservationRepository.deleteReservation(req, function (err, reservation) {
        if (err) {
            res.json({success: false, msg: 'Failed to remove reservation'});
        } else {
            res.json({success: true, msg: 'Reservation removed'});
        }
    });
};

// Extra functions
exports.confirmReservation = function (req, res) {
    ReservationRepository.changeReservationStatus(req, true, function (err, reservation) {
        if (err) {
            res.json({success: false, msg: 'Failed to change reservation status'});
        } else {
            res.json({success: true, msg: 'Reservation status updated'});
        }
    });
};

exports.getUnconfirmedReservations = function (req, res) {
    ReservationRepository.getReservationsByIsConfirmed(req, false, function (err, reservations) {
        if (err) {
            res.json(err);
        }
        res.json(reservations);
    });
};

exports.getConfirmedReservations = function (req, res) {
    ReservationRepository.getReservationsByIsConfirmed(req, true, function (err, reservations) {
        if (err) {
            res.json(err);
        }
        res.json(reservations);
    });
};

const checkAvailability = function (req, res, addOrUpdate) {
    ReservationRepository.getReservationsByRoomAndTimeframe(req, function (err, reservations) {
        if (err) {
            res.json({success: false, msg: 'Failed to check availability'})
        } else if (reservations.size > 0) {
            res.json({success: false, msg: 'Room not available for reservation'})
        } else if (reservations.size === 0) {
            addOrUpdate();
        }
    });
}