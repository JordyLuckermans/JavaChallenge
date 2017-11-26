import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from "../../models/room.model";

@Component({
    selector: 'app-overview-rooms',
    /*templateUrl: 'overview-rooms.component.html',*/
    template: `
    <h2>Overzicht zalen</h2>

    <p>De volgende zalen stellen wij ter beschikking. Als er een zaal is dat je interesseert kan je meteen de
    beschikbaarheden nakijken en reserveren.</p>
    <br/>
    <div class="container-fluid">
        <div class="row">
            <app-room [room]=room *ngFor="let room of rooms"></app-room>
        </div>
     </div>
        
`,
    encapsulation: ViewEncapsulation.None
})
export class OverviewRoomsComponent implements OnInit {
    rooms: Room[];

    constructor(private roomService: RoomService) {
        console.log("constructor done");
    }

    ngOnInit() {
        console.log("ngOnInit done");
        this.roomService.getRooms().subscribe(
            (rooms: Room[]) => {
                this.rooms = rooms;
            }
            //res=>console.log(this.roomService.rooms),
            //err=>console.error(err),
        );
    }

}