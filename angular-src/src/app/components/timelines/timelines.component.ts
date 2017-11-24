import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isNullOrUndefined} from "util";


@Component({
  selector: 'app-timelines',
  templateUrl: './timelines.component.html'
})
export class TimelinesComponent implements OnInit {

  //dummie
  firstDay: Date;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (!isNullOrUndefined(params['date'])) {
        let str:String = params['date'];
        let parts = str.split('-');
        console.log(parts);
        this.firstDay = new Date(+parts[0],+parts[1],+parts[2]);
        console.log("test" + this.firstDay.getDate() + '/' + this.firstDay.getMonth()) ;
      }
    });
  }

  ngOnInit() {

  }
}
