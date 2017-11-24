import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {
  @Input() reservationsDay;

  indexes = [];
  times = [];
  xlocations = [];

  svgRects;

  constructor() {
    for (let i = 9; i <= 22; ++i) {
      this.indexes.push(i - 9);
      this.times.push(i + ":00");
      this.xlocations.push(i - 9);
    }
  }

  ngOnInit() {

    let svgRect = [];

    this.reservationsDay.forEach((r) => {
      svgRect.push(this.calculateReservedBar(r.start, r.end));
    });

    this.svgRects = svgRect;
  }

  calculateReservedBar = (start: Date, end: Date) => {
    let startX = start.getHours() + (start.getMinutes() / 60);
    let endX = end.getHours() + (end.getMinutes() / 60);
    return [startX - 9, endX - startX];// 0 = start, 1 = length
  }
}
