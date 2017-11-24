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
    //starttime en endtime

    //check availability

    const reservation = {
      room: this.room,
      user: this.user,
      starttime: this.starttime,
      endtime: this.endtime,
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
