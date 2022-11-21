import { Component, OnInit } from '@angular/core';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // These are the Images for BootStrap Carousel
  carouselImages: undefined | sellerAddNewProductData[];

  // Top Selling Products
  topSellingproducts: undefined | sellerAddNewProductData[];

  // Inject productService to Call the carouselProducts method
  constructor( private productService: ProductService ) {}

  ngOnInit(): void {
    // Carousel should load at the Time of Page Initialisation
    this.productService.carouselProducts().subscribe( (resdata) => {
      // console.log({resdata});
      this.carouselImages = resdata;
    });
    // Below the Carousel, This will Get the Products from ProductList
    this.productService.getTopSellingProducts().subscribe( (resdata) => {
      // console.log({resdata});
      this.topSellingproducts = resdata;
    });
  }

}
