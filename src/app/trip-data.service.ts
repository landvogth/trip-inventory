import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from "./trip";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  url: string = "/api/trips";

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.url).pipe(
      map((res: Trip[]) => res.sort((a, b) => Date.parse(a.startdate) - Date.parse(b.startdate))),
      catchError(err => of('error', err))
    );
  }

  save(trip: Trip) {
    return this.http.post(this.url, trip);
  }

  delete(trip: Trip) {
    let endPoint = this.url + "/" + trip.id;
    return this.http.delete(endPoint);
  }

}
