import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripEditorComponent } from './trip-editor/trip-editor.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditorComponent } from './item-editor/item-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemEditorComponent,
    TripListComponent,
    TripEditorComponent,
    ItemListComponent,
    ItemEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
