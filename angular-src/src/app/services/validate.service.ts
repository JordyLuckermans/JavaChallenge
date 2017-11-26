import { Injectable } from '@angular/core';


@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name==undefined || user.email==undefined || user.username==undefined || user.password==undefined){

      return false;

    }
    else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone){
    const re = /\b\d{9,10}?\b/;
    return re.test(phone);
  }

  validateReservation(reservation){
    if(reservation.room == undefined || reservation.user == undefined || reservation.starttime == undefined || reservation.endtime == undefined || reservation.motivation == undefined){
      return false;
    }
    return true;
  }

  validateDate(date){
    if(isNaN(Date.parse(date.toString()))){
      return false;
    }
    return true;
  }

  validateDateFormat(date){
    const re = /\d{1,2}\/\d{1,2}\/\d{4}/;
    return re.test(date);
  }

  validateTime(time){
    const re = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/;
    return re.test(time);
  }
}
