import { Component, OnInit } from '@angular/core';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  // To Display the ProductsList on the Page
  productsList: undefined | sellerAddNewProductData[];

  // To display the Product deleted Message
  productDeleted = '';

  // Inject productService to use the Methods and Display
  constructor( private productService: ProductService ) { }

  // This will call the ProductService Method sellerFetchProductList
  // to show the products list on Initialisation of the Home Page
  ngOnInit(): void {
    this.productListRefresh();
  }

  // fuction to Delete a Product From List
  productDelete( id: number ) {
    console.log("id:", id);

    // This will call the sellerDeleteProduct method from the ProductService
    this.productService.sellerDeleteProduct(id).subscribe( (resdata) => {
      console.log(resdata);
      if(resdata) {
        this.productDeleted = "The Product was Deleted!";
      }  
    })
    setTimeout( () => {
      this.productDeleted = '';
      
      // this will Refresh the Page After 2 Seconds
      this.productListRefresh();
    }, 2000);
  }

  productListRefresh() {
    this.productService.sellerFetchProductList().subscribe( (resdata) => {
      console.log(resdata);

      // This will put the Fetch data in this property
      this.productsList = resdata;
    });
  }

}
