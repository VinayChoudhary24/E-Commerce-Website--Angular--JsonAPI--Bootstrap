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

  // Method to get the Product Details from API
  getProductDeatils( id: string ) {
    return this.http.get<sellerAddNewProductData>(`http://localhost:3000/products/${id}`)
  }

  // Method to Update the Product Details After SAVE CHANGES CLICKED
  updateProductDetails( updatedProduct: sellerAddNewProductData ) {
    return this.http.put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct)
  }

  // This API will Call the Products that we want to Display in the carousel i.e app-home
  // ?_limit = , this is the number of products we want to Get/Display in the Carousel
  carouselProducts() {
    return this.http.get<sellerAddNewProductData[]>('http://localhost:3000/products?_limit=2')
  }
}
