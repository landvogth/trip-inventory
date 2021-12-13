import { Component, Input, OnInit } from '@angular/core';
import { ItemDataService } from '../item-data.service';
import { List } from '../list';
import { ListDataService } from '../list-data.service';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-item-list',
  templateUrl: './trip-item-list.component.html',
  styleUrls: ['./trip-item-list.component.scss']
})
export class TripItemListComponent implements OnInit {

  @Input() trip? : Trip;

  list:List = null;

  constructor( 
    private itemDataService: ItemDataService,
    private listDataService: ListDataService) { }

  ngOnInit(): void {
    
  }

  getList() {

    if( !this.trip) {
      console.log('no trip selected');
    }

    let list$ = this.listDataService.get(this.trip.id);

    list$.subscribe( (data:any) => {

      this.list = data;

    })

  }

}
