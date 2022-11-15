import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SellerRequestData } from '../data-type';

// This will be the Format of the Data for Response
export interface SellerResponseData {
  email: string;
  id: number;
  name: string;  
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class SellerService {

  // For SellerAuthGuard
  isSellerSignUp = new BehaviorSubject<boolean>(false);

  // it is Important to Create a INSTANCE/INJECT httpClient Here Before Using it
  constructor( private http: HttpClient,
              // To re-direct the user to the Seller-home page 
              private router: Router ) { }


  // For seller Signn-up Function
  sellerSignUp( data: SellerRequestData ) {
    // console.log("seller SignUp")

    // Use httpServices i.e POST request
    this.http.post<SellerResponseData>('http://localhost:3000/seller', data, {
      observe: 'response'
    } )
    .subscribe( (resdata) => {
      this.isSellerSignUp.next(true);
      
      // This will store the Seller Data in LocalStorage
      localStorage.setItem('sellerData', JSON.stringify(resdata.body));

      this.router.navigate(['/seller-home']);
      // console.log({resdata})
    })
    // return false;
  }

  // Calling the ngOnInit from the app.component
  reloadSeller() {
    
  }

}
