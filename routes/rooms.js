const express=require('express');
const router=express.Router();
const Room=require('../models/room');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');


router.get('/rooms', function (req, res, next) {
    res.json(Room.getAllRooms());
})

router.post('/rooms',function(req,res,next){
    const newRoom = new Room( req.body );

    Room.addRoom(newRoom,function(err, room){
        if(err){
            res.json({success:false, msg:'Failed to register user'});
        }else{
            res.json({success:true, msg:'User registered'});
        }
    });
});

module.exports=router;