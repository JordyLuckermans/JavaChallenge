import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: 'edit-room.component.html',
  styleUrls: ['edit-room.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[RoomService]
})
export class EditRoomComponent implements OnInit {
  rooms:Room[];

  constructor(private roomService:RoomService) {
    this.roomService.getRooms().subscribe(rooms=> {
      this.rooms = rooms;
    })
  }
  ngOnInit() {
  }

}
interface Room{
  id: number;
  name:string;
  location:String;
  description:String;
}
