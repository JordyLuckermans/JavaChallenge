import {Reservation} from "./reservation.model";

export class Room {
  constructor(
    public name:String,
    public dimensions:String,
    public location:String,
    public description:String,
    public id?: String,
    public reservations?: Reservation[]
  ){}
}
