const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

const reservationSchema=mongoose.Schema({

    room:{
        type:String,
        required:true
    },
    user:{
        type:String

    },
    starttime:{
        type:Date,
        required:true
    },
    endtime:{
        type:Date,
        required:true
    },
    motivation:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
});

const Reservation=module.exports =mongoose.model('Reservation',reservationSchema);


module.exports.getUserById=function(id,callback){
    User.findById(id, callback);
}


module.exports.getUserByUsername=function(username,callback){

    const query={username:username}
    User.findOne(query, callback);
}

module.exports.addUser= function (newUser, callback) {
    bcrypt.genSalt(10,function (err, salt)  {
        bcrypt.hash(newUser.password, salt, function(err, hash)  {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback());
        });
    });
}


