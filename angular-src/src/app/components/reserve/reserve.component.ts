import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from "app/services/validate.service";
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/room.model";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit {
  room: Object;
  date: String;
  user: Object;
  starttime: String;
  endtime: String;
  motivation: String;
  comment: String;

  rooms: Object[];


  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private roomService: RoomService,
              private reservationService: ReservationService,
              private authService: AuthService) {

    roomService.getRooms().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe(
      res => this.rooms = this.roomService.rooms,
      err => console.log(err)
    );

    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onReserveSubmit() {
    var startDateString = this.date + " " + this.starttime;
    var endDateString = this.date + " " + this.endtime;


    var parsedStartDate = Date.parse(startDateString);
    var parsedEndDate = Date.parse(endDateString);

    if (!this.validateService.validateDate(startDateString) && !this.validateService.validateDate(endDateString)) {
      this.flashMessage.show("vul aub een geldige datum en tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      console.log("date 1" + parsedStartDate);
      console.log("date 2" + parsedEndDate);
      return false;
    }

    if (!this.validateService.validateTime(this.starttime) && !this.validateService.validateTime(this.endtime)) {
      this.flashMessage.show("vul aub een geldig tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (Date.now() > parsedStartDate || Date.now() > parsedEndDate) {
      this.flashMessage.show("vul aub een datum in de toekoemst in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (parsedStartDate > parsedEndDate) {
      this.flashMessage.show("vul aub een einduur na uw beginuur in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    /*var roomObjectId = mongoose.Types.ObjectId(this.room['id']);
    var userObjectId = mongoose.Types.ObjectId(this.room['_id']);*/

    const reservation = {

      room: this.room['id'],
      user: this.user['_id'],
      starttime: parsedStartDate,
      endtime: parsedEndDate,
      motivation: this.motivation,
      status: "In Afwachting",
      comment: this.comment
    }

    console.log(reservation);
    console.log(this.user);
    console.log(this.room)

    if (!this.validateService.validateReservation(reservation)) {
      this.flashMessage.show('Vul aub alle velden in.', {cssClass: 'alert-danger', timeout: 3000})

      return false;
    }

    this.reservationService.confirmReservation(reservation).subscribe(data => {
      if (data.success) {
        alert("success");
      } else {
        alert("fail");
      }
    });
  }
}
