import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from "app/services/validate.service";
import {RoomService} from "../../services/room.service";
import {ReservationService} from "../../services/reservation.service";
import {Room} from "../../models/room.model";

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
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/login'])
    }

    this.roomService.getRooms().subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
      }
    );

    this.authService.getProfile().subscribe(profile=> {
        this.user = profile.user;
      },
      err=>{
        console.log(err);
        return false;
      });

    console.info("user", this.user);
  }

  onReserveSubmit() {
    let startDateString = this.date + " " + this.starttime;
    let endDateString = this.date + " " + this.endtime;

    let parsedStartDate = Date.parse(startDateString);
    let parsedEndDate = Date.parse(endDateString);

    if(!this.validateService.validateDateFormat(this.date)) {
      this.flashMessage.show("Gebruik aub een datum met formaat dd/mm/jjjj", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validation datestring
    if (!this.validateService.validateDate(startDateString) && !this.validateService.validateDate(endDateString)) {
      this.flashMessage.show("vul aub een geldige datum en tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validation time
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


    const reservation = {

      room: this.room['id'],
      user: this.user['_id'],
      starttime: parsedStartDate,
      endtime: parsedEndDate,
      motivation: this.motivation,
      comment: this.comment
    }

    if (!this.validateService.validateReservation(reservation)) {
      this.flashMessage.show('Vul aub alle velden in.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.reservationService.askReservation(reservation).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Uw reservering is aangevraagd', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['']);
      } else {
        this.flashMessage.show('Er is iets mis gegaan bij het aanmaken van de reservering.', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
