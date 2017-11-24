const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',function(){
    console.log('Connected to database'+config.database);
});

mongoose.connection.on('error',function(err){
    console.log('Database error: '+err);
});

const app=express();
var router = express.Router();

var Room = require('./models/room'); //created model loading here

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

// Defaut route: alle routes beginnen bij /api/
app.use('/api', router);

const users=require('./routes/users');
var roomRoutes = require('./routes/roomRoutes');

//Port number
const port =6600;

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
//app.use('/rooms', roomRoutes);

roomRoutes(app);

//index route
router.get('/', function(req, res){
    res.json({message: 'Invalid Endpoint'});
});

//start server
app.listen(port, function(){
    console.log('Server started on port '+port);
});



