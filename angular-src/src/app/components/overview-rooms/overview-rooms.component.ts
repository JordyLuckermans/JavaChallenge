import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-overview-rooms',
  templateUrl: 'overview-rooms.component.html',
  styleUrls: ['overview-rooms.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[RoomService]
})
export class OverviewRoomsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
