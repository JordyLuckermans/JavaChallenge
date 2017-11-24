import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Reservation} from "../models/reservation.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class ReservationService {

  constructor(private http: Http) { }

  url = "https://localhost:6600";

  reservation: Reservation;
  reservations: Reservation[];

  //add pending reservation
  askReservation(reservation) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "/reservations", reservation, {headers})
      .map(res => res.json());
  }

  getReservations() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(this.url + "/reservations", {headers})
      .map((res: Response) => {
        const result = res.json();
        let parsedReservations:Reservation[] = [];
        for(let res in result.obj){
          parsedReservations.push(this.objToReservation(res));
        }
       this.reservations = parsedReservations;
      });
  }

  getReservationById(resId){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(this.url + "/reservations/" + resId, {headers})
      .map((res:Response) => {
        this.reservation = this.objToReservation(res.json().obj);
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  deleteReservationById(resId){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + "/reservations/" + resId, {headers})
      .map((res:Response) => {
        return this.objToReservation(res.json().obj);
      })
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  updateReservation(reservation) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.url + "/reservations/" + reservation.id, reservation, {headers})
      .map(res => res.json())
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  confirmReservation(reservation) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch(this.url + "/reservations/" + reservation.id + '/confirm', reservation, {headers})
      .map(res => res.json())
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  denyReservation(reservation) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch(this.url + "/reservations/" + reservation.id + '/deny', reservation, {headers})
      .map(res => res.json())
      .catch((err: Response) => {
        console.error(err);
        return Observable.throw(err);
      });
  }

  objToReservation(obj):Reservation{
    return new Reservation(
      obj.room,
      obj.user,
      obj.starttime,
      obj.endtime,
      obj.motivation,
      obj.status,
      obj.comment,
      obj._id
    );
  }

}
