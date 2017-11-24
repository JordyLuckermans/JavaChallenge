import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from "app/services/validate.service";

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit {
  room: String;
  user: String;
  date: String;
  starttime: String;
  endtime: String;
  motivation: String;
  comment: String;
  
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onReserveSubmit() {
    var startDateString = this.date + " " + this.starttime;
    var endDateString = this.date + " " + this.endtime;


    var parsedStartDate = Date.parse(startDateString);
    var parsedEndDate = Date.parse(endDateString);

    if(!this.validateService.validateDate(startDateString) && !this.validateService.validateDate(endDateString)){
      this.flashMessage.show("vul aub een geldige datum en tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      console.log("date 1" + parsedStartDate);
      console.log("date 2" + parsedEndDate);
      return false;
    }

    if(!this.validateService.validateTime(this.starttime) && !this.validateService.validateTime(this.endtime)){
      this.flashMessage.show("vul aub een geldig tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(Date.now() > parsedStartDate || Date.now() > parsedEndDate){
      this.flashMessage.show("vul aub een datum in de toekoemst in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if( parsedStartDate > parsedEndDate){
      this.flashMessage.show("vul aub een einduur na uw beginuur in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const reservation = {
      room: this.room,
      user: this.user,
      starttime: parsedStartDate,
      endtime: parsedEndDate,
      motivation: this.motivation,
      status: "In Afwachting",
      comment: this.comment
    }

    console.log(reservation);

    if(!this.validateService.validateReservation(reservation)){
      this.flashMessage.show('Vul aub alle velden in.', {cssClass: 'alert-danger', timeout: 3000})

      return false;
    }
  }
}
