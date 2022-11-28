import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // to remove the item from cart
  cartData: sellerAddNewProductData | undefined;

  // To remove the item from Cart
  removeCartItem = false;

  // To store the Quantity Change
  productQuantityChange: number = 1;

  // To store the productIdDetails for HTML
  // We dont use Array Here because it's a Single Product
  productIdData: undefined | sellerAddNewProductData;

  // Inject ActivatedRoute to get the QueryParams When Clicked on Image and Name of the Searched Product
  constructor( private activatedRoute: ActivatedRoute,
            //   //  Inject productService to get the API getProductDetails
              private productService: ProductService ) {}

  ngOnInit(): void {
    // Get the Searched productId From URl
    let productIdDetails = this.activatedRoute.snapshot.paramMap.get('productId');
    // console.log({productIdDetails});

    // Re-use API from productService i.e getProductDeatils
    productIdDetails && this.productService.getProductDeatils(productIdDetails).subscribe( (resdata) => {
      console.log({resdata});
      this.productIdData = resdata;

      // Check the Cart Details in Local Storage
      let cartData = localStorage.getItem('cart');
      if(productIdDetails && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: sellerAddNewProductData) => {
          productIdDetails == item.id.toString()
        })
        if(items.length) {
          this.removeCartItem = true;
        }else {
          this.removeCartItem = true;
        }
      }
      let userData = localStorage.getItem('userData');
      if(userData) {
        let userId = userData && JSON.parse(userData).id;
        this.productService.updateCartList(userId);
        this.productService.cartData.subscribe( (resdata) => {
        let item = resdata.filter( (item: sellerAddNewProductData) => {
            productIdDetails?.toString() === item.productId?.toString()
          })
          if(item.length) {
            this.cartData = item[0];
            this.removeCartItem = true;
          }
        })
      }
    })
  }

  // This function will Change the quantity of product when clicked on Minus and Plus Buttons
  onQuantityChange(val: string) {
    if(this.productQuantityChange < 20 && val === 'max') {
      // This is Increment
      this.productQuantityChange += 1;
    } else if(this.productQuantityChange > 1 && val === 'min') {
      // This is Decrement
      this.productQuantityChange -= 1;
    }
  }

  // This will Add to Cart
  addToBasket() {
    if(this.productIdData) {
      this.productIdData.quantity = this.productQuantityChange;
      // console.log(this.productIdData);
      // Condition for the user not Signed In
      if(!localStorage.getItem('userData')) {
        // Call the Function from product Service i.e addProductToBasket
        this.productService.addProductToBasket(this.productIdData);
        this.removeCartItem = true;
      }else {
        // The User is Signed In
        // console.log("user signed in");

        // If the User is Signed In We have to Get the Id of the User from localStorage
        let userData = localStorage.getItem('userData');
        let userId = userData && JSON.parse(userData).id
        // console.log({userId});
        let cartData: cart = {
          ...this.productIdData,
          userId,
          productId: this.productIdData.id
        }
        delete cartData.id
        // console.log({cartData});

        // Calling the Service Function addToCartDatabase
        this.productService.addToCartDatabase(cartData).subscribe( (resdata) => {
          // console.log({resdata});
          if(resdata) {
            // This will update the cart Value in Header
            // console.log(resdata, "Product added to Cart and database");
            this.productService.updateCartList(userId);
            this.removeCartItem = true;
          }
        })
      }
    }
  }

  // This will remove from Cart
  removeItem(productId: number) {
    if(!localStorage.getItem('userData')) {
    // call the Function from Product Service i.e removeProductFromCart
    this.productService.removeProductFromCart(productId);
    }else {
      // If the User is Signed In We have to Get the Id of the User from localStorage
      let userData = localStorage.getItem('userData');
      let userId = userData && JSON.parse(userData).id
      // Call API removeToCart from productService
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe( (resdata) => {
        if(resdata) {
          this.productService.updateCartList(userId);
        }
      })
      this.removeCartItem = false;
    }
  }

}
