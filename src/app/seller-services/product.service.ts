import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sellerAddNewProductData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Inject HttpClient to Use the POST Request
  constructor( private http: HttpClient ) { }

  // SellerAddProduct Request to Post the data in product API
  sellerAddNewProduct( data: sellerAddNewProductData ){
    return this.http.post('http://localhost:3000/products', data);
  }

  // SellerFetchProduct request to get the product data from the API
  sellerFetchProductList(  ) {
    return this.http.get<sellerAddNewProductData[]>('http://localhost:3000/products')
  }

  // Delete the Product from the Database API
  sellerDeleteProduct( id: number ) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

}
