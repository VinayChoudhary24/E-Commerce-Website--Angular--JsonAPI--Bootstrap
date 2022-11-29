import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // to Store the Final Cart Data
  cartData: cart[] | undefined;

  // The Summary data Type
  priceSummary: priceSummary = {
  price: 0,
  discount: 0,
  tax: 0,
  delivery: 0,
  total: 0,
  } 

  // Inject productService to Call currentCart for getting products in the Cart Page
  constructor( private productService: ProductService,
              //  Inject Router to Re-direct to Checkout Page
              private router: Router ) {}

  ngOnInit(): void {
     // calling the Service API
     this.productService.currentCart().subscribe( (resdata) => {
      // console.log(resdata, "product added in Cart Page");
      this.cartData = resdata;
      let price = 0;
      resdata.forEach( (item) => {
        // To get the Correct price for number of Quantity
        if(item.quantity) {
        price = price + (parseInt(item.productPrice) * item.quantity);
        }
      })
      // console.log({price}, "the Total Amount of Products inside the Basket")
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price/10) + 100 - (price/10);
      console.log(this.priceSummary);
     })
  }

  // This will Re-direct the to Checkout Page
  onCheckout() {
    this.router.navigate(['/app-checkout']);
  }

}
