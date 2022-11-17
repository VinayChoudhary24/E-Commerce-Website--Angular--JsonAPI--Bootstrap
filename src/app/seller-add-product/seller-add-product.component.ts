import { Component, OnInit } from '@angular/core';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  // To show the Seller Successful product Added Message
  productAddedMessage = '';

  // Inject product.service to get the sellerAddNewProduct Request
  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
  }

  // This will Add the Product from the Form
  onAddProduct( data: sellerAddNewProductData ) {
    // console.log(data);

    // Get the Product service Here
    this.productService.sellerAddNewProduct(data).subscribe( (resdata) => {
      console.log(resdata);

      // The Condition to check that the response data is Present
      if(resdata) {
        this.productAddedMessage = "Product Added Successfully!!"
      }
      // This will remove theMessage after three Seconds
      setTimeout( () => {
        this.productAddedMessage = '';
      }, 3000)
    })
  } 

}
