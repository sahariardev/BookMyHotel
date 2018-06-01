import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BigLoadingComponent } from './components/big-loading/big-loading.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { BookComponent } from './components/book/book.component';

const appRoutes:Routes=[
  {
    path:'',component:HomeComponent
  },
  {
    path:'hotel/:id',component:HotelComponent
  },
  {
    path:'book/:hotelid/:roomid',component:BookComponent
  }
] 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BigLoadingComponent,
    HotelComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatSelectModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
