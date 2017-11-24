import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html'
})
export class WeekViewComponent implements OnInit {

  indexes = [0, 1, 2, 3, 4, 5, 6];
  weekDays = ["maa", "din", "woe", "don", "vrij", "zat", "zon"];
  reservations = [
    [ //maa
      {
        start: new Date(2017, 11, 23, 10),
        end: new Date(2017, 11, 23, 15, 43)
      },
      {
        start: new Date(2017, 11, 23, 16, 55),
        end: new Date(2017, 11, 23, 20, 30)
      }
    ],
    [],//din
    [],//woe
    [],//don
    [//vrij
      {
        start: new Date(2017, 11, 23, 12),
        end: new Date(2017, 11, 23, 21, 30)
      }
    ],
    [],//zat
    []//zon
  ];
  //dummie data

  constructor() {

  }

  ngOnInit() {

  }

}
