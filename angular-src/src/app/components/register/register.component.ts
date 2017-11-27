import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  phoneNumber: Number;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      phoneNumber: this.phoneNumber
    }
    console.log(user);
    //Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Vul aub alle velden in.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Uw e-mail adres is incorrect.', {cssClass: 'alert-danger', timeout: 3000});

      return false;
    }

    if (!this.validateService.validatePhone(user.phoneNumber)) {
      this.flashMessage.show('Vul aub een correct telefoonnummer in.', {
        cssClass: 'alert-danger',
        timeout: 3000
      });

      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('U bent geregistreerd en kan nu inloggen.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Er is iets mis gegaan, probeer het later nog eens of neem contact met ons op.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);

      }
    });
  }
}
