import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from "../../models/room.model";
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit {
    @Input() room: Room;

    constructor(private roomservice: RoomService,
                private authService: AuthService,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
    }

    onClickEdit() {
        this.flashMessage.show("Zaal is aangepast", {
            cssClass: 'alert-warning',
            timeout: 3000
        });
    }

    onClickDelete() {
        this.flashMessage.show('De zaal kon niet verwijderd worden', {cssClass: 'alert-danger', timeout: 3000});

    }
}
