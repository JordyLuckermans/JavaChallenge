'use strict';

var ReservationRepository = require('../repositories/reservationRepository');

exports.getAllReservations = function (req, res) {
    ReservationRepository.getAllReservations(req, function (err, reservations) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
        }
        res.json(reservations);
    });
};

exports.getReservationById = function (req, res) {
    ReservationRepository.getReservationById(req, function (err, reservation) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get reservation', error:err});
        }
        res.json(reservation);
    });
};

exports.addReservation = function (req, res) {
    ReservationRepository.getReservationsByRoomAndTimeframe(req, function (err, reservations) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to check availability', error:err})
        } else if (Object.size(reservations) !== 0) {
            res.status(403).json({success: false, msg: 'Room not available for reservation'})
        } else {
            ReservationRepository.addReservation(req, function (err, reservation) {
                if (err) {
                    res.status(500).json({success: false, msg: 'Failed to create reservation', error:err});
                } else {
                    res.json({success: true, msg: 'Reservation created'});
                }
            });
        }
    });
};

exports.updateReservation = function (req, res) {
    ReservationRepository.getReservationsByRoomAndTimeframe(req, function (err, reservations) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to check availability', error:err})
        } else if (Object.size(reservations) !== 0) {
            res.status(403).json({success: false, msg: 'Room not available for reservation'})
        } else {
            ReservationRepository.updateReservation(req, function (err, reservation) {
                if (err) {
                    res.status(500).json({success: false, msg: 'Failed to update reservation', error:err});
                } else {
                    res.json({success: true, msg: 'Reservation updated'});
                }
            });
        }
    });
};

exports.deleteReservation = function (req, res) {
    ReservationRepository.deleteReservation(req, function (err, reservation) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to remove reservation', error:err});
        } else {
            res.json({success: true, msg: 'Reservation removed'});
        }
    });
};

// Extra functions
exports.confirmReservation = function (req, res) {
    ReservationRepository.changeReservationStatus(req, true, function (err, reservation) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to change reservation status', error:err});
        } else {
            res.json({success: true, msg: 'Reservation status updated'});
        }
    });
};

exports.getUnconfirmedReservations = function (req, res) {
    ReservationRepository.getReservationsByIsConfirmed(req, false, function (err, reservations) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
        }
        res.json(reservations);
    });
};

exports.getConfirmedReservations = function (req, res) {
    ReservationRepository.getReservationsByIsConfirmed(req, true, function (err, reservations) {
        if (err) {
            res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
        }
        res.json(reservations);
    });
};

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};