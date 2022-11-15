import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerRequestData } from '../data-type';
import { SellerService } from '../seller-services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  // /Inject the SellerService Here to use all the Fuctions from the service
  constructor( private sellerService: SellerService,
              // Inject Router to re-direct user after SignUp  
              private router: Router) { }      

  // To make sure the Seller is Sign-In after Sign-Up and Refresh the Page
  ngOnInit(): void {
        this.sellerService.reloadSeller();
      }
  

  // This will Submit the Form
  onSubmit( data: SellerRequestData ) {
    // console.log(form);

    // Checking the Validation 
    // if(!form.valid) {
    //   return;
    // }
    // Store the data 
    // const name = form.value.name;
    // const email = form.value.email;
    // const password = form.value.password;

    // To store the SignUp Request
    // let sellerObs: Observable<SellerResponseData>;

    // Calling the HttpRequest Method from the SellerService
    this.sellerService.sellerSignUp(data);
    // Subscribe the Http Requets
    // .subscribe( (resdata) => {
    //   console.log(resdata);
    //   if(resdata) {
    //     this.router.navigate(['/seller-home']);
    //   }
    // });

    // Subscribe the SignUp POST Request
    // sellerObs.subscribe( (resdata) => {
    //   console.log(resdata);
    //   this.router.navigate([''])
    // })
    
  }
  
}  

