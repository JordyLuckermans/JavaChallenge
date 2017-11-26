import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from "../../models/room.model";
import {AuthService} from '../../services/auth.service';


@Component({
    selector: 'app-room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit {
    @Input() room:Room;

    constructor(private roomservice: RoomService) {
    }

    ngOnInit() {
    }

}
