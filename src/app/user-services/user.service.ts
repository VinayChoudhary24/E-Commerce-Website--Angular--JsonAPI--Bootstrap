import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignInRequestData, UserSignInResponseData, UserSignUpRequestData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // To show the Error Messsage for Wrong Emial,Password we need EventEmiiter
  userAuthErrorMessage = new EventEmitter<boolean>(false);

  // it is Important to Create a INSTANCE/INJECT httpClient to call the API
  constructor( private http: HttpClient, 
              // Inject Router to redirect to HomePage 
              private router: Router ) { }

  // This is the service for User to Sign Up --call API
  userSignUp(user: UserSignUpRequestData) {
    console.log({user});

    // To hit the API for USER
    this.http.post('http://localhost:3000/users', user, {
      observe: 'response'
    }).subscribe( (resdata) => {
      // console.log({resdata});

      if(resdata) {
        this.userAuthErrorMessage.emit(false);
        // store the data in the LocalStorage
        localStorage.setItem('userData', JSON.stringify(resdata.body));

        // Redirect the User to HomePage
        this.router.navigate(['/']);
      }else {
        this.userAuthErrorMessage.emit(true);
      }
    })
  }

  // This service will Sign In the User
  userSignIn(user: UserSignInRequestData) {
    // console.log({user});

    // Call the API
    this.http.get<UserSignInResponseData[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`, {
      observe: 'response'
    }).subscribe( (resdata: any) => {
      // conditions to Sign In
      if(resdata && resdata.body && resdata.body.length) {
        this.userAuthErrorMessage.emit(false);
        localStorage.setItem('userData', JSON.stringify(resdata.body));
        this.router.navigate(['/returns-orders']);
      }else {
        this.userAuthErrorMessage.emit(true);
      }
    }) 
  }

  // 
  userAuthReload() {
    if(localStorage.getItem('userData')) {
      // this.router.navigate(['/']);
    }
  }
}
