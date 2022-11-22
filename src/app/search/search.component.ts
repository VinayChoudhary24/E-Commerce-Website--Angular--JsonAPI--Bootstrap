import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sellerAddNewProductData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // To store the Result
  searchResult: undefined | sellerAddNewProductData[];

  // Inject ActivatedRoute to get the QueryParams When Searched a product
  constructor( private activatedRoute: ActivatedRoute,
            //  Inject productService to get the API getSearchedProducts
                private productService: ProductService ) {}

  ngOnInit(): void {
    // Get the Searched Query From URl
    let searchedQuery = this.activatedRoute.snapshot.paramMap.get('query');
    console.log({searchedQuery});

    // Re-use API from ProductService i.e getSearchedProducts
    searchedQuery && this.productService.getSearchedProducts(searchedQuery).subscribe( (resdata) => {
      this.searchResult = resdata;
    })
  }

}
