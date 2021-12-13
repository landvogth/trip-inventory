import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from "./list";
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {

  url: string = "/api/lists";

  constructor(private http: HttpClient) { }

  get(id?:number) {

    let endPoint = this.url;

    if(id) {
      endPoint = endPoint + "/" + id;
    }

    return this.http.get(endPoint);
  }

  save(list: List) {
    return this.http.post(this.url, list);
  }

  delete(list: List) {
    let endPoint = this.url + "/" + list.id;
    return this.http.delete(endPoint);
  }

}
