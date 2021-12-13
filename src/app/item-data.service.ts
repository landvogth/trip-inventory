import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from "./Item";

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  url: string = "/api/items";

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(this.url);
  }

  save(item: Item) {
    return this.http.post(this.url, item);
  }

  delete(item: Item) {
    let endPoint = this.url + "/" + item.id;
    return this.http.delete(endPoint);
  }

}
