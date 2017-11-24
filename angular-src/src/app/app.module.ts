import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';
import { FlashMessagesModule} from'angular2-flash-messages';
import { AuthGuard} from './guards/auth.guard';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TimelinesComponent } from './components/timelines/timelines.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { OverviewRoomsComponent } from './components/overview-rooms/overview-rooms.component';
import { ReserveComponent} from "./components/reserve/reserve.component";
import {ReservationService} from "./services/reservation.service";

const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'timeline',component:TimelinesComponent},
  {path:'overviewRooms',component:OverviewRoomsComponent},
  /*{path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},*/
  {path:'reserve', component:ReserveComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TimelineComponent,
    TimelinesComponent,
    WeekViewComponent,
    FooterComponent,
    OverviewRoomsComponent,
    ReserveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    ReservationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
