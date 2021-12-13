import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Observable } from 'rxjs';
import { Trip } from '../trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  trips$: Observable<Object>;
  selectedTrip:Trip = null;

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

  select(trip:Trip) {
    console.log(trip.id);
    this.selectedTrip = trip;
  }

  ngOnInit(): void {
  }
}
