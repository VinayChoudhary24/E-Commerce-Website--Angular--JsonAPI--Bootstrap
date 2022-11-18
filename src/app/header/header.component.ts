import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import the cart Shopping Icon
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


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

  // Inject Router to Change the NAVBAR/HEADER for the Seller i.e Cart, Hello Guest ...
  constructor( private router: Router ) { }

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

}
