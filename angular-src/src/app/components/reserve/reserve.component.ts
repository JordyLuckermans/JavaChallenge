import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-reserve',
  templateUrl: 'reserve.component.html',
  styleUrls: ['reserve.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReserveComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
