import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Room} from "../models/room.model";

@Injectable()
export class RoomService {

  constructor(private http: Http) {}

  url = "https://localhost:6600";

  room: Room;
  rooms: Room[] = [];

  getRooms() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(this.url + "/rooms", {headers})
      .map((res: Response) => {
        const result = res.json();
        let parsedRooms: Room[] = [];
        for (let res in result.obj) {
          parsedRooms.push(this.objToRoom(res));
        }
        this.rooms = parsedRooms;
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  getRoomById(id) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(this.url + "/rooms/" + id, {headers})
      .map((res: Response) => {
        this.room = this.objToRoom(res.json().obj);
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  deleteRoomById(id) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete(this.url + "/rooms/" + id, {headers})
      .map((res: Response) => {
        this.room = this.objToRoom(res.json().obj);
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  deleteRoom(id, room: Room) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.delete(this.url + "/rooms/" + room.id, {headers})
      .map((res: Response) => {
        this.room = this.objToRoom(res.json().obj);
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  addRoom(room: Room) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "/rooms", room, {headers})
      .map(res => res.json())
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  updateRoom(room: Room) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.url + "/rooms/" + room.id, room, {headers})
      .map(res => res.json())
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  objToRoom(obj): Room {
    return new Room(
      obj.name,
      obj.dimensions,
      obj.location,
      obj.description,
      obj._id
    );
  }
}
