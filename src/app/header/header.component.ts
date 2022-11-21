import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import the cart Shopping Icon
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // The Cart Icon
  cartIcon = faCartShopping;

  // To Check the Type of theseller
  sellerType: string = "default";

  // To get the Seller Name
  sellerName: string = '';

  // To Display the Searched product
  searchResult: undefined | sellerAddNewProductData[];

  // Inject Router to Change the NAVBAR/HEADER for the Seller i.e Cart, Hello Guest ...
  constructor( private router: Router,
            //  Inject product Service to Call getSearchedProducts
              private productService: ProductService ) { }

  ngOnInit(): void {

    this.router.events.subscribe( (value: any) => {
      console.log(value.url);
      // this will change the Header for Sign In Seller
      if(value.url) {
        if(localStorage.getItem('sellerData') && value.url.includes('seller')) {
          console.log("in seller home")
          this.sellerType = "seller";

          // To Display the Name of the User
          if(localStorage.getItem('sellerData')) {
            let sellerNameStore = localStorage.getItem('sellerData');
            let sellerStoredData = sellerNameStore && JSON.parse(sellerNameStore)[0];
            this.sellerName = sellerStoredData.name;
          }
        }else {
          console.log("outside Seller Area")
          this.sellerType = "default"
        }
      }
    })
  }

  // This will Signout the Seller
  sellerSignOut() {
    localStorage.removeItem('sellerData');
    this.router.navigate(['/']);
  }

  // Call the searchedProduct Event on the Search Input Field
  // Inside this Event We Call the ProductService getSearchedProducts API
  searchedProduct(search: KeyboardEvent) {
    if(search) {
      const element = search.target as HTMLInputElement;
      console.log(element.value);

      // We will pass the element.value to the API
      this.productService.getSearchedProducts(element.value).subscribe( (resdata) => {
        console.log({resdata});

        // Limit the Searched Products SHOW Length i.e Only Five Products will be Shown when Searched Something
        if(resdata.length > 5) {
          resdata.length = 5;
        }

        // Push the Searched Product in searchedResult
        this.searchResult = resdata;
      })
    }
  }

  // This will hide the Searched products UL div by Click
  hideSearch() {
    this.searchResult = undefined;
  }

  // When Clicked on Search Button
  onSearch(val: string) {
    console.log({val});

    // Route the Searched Product to searchComponent from Here
    this.router.navigate([`/search${val}`]);
  }

}
