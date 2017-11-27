import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/room.model";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../models/reservation.model";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-dummie-data',
    templateUrl: './dummie-data.component.html'
})
export class DummieDataComponent implements OnInit {

    constructor(private roomService: RoomService,
                private reservationService: ReservationService,
                private authService: AuthService,
                private flashMessage: FlashMessagesService) {
    }

    ngOnInit() {
        this.roomService.getRooms().subscribe(
            res => console.log(this.roomService.rooms),
            err => console.error(err)
        );

        /*this.reservationService.getReservations().subscribe(
         res => console.log(this.reservationService.reservations),
         err => console.error(err)
         );*/

    }

    generateRooms() {
        const rooms: Room[] = [
            {
                name: "Mediaruimte",
                dimensions: "39.2m²",
                location: "urban center",
                description: "Heeft 10 laptops en een VR-headset"
            },
            {
                name: "Akoestische ruimte",
                dimensions: "36.3m²",
                location: "urban center",
                description: "Heeft goede akoestiek en er staat een piano"
            },
            {
                name: "Studio",
                dimensions: "39.2m²",
                location: "urban center",
                description: "lege description geeft error"
            },
            {
                name: "Bar/lounge",
                dimensions: "199.2m²",
                location: "urban center",
                description: "Mensen moeten door deze ruimte als ze naar een andere zaal willen, hier kan je ook terecht voor een drankje."
            },
            {
                name: "Grote danszaal 1",
                dimensions: "groot",
                location: "urban center",
                description: "Vormt feestzaal samen met grote  danszalen 2 en 3. Deze zaal heeft parket en een grote spiegel. Je kan deze zaal apart reserveren of met samen met de andere danszalen."
            },
            {
                name: "Grote danszaal 2",
                dimensions: "groot",
                location: "urban center",
                description: "Vormt feestzaal samen met grote  danszalen 1 en 3.  Deze zaal heeft parket en een grote spiegel. Je kan deze zaal apart reserveren of met samen met de andere danszalen."
            },
            {
                name: "Grote danszaal 3",
                dimensions: "groot",
                location: "urban center",
                description: "Vormt feestzaal samen met grote  danszalen 1 en 2.  Deze zaal heeft parket en een grote spiegel. Je kan deze zaal apart reserveren of met samen met de andere danszalen."
            },
            {
                name: "Kleine danszaal 1",
                dimensions: "79.6m²",
                location: "urban center",
                description: "Heeft een spiegel en een parketvloer. Je kan je muziek verbinden met bluetooth."
            },
            {
                name: "Kleine danszaal 2",
                dimensions: "94.4m²",
                location: "urban center",
                description: "Heeft een spiegel en een betonnen vloer."
            },
            {
                name: "Kleine danszaal 3",
                dimensions: "115.8m²",
                location: "urban center",
                description: "Heeft een spiegel, je moet wel je eigen muziekinstallatie meenemen."
            },
            {
                name: "Vergaderzaal",
                dimensions: "heel groot",
                location: "urban center",
                description: "Dit is de ideale ruimte om te vergaderen, het is goed geïsoleerd en er is plaats voor 20 personen."
            }
        ];

        rooms.forEach((room: Room) => {
            this.roomService.addRoom(room).subscribe(
                res => console.log(res),
                err => console.error(err)
            );
        });

        if (rooms.length > 7) {
            this.flashMessage.show('Zalen zijn toegevoegd', {cssClass: 'alert-success', timeout: 3000});
        }
    }

    generateUsers() {
        const users: User[] = [
            {
                name: "Jan Peeters",
                email: "lguacademygroep7@gmail.com",
                username: "Peeters",
                password: "LGUGroep7",
                phoneNumber: "0486888888",
                isAdmin: true
            },
            {
                name: "Frederik Vallaeys",
                username: "Vallaeys",
                email: "lgugebruikergroep7@gmail.com",
                password: "LGUGroep7",
                phoneNumber: "0486888888",
                isAdmin: false
            },
        ];

        users.forEach((user: User) => {
            this.authService.registerUser(user).subscribe(
                res => console.log(res),
                err => console.error(err)
            );
        });

        if (users.length >= 2) {
            this.flashMessage.show('Users zijn toegevoegd', {cssClass: 'alert-success', timeout: 3000});
        }
    }

    /*generateReservations() {
     const reservations: Reservation[] = [
     {
     room: "Mediaruimte",
     starttime: new Date("December 1, 2017 10:00:00"),
     endtime: new Date("December 1, 2017 11:00:00"),
     motivation: "Social media les geven aan jongeren van 10 tot 15 jaar."
     },
     {
     room: "mediaruimte",
     starttime: new Date("December 4, 2017 10:00:00"),
     endtime: new Date("December 4, 2017 11:00:00"),
     motivation: "Social media les geven aan jongeren van 10 tot 15 jaar."
     },
     {
     room: "mediaruimte",
     starttime: new Date("December 5, 2017 11:00:00"),
     endtime: new Date("December 4, 2017 12:00:00"),
     motivation: "Social media les geven aan jongeren van 10 tot 15 jaar."
     },
     ];

     reservations.forEach((reservation: Reservation) => {
     this.reservationService.askReservation(reservation).subscribe(
     res => console.log(res),
     err => console.error(err)
     );
     });
     }*/


}
