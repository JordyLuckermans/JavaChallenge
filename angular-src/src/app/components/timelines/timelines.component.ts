import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-timelines',
  templateUrl: './timelines.component.html'
})
export class TimelinesComponent implements OnInit {

  //dummie
  firstDay: Date = new Date();

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.firstDay = params['date'];
      console.log("test" + this.firstDay);
    });
  }

}
