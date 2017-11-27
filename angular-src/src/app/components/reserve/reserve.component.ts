import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from "app/services/validate.service";
import {RoomService} from "../../services/room.service";
import {ReservationService} from "../../services/reservation.service";
import {Room} from "../../models/room.model";
import {find} from "rxjs/operator/find";

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
        this.user = profile.user.data;
        console.dir(profile.user);
        console.dir(this.user);
      },
      err=>{
        console.log(err);
        return false;
      });

  }

  onReserveSubmit() {
    let startDateString = this.date + " " + this.starttime;
    let endDateString = this.date + " "  + this.endtime;

    let startDateArray = startDateString.split("/");
    let endDateArray = endDateString.split("/");

    startDateString = startDateArray[1] + "/" + startDateArray[0] + "/" + startDateArray[2];
    endDateString = endDateArray[1] + "/" + endDateArray[0] + "/" + endDateArray[2];


    console.info("start", startDateString);
    console.info("end", endDateString);


    let parsedStartDate = Date.parse(startDateString);
    let parsedEndDate = Date.parse(endDateString);


    console.info("start", parsedStartDate);
    console.info("end", parsedEndDate);

    if(!this.validateService.validateDateFormat(this.date)) {
      this.flashMessage.show("Gebruik aub een datum met formaat dd/mm/jjjj", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validation datestring
    if (!this.validateService.validateDate(this.date)) {
      this.flashMessage.show("vul aub een geldige datum en tijdstip in", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    console.info("date", this.date);

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



    console.log(this.room);
    const reservation = {
      room: this.room['_id'],
      user: this.user['_id'],
      starttime: parsedStartDate,
      endtime: parsedEndDate,
      motivation: this.motivation,
      comment: this.comment
    };

    console.info("reservation:", reservation);

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
