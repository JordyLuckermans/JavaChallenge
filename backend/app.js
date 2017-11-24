const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
var router = express.Router();
const Room = require('./models/room'); //created model loading here
const User = require('./models/user');
const Reservation = require('./models/reservation');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
require('./config/passport')(passport);

//Port number
const port = 6600;

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database' + config.database);
});

mongoose.connection.on('error', function (err) {
    console.log('Database error: ' + err);
});

// mongoose instance connection url connection
//mongoose.Promise = global.Promise;

// Defaut route: alle routes beginnen bij /api/
// TODO: fix this
app.use('/api', router);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
userRoutes(app);
roomRoutes(app);
reservationRoutes(app);

//index route
router.get('/', function (req, res) {
    res.json({message: 'Invalid Endpoint'});
});

//start server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});



