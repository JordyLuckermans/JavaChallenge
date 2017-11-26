import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from "../../services/room.service";
import {isNullOrUndefined} from "util";
import {Room} from "../../models/room.model";
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent implements OnInit {
  @Input() roomId: String;
  @Input() firstdayOfWeek: Date;

  dateIn;
  loaded = false;
  daysOfWeek: Date[] = [];
  room: Room;
  indexes = [0, 1, 2, 3, 4, 5, 6];
  weekDays = ["zon", "maa", "din", "woe", "don", "vrij", "zat"];
  reservations = [ //for each day of week
    [],//0
    [],//1
    [],//2
    [],//3
    [],//4
    [],//5
    [],//6
  ];
  /* = [
			[ //maa
				{
					starttime: new Date(2017, 11, 23, 10),
					endtime: new Date(2017, 11, 23, 15, 43)
				},
				{
					starttime: new Date(2017, 11, 23, 16, 55),
					endtime: new Date(2017, 11, 23, 20, 30)
				}
			],
			[],//din
			[],//woe
			[],//don
			[//vrij
				{
					starttime: new Date(2017, 11, 23, 12),
					endtime: new Date(2017, 11, 23, 21, 30)
				}
			],
			[],//zat
			[]//zon
		];*/
  //dummie data

  constructor(private router: Router, private roomService: RoomService) {

  }

  ngOnInit() {
    console.log(this.reservations);
    if (isNullOrUndefined(this.firstdayOfWeek)) this.firstdayOfWeek = new Date();
    if (isNullOrUndefined(this.roomId)) this.roomId = "5a195e910c25f635c85ddbd1";
    //this.testService();
    console.log(this.firstdayOfWeek);
    for (let i = 0; i < 7; ++i) {
      this.daysOfWeek.push(new Date(this.firstdayOfWeek));
      this.daysOfWeek[i].setDate(this.daysOfWeek[i].getDate() + i);
    }
    //one day back bc backend function parameter is exclusive
    //alse date is day of month bc javascript
    let firstDayMinusOne = new Date(this.firstdayOfWeek.getTime());
    firstDayMinusOne.setDate(firstDayMinusOne.getDate() - 1);
    let weekLater = new Date(this.firstdayOfWeek.getTime());
    weekLater.setDate(weekLater.getDate() + 9);

    this.roomService.getRoomWithRervationsBetween(this.roomId, firstDayMinusOne, weekLater).subscribe(
      () => {
        this.room = this.roomService.room;
        for (let res of this.room.reservations) {
          let dateOfRes = new Date(res.starttime.getFullYear(), res.starttime.getMonth(), res.starttime.getDate());
          this.reservations[this.daysOfWeek.findIndex(d => d == dateOfRes)].push({
            starttime: res.starttime,
            endtime: res.endtime
          });
        }
        console.log(this.room.reservations);
        console.log(this.room.name);
        this.loaded = true;
      },
      err => console.error(err)
    );
  }

  formatDate(d: Date) {
    return this.weekDays[d.getDay()] + "\n" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  testDate(){
    //loading the same route with defferent params doesn't reload...
    this.router.navigateByUrl('/').then(
      () => {
        this.router.navigate(['/timeline', {date: this.dateIn}]);
      });
  }

  prevWeek(){
    let prev = new Date(this.firstdayOfWeek.getTime());
    prev.setDate(prev.getDate() - 7);
    this.dateIn = this.dateToString(prev);
    this.testDate()
  }

  nextWeek(){
    let prev = new Date(this.firstdayOfWeek.getTime());
    prev.setDate(prev.getDate() + 7);
    this.dateIn = this.dateToString(prev);
    this.testDate()
  }

  testService() {
    this.roomService.getAllRoomsWithRervationsBetween(new Date(2017, 10, 1), new Date(2017, 10, 30)).subscribe(
      () => {console.log("all");console.log(this.roomService.rooms)},
      err => console.error(err)
    );
    this.roomService.getRoomWithRervationsBetween(
      "5a195e910c25f635c85ddbd1",
      new Date(2017, 10, 1), new Date(2017, 10, 30)
    ).subscribe(
      () => {console.log("one");console.log(this.roomService.room)},
      err => console.error(err)
    );
  }

  dateToString(date: Date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
}
