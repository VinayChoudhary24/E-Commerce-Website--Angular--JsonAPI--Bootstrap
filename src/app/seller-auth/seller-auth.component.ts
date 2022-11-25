import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerSignIpRequestData, SellerSignUpRequestData } from '../data-type';
import { SellerService } from '../seller-services/seller.service';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  // Forgotten password Icon
  forgotPasswordIconSeller = faArrowUpRightFromSquare;

  // Switch from SignUp to SignIn
  switchMode = false;

  // To show the Error Message to the User
  sellerErrorMessage: string = '';

  // /Inject the SellerService Here to use all the Fuctions from the service
  constructor( private sellerService: SellerService,
              // Inject Router to re-direct user after SignUp  
              private router: Router) { }      

  // To make sure the Seller is Sign-In after Sign-Up and Refresh the Page
  ngOnInit(): void {
        this.sellerService.reloadSeller();
      }
  

  // This will Submit the Form when Clicked Sign-Up
  onSellerSignUp( data: SellerSignUpRequestData ) {
    // console.log(data);

    // Calling the HttpRequest Method from the SellerService i.e sellerSignUp
    this.sellerService.sellerSignUp(data);
    this.sellerService.sellerError.subscribe( (error) => {
      if(error) {
        this.sellerErrorMessage = "Enter valid email or password"
      }
    })
  }

  // This will Redirect from SignUp to SignIn Page
  redirectToSignIn() {
    this.switchMode = false;
  }

  // This will Redirect from SignIn to SignUp
  redirectToSignUp() {
    this.switchMode = true;
  }

  // This will submit the Form when Clicked SignIn
  onSellerSignIn( data: SellerSignIpRequestData ) {
    // console.log(data);
    this.sellerErrorMessage = "";

    // Calling the HttpRequest Method from the SellerService
    this.sellerService.sellerSignIn(data);
    this.sellerService.sellerError.subscribe( (error) => {
      if(error) {
        this.sellerErrorMessage = "Enter valid email or password"
      }
    })

  }
  
}  

