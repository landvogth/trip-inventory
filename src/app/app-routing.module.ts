
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { TripListComponent } from './trip-list/trip-list.component';

const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'trips', component: TripListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }