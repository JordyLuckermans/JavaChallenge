import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent implements OnInit {
  @Input() firstdayOfWeek: Date;

  dateIn;

  daysOfWeek: Date[];

  indexes = [0, 1, 2, 3, 4, 5, 6];
  weekDays = ["zon", "maa", "din", "woe", "don", "vrij", "zat"];
  reservations = [
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
  ];
  //dummie data

  constructor(private router: Router, private roomService: RoomService) {

  }

  ngOnInit() {
    let tempDates: Date[] = [];
    for (let i = 0; i < 7; ++i) {
      tempDates.push(new Date(this.firstdayOfWeek));
      console.log(tempDates + " " + i);
      tempDates[i].setDate(tempDates[i].getDate() + i);
    }
    this.daysOfWeek = tempDates;
    this.testService();
  }

  formatDate(d: Date) {
    return this.weekDays[d.getDay()] + "\n" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  //test
  testDate(){
    //loading the same route with defferent params doesn't reload...
    this.router.navigateByUrl('/').then(
      () => {
        this.router.navigate(['/timeline', {date: this.dateIn}]);
      });
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
}
