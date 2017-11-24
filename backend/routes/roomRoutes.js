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


/*router.get('/', function (req, res, next) {
    Room.getAllRooms(function (err, rooms) {
        if (err) {
            res.json({success: false})
        } else {
            res.json(rooms);
        }
    })
})

router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    Room.getRoomById(id, function (err, room) {
        if (err) {
            res.json({success: false})
        } else {
            res.json(room);
        }
    })
})

router.post('/', function (req, res, next) {
    const newRoom = new Room(req.body);

    Room.addRoom(newRoom, function (err, room) {
        if (err) {
            res.json({success: false, msg: 'Failed to create room'});
        } else {
            res.json({success: true, msg: 'Room created'});
        }
    });
});


module.exports = router;*/