const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

const reservationSchema= new mongoose.Schema({

    room:{
        type:String,
        required:true
    },
    user:{
        type:String,
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
            array: ['Vrij', 'In afwachting', 'Gereserveerd']
        }],
        default: ['Vrij']
    },
    comment:{
        type:String,
        required:true
    }
});

const Reservation=module.exports =mongoose.model('Reservation',reservationSchema);






