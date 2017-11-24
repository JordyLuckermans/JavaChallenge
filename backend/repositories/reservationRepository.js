'use strict';

var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');

exports.getAllReservations = function (req, res) {
    Reservation.find({}, function (err, reservations) {
        if (err) {
            res.json(err);
        }
        res.json(reservations);
    });
};

exports.getReservationById = function (req, res) {
    Reservation.findById({_id: req.params.id}, function (err, reservation) {
        if (err) {
            res.json(err);
        }
        res.json(reservation);
    });
};

exports.addReservation = function (req, res) {
    const newReservation = new Reservation(req.body);

    newReservation.save(function (err, reservation) {
        if (err) {
            res.json({success: false, msg: 'Failed to create reservation'});
        } else {
            res.json({success: true, msg: 'Reservation created'});
        }
    });
};

exports.updateReservation = function (req, res) {
    const newReservation = new Reservation(req.body);

    Reservation.update({_id: req.params.id}, newReservation,function (err, reservation) {
        if (err) {
            res.json({success: false, msg: 'Failed to update reservation'});
        } else {
            res.json({success: true, msg: 'Reservation updated'});
        }
    });
};

exports.deleteReservation = function (req, res) {
    Reservation.remove({_id: req.params.id}, function (err, reservation) {
        if (err) {
            res.json({success: false, msg: 'Failed to remove reservation'});
        } else {
            res.json({success: true, msg: 'Reservation removed'});
        }
    });
};