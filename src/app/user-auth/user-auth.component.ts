import { Component, OnInit } from '@angular/core';
import { UserSignInRequestData, UserSignUpRequestData } from '../data-type';
import { UserService } from '../user-services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  switchMode = true;

  // Inject userService to use the service Functionality and Methods for API
  constructor( private userService: UserService ) {}

  ngOnInit(): void {
    // this.userService.userAuthReload();
  }

  // The Function for User to Sign Up
  onUserSignUp(data: UserSignUpRequestData) {
    // console.log({data});

    // call the Service userSignUp from userService
    this.userService.userSignUp(data);
  }
  
   // This will Redirect from SignIn to SignUp
   redirectToSignUp() {
    this.switchMode = true;
  }

  // This will Redirect from SignUp to SignIn Page
  redirectToSignIn() {
    this.switchMode = false;
  }

  // 
  onUserSignIn(data: UserSignInRequestData) {
    // console.log({data});

    // get the User from the API
    this.userService.userSignIn(data);
  }
}
