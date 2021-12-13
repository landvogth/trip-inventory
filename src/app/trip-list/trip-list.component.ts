import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips$: Observable<Object>;

  constructor(private tripDataService: TripDataService) {
    this.loadList();
  }

  loadList() {
    this.trips$ = this.tripDataService.get();
  }

  delete(trip) {
    this.tripDataService.delete(trip).subscribe({

      next: (data) => { console.log("deleted"); this.loadList() },
      error: (error) => { console.log(error) }

    });
  }  

  ngOnInit(): void {
  }
}
