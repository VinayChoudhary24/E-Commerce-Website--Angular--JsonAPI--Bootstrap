import { Component, OnInit } from '@angular/core';
import { cart } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  // 
  cartData: cart[] | undefined;

  // Inject productService to Call currentCart for getting products in the Cart Page
  constructor( private productService: ProductService ) {}

  ngOnInit(): void {
     // calling the Service API
     this.productService.currentCart().subscribe( (resdata) => {
      // console.log(resdata, "product added in Cart Page");
      this.cartData = resdata;
     })
  }


}
