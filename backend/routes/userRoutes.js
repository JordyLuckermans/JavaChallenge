'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports = function (app) {
    var UserController = require('../controllers/userController');

    // TODO: remove or secure this before production
    app.route('/users')
        .get(UserController.getAllUsers);

    app.route('/users/register')
        .post(UserController.registerUser);

    app.route('/users/authenticate')
        .post(UserController.authenticateUser);

    app.route('/users/profile')
        .get(UserController.getProfile);
        // This used to be:
        //.get(passport.authenticate('jwt',{session:false}), UserController.getProfile);
        // But it stopped working
        // I don't know why
        // Or why it ever worked
};