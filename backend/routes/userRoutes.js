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



/*const express=require('express');
const router=express.Router();
const User=require('../models/user');
const config=require('../config/database')



router.post('/register',function(req,res,next){
   const newUser=new User({
       name:req.body.name,
       email:req.body.email,
       username:req.body.username,
       password:req.body.password,
       phoneNumber:req.body.phoneNumber
   });

   User.addUser(newUser,function(err,user){
       if(err){
           res.json({success:false, msg:'Failed to register user'});
       }else{
           res.json({success:true, msg:'User registered'});

       }
   });
});




router.post('/authenticate',function(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    User.getUserByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'User not found'});
        }

        User.comparePassword(password,user.password,function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                const token=jwt.sign({data:user},config.secret,{expiresIn:604800
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        phoneNumber:user.phoneNumber
                    }
                });
            }
            else{
                return res.json({success:false,msg:'Wrong password'});
            }
        });
    });
});



router.get('/profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
    res.json({user:req.user})
});*/
//module.exports=router;