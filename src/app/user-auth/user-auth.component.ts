import { Component } from '@angular/core';
import { UserSignUpRequestData } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  // The Function for User to Sign Up
  onUserSignUp(data: UserSignUpRequestData) {
    console.log({data});
  }

}
