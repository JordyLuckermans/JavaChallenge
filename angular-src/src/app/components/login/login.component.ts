import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Location} from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(private authService: AuthService,
                private router: Router,
                private flashMessage: FlashMessagesService,
                private _location: Location) {
    }

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
            username: this.username,
            password: this.password
        }
        this.authService.authenticateUser(user).subscribe(data => {
            if (data.success) {

                this.authService.storeUserData(data.token, data.user);
                this.flashMessage.show('U bent nu aangemeld! ', {cssClass: 'alert-success', timeout: 5000});

                this._location.back();
                /*window.location.reload();
                this.router.navigate(['/home']);*/


            } else {
                this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});

                this.router.navigate(['/login']);
            }

        });
    }

}
