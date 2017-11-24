'use strict';

var mongoose = require('mongoose');
var Reservation = mongoose.model('Reservation');

exports.getAllReservations = function (req, callback) {
    Reservation.find({}, callback);
};

exports.getReservationById = function (req, callback) {
    Reservation.findById({_id: req.params.id}, callback);
};

exports.addReservation = function (req, callback) {
    const newReservation = new Reservation(req.body);
    newReservation.save(callback);
};

exports.updateReservation = function (req, callback) {
    const newReservation = new Reservation(req.body);
    Reservation.update({_id: req.params.id}, newReservation,callback);
};

exports.deleteReservation = function (req, callback) {
    Reservation.remove({_id: req.params.id}, callback);
};

exports.changeReservationStatus = function (req, status, callback) {
    Reservation.update({_id: req.body._id}, {status: status}, callback)
};

exports.getReservationsByIsConfirmed = function (req, isConfirmed, callback) {
    Reservation.find({isConfirmed: isConfirmed}, callback);
};