import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  // To show the Updated Successfully Message
  productUpdatedMessage = '';

  // This will PreFill the Form when clicked Edit Icon
  productData: undefined | sellerAddNewProductData;

  // Inject ActivatedRoute to get the Details of the product by ID
  constructor( private route: ActivatedRoute,
            
    //  inject ProductService to Sue the getProductDeatils Method
              private productService: ProductService,
              
    // Inject Router to redirect the Usser after Save Changes
              private router: Router ) { }

  ngOnInit(): void {
    // To Store and get the Information by ID
    let productId = this.route.snapshot.paramMap.get('id');
    console.log({productId});

    // Call the getProductDeatils Method
    // This will Check the Type
    productId && this.productService.getProductDeatils(productId).subscribe( (resdata) => {
      console.log({resdata});

      // Prefill the Data
      this.productData = resdata;
    })
  }

  // This function will update the Product
  onSaveChanges( data: sellerAddNewProductData ) {
    console.log(data);

    // to Push the id to the Request
    if(this.productData) {
      data.id = this.productData.id;
    }

    // Passing the Data to API
    this.productService.updateProductDetails(data).subscribe( (resdata) => {
      console.log({resdata});
      if(resdata) {
        this.productUpdatedMessage = "Product updated successfully!!"
      }
    });
    setTimeout( () => {
      this.productUpdatedMessage = '';
      // This will Re-direct to the List Page
      this.router.navigate(['/seller-home']);
    }, 1500)

  }

}
