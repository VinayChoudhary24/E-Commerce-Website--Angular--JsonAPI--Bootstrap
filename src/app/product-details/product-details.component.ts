import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

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
    console.log({productIdDetails});

    // Re-use API from productService i.e getProductDeatils
    productIdDetails && this.productService.getProductDeatils(productIdDetails).subscribe( (resdata) => {
      console.log({resdata});
      this.productIdData = resdata;
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

}
