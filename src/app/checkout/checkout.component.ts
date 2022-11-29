import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, orderData, orderNowRequestData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  // order Placed Message
  orderSuccessMessage: string = '';

  // To Store the Total Amount of Products
  totalPrice: number | undefined;

  // To Empty the Cart After order Placed
  cartData: cart[] | undefined;

  // /Inject productService to call API
  constructor( private productService: ProductService,
              // Inject Router to Re-direct User After Order Now Clicked 
              private router: Router ) {}

  // Call the Api of ProductSummary
  ngOnInit(): void {
    // calling the Service API
    this.productService.currentCart().subscribe( (resdata) => {
     // console.log(resdata, "product added in Cart Page");
     let price = 0;

    //  To Empty the Cart After Order Placed
    this.cartData = resdata;

     resdata.forEach( (item) => {
       // To get the Correct price for number of Quantity
       if(item.quantity) {
       price = price + (parseInt(item.productPrice) * + item.quantity);
       }
     })
     this.totalPrice = price + (price/10) + 100 - (price/10);
     console.log(this.totalPrice, "Total price from the Checkout Section");
    })
 }

  // When the User will go to the Payments Section
  onOrderNow(data: orderNowRequestData) {
    // console.log({data}, "Order Now Details");
    
    // Get the UserId
    let userData = localStorage.getItem('userData');
    let userId = userData && JSON.parse(userData).id;
    if(this.totalPrice) {
      let orderDetails: orderData  = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      }
      // This will EMPTY The CART after Order Placed
      // Call the API clearCartData
      this.cartData?.forEach( (item) => {
        setTimeout( () => {
          if(item.id) {
            this.productService.clearCartData(item.id)
          }
        }, 1000)
      })

       // Call the Service API orderNowData
    this.productService.orderNowData(orderDetails).subscribe( (resdata) => {
      if(resdata) {
        // console.log({resdata}, "orderNowData API Called.. ORDER PLACED!!")
        // alert('Order Placed!!!');
        // Show the Order Placed Message
        this.orderSuccessMessage = "Your order has been placed."
        // Re-direct to Returns&Orders
        setTimeout( () => {
          this.router.navigate(['/returns-orders']);
          this.orderSuccessMessage = '';
        }, 4500)
      }
    })
    }
  }

}
