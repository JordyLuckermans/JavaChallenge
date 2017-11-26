import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  user: Object;

  constructor( private authService: AuthService,
  private router:Router) {}

  ngOnInit() {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/login'])
      console.log("niet ingelogd");
    }

  }

}
