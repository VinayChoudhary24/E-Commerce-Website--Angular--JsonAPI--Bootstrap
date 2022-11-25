import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SellerSignInResponseData, SellerSignIpRequestData, SellerSignUpRequestData } from '../data-type';

// This will be the Format of the Data for Response
// export interface SellerResponseData {
//   email: string;
//   id: number;
//   name: string;  
//   password: string;
// }


@Injectable({
  providedIn: 'root'
})

export class SellerService {

  // For SellerAuthGuard
  isSellerSignUp = new BehaviorSubject<boolean>(false);

  // To Show the Error Messages for Seller
  sellerError = new EventEmitter<boolean>(false);

  // it is Important to Create a INSTANCE/INJECT httpClient Here Before Using it
  constructor( private http: HttpClient,
              // To re-direct the user to the Seller-home page 
              private router: Router ) { }


  // For seller Sign-up Function
  sellerSignUp( data: SellerSignUpRequestData ) {
    // console.log("seller SignUp")

    // Use httpServices i.e POST request
    this.http.post('http://localhost:3000/seller', data, {
      observe: 'response'
    } )
    .subscribe( (resdata) => {
      // console.log({resdata});

      if(resdata) {
        this.isSellerSignUp.next(false);
        // This will store the Seller Data in LocalStorage
      localStorage.setItem('sellerData', JSON.stringify(resdata.body));
      this.router.navigate(['/seller-home']);
      }else {
        this.isSellerSignUp.next(true);
      }
    })
    // return false;
  }

  // For Seller Sign-In
  sellerSignIn( data: SellerSignIpRequestData ) {
    console.log("data");

    // Use HttpReuest and Pass Dynamic Parameters
    this.http.get<SellerSignInResponseData[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    } )
    .subscribe( (resdata: any) => {
      console.log(resdata);
      // Conditions to SignIn
      if(resdata && resdata.body && resdata.body.length) {
        // console.log("Seller Sign In");
        this.sellerError.emit(false);
        localStorage.setItem('sellerData', JSON.stringify(resdata.body))
        this.router.navigate(['/seller-home']);
      }else {
        // console.log("Sign In Fail")
        this.sellerError.emit(true);
      }
    })

  }



  // Calling the ngOnInit from the seller-auth.component
  // This will Make sure the User is SignIn After the Page is Refreshed
  reloadSeller() {
    if(localStorage.getItem('sellerData')) {
      this.isSellerSignUp.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

}
