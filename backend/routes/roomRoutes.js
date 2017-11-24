'use strict';

module.exports = function(app) {
    var roomController = require('../controllers/roomController');

    // todoList Routes
    app.route('/rooms')
        .get(roomController.getAllRooms)
        .post(roomController.addRoom);


    app.route('/rooms/:id')
        .get(roomController.getRoomById)
        //.put(todoList.update_a_task)
        //.delete(todoList.delete_a_task);
};
