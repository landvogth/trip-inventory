import { Component, OnInit } from '@angular/core';
import { ItemDataService } from '../item-data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items$: Observable<Object>;

  constructor(private itemDataService: ItemDataService) {
    this.loadItemList();
  }

  loadItemList() {
    this.items$ = this.itemDataService.getItems();
  }

  deleteItem(item) {
    this.itemDataService.delete(item).subscribe({

      next: (data) => { console.log("deleted"); this.loadItemList() },
      error: (error) => { console.log(error) }

    });
  }

  ngOnInit(): void {
  }
}
