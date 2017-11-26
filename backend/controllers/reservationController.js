'use strict';

var ReservationRepository = require('../repositories/reservationRepository');

exports.getAllReservations = function (req, res) {
    var promise = ReservationRepository.getAllReservations();
    promise.then(function (reservations) {
        res.json(reservations);
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
    });
};

exports.getReservationById = function (req, res) {
    var promise = ReservationRepository.getReservationById(req);
    promise.then(function (reservation) {
        res.json(reservation);
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to get reservation', error:err});
    });
};

exports.addReservation = function (req, res) {
    var promise = ReservationRepository.getReservationsByRoomAndTimeframe(req);
    promise.then(function (reservations) {
        if (Object.size(reservations) !== 0) {
            res.status(403).json({success: false, msg: 'Room not available for reservation'})
        } else {
            return ReservationRepository.addReservation(req);
        }
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to check availability', error:err});
    }).then(function () {
        res.json({success: true, msg: 'Reservation created'});
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to create reservation', error:err});
    });
};

exports.updateReservation = function (req, res) {
    var promise = ReservationRepository.getReservationsByRoomAndTimeframe(req);
    promise.then(function (reservations) {
        if (Object.size(reservations) !== 0) {
            res.status(403).json({success: false, msg: 'Room not available for reservation'})
        } else {
            return ReservationRepository.updateReservation(req);
        }
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to check availability', error:err});
    }).then(function () {
        res.json({success: true, msg: 'Reservation updated'});
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to update reservation', error:err});
    });
};

exports.deleteReservation = function (req, res) {
    var promise = ReservationRepository.deleteReservation(req);
    promise.then(function () {
        res.json({success: true, msg: 'Reservation removed'});
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to remove reservation', error:err});
    });
};

// Extra functions
exports.confirmReservation = function (req, res) {
    var promise = ReservationRepository.changeReservationStatus(req, true);
    promise.then(function () {
        res.json({success: true, msg: 'Reservation status updated'});
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to change reservation status', error:err});
    });
};

exports.getUnconfirmedReservations = function (req, res) {
    var promise = ReservationRepository.getReservationsByIsConfirmed(req, false);
    promise.then(function (reservations) {
        res.json(reservations);
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
    });
};

exports.getConfirmedReservations = function (req, res) {
    var promise = ReservationRepository.getReservationsByIsConfirmed(req, true);
    promise.then(function (reservations) {
        res.json(reservations);
    }, function (err) {
        res.status(500).json({success: false, msg: 'Failed to get reservations', error:err});
    });
};

Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};