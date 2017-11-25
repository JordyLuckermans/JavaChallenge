'use strict';
const jwt=require('jsonwebtoken');
const passport=require('passport');

module.exports = function(app) {
    var UserController = require('../controllers/userController');

    app.route('/users')
        .get(UserController.getAllUsers);

    app.route('/users/register')
        .post(UserController.registerUser);

    app.route('/users/authenticate')
        .post(UserController.authenticateUser);
    
    app.route('/users/profile')
        .get(passport.authenticate('jwt',{session:false}), UserController.getProfile);
};