import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/room.model";

@Component({
  selector: 'app-dummie-data',
  templateUrl: './dummie-data.component.html'
})
export class DummieDataComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRooms().subscribe(
      res=>console.log(this.roomService.rooms),
      err=>console.error(err)
    );
  }

  generateRooms() {
    const rooms: Room[] = [
      {
        name: "mediaruimte",
        dimensions: "39.2m²",
        location: "urban center",
        description: "heeft media"
      },
      {
        name: "akoestische ruimte",
        dimensions: "36.3m²",
        location: "urban center",
        description: "heeft goede akoestiek"
      },
      {
        name: "studio",
        dimensions: "39.2m²",
        location: "urban center",
        description: "lege description geeft error"
      },
      {
        name: "bar/lounge",
        dimensions: "199.2m²",
        location: "urban center",
        description: "Mensen moeten door deze ruimte als ze naar een andere zaal willen"
      },
      {
        name: "grote danszaal 1",
        dimensions: "groot",
        location: "urban center",
        description: "Vormt feestzaal samen met grote  danszalen 2 en 3."
      },
      {
        name: "grote danszaal 2",
        dimensions: "groot",
        location: "urban center",
        description: "Vormt feestzaal samen met grote  danszalen 1 en 3."
      },
      {
        name: "grote danszaal 3",
        dimensions: "groot",
        location: "urban center",
        description: "Vormt feestzaal samen met grote  danszalen 1 en 2."
      },
      {
        name: "kleine danszaal 1",
        dimensions: "79.6m²",
        location: "urban center",
        description: "Heeft een spiegel."
      },
      {
        name: "kleine danszaal 2",
        dimensions: "94.4m²",
        location: "urban center",
        description: "Heeft een spiegel."
      },
      {
        name: "kleine danszaal 3",
        dimensions: "115.8m²",
        location: "urban center",
        description: "Heeft een spiegel."
      },
      {
        name: "vergaderzaal",
        dimensions: "heel groot",
        location: "urban center",
        description: "Is zo groot als de feestzaal."
      }
    ];

    rooms.forEach((room: Room) => {
      this.roomService.addRoom(room).subscribe(
        res => console.log(res),
        err => console.error(err)
      );
    });
  }

}
