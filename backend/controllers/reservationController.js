'use strict';

var ReservationRepository = require('../repositories/reservationRepository');

exports.getAllReservations = function (req, res) {
    ReservationRepository.getAllReservations(req, res);
};

exports.getReservationById = function (req, res){
    ReservationRepository.getReservationById(req, res);
};

exports.addReservation = function (req, res) {
    ReservationRepository.addReservation(req, res);
};

exports.updateReservation = function (req, res) {
    ReservationRepository.updateReservation(req, res);
};

exports.deleteReservation = function (req, res) {
    ReservationRepository.deleteReservation(req, res);
};