import { Component, OnInit } from '@angular/core';
import { cart, sellerAddNewProductData, UserSignInRequestData, UserSignUpRequestData } from '../data-type';
import { UserService } from '../user-services/user.service';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  // To Display the Error Message
  userErrorMessage: string = '';

  // Forgotten Password Icon
  forgotPasswordIcon = faArrowUpRightFromSquare;

  // To switch user between SignUp and Sign In
  switchMode = true;

  // Inject userService to use the service Functionality and Methods for API
  constructor( private userService: UserService,
            //  Inject productService to call addToCartDatabase
              private productService: ProductService ) {}

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  // The Function for User to Sign Up
  onUserSignUp(data: UserSignUpRequestData) {
    // console.log({data});

    // call the Service userSignUp from userService
    this.userService.userSignUp(data);
    this.userService.userAuthErrorMessage.subscribe( (error) => {
      // console.log({error});
      if(error) {
        this.userErrorMessage = "Enter valid details"
      }else {
        this.cartToDatabase();
      }
    })

    // To check for Error
    // this.userErrorMessage = "Enter valid email or password."
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
    // Checking for Error i.e Wrong Credentials
    this.userService.userAuthErrorMessage.subscribe( (error) => {
      console.log({error});
      if(error) {
        this.userErrorMessage = "Enter valid email or password"
      }else {
        this.cartToDatabase();
      }
    })
  }

  // This Function will add Products from cart[NOT Signed In] to Database[Signed In]
  cartToDatabase() {
    // get userData and cart from LocalStorage
    let data = localStorage.getItem('cart');
    if(data) {
      let cartDataList: sellerAddNewProductData[] = JSON.parse(data);
      let user = localStorage.getItem('userData');
      let userId = user && JSON.parse(user).id;

      // apply Loop on the List
      cartDataList.forEach( (product: sellerAddNewProductData, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout( () => {
          // call addToCartDatabase from productService
        this.productService.addToCartDatabase(cartData).subscribe( (resdata) => {
          if(resdata) {
            console.log({resdata});
          }
        })
        // To Empty the LocalStorage
        if(cartDataList.length === index + 1) {
          localStorage.removeItem('cart');
        }
        }, 500)
      })
    }
  }

}
