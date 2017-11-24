const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

const ObjectId = mongoose.Schema.ObjectId;
const reservationSchema= new mongoose.Schema({

    room:{
        type:ObjectId,
        required:true
    },
    user:{
        type:ObjectId,
        required:true
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
    status: {
        type: [{
            type: String,
            enum: ['Vrij', 'In afwachting', 'Gereserveerd']
        }],
        default: ['Vrij']
    },
    comment:{
        type:String,
        required:true
    }
});

const Reservation=module.exports =mongoose.model('Reservation',reservationSchema);






