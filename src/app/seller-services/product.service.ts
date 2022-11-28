import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, sellerAddNewProductData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // To get the Cart Details
  cartData = new EventEmitter<sellerAddNewProductData[] | []>();

  // Inject HttpClient to Use the POST Request
  constructor( private http: HttpClient ) { }

  // SellerAddProduct Request to Post the data in product API
  sellerAddNewProduct( data: sellerAddNewProductData ){
    return this.http.post('http://localhost:3000/products', data);
  }
  // #FIREBASE
  // sellerAddNewProduct( data: sellerAddNewProductData ){
  //   return this.http.post('https://e-commerce-project-angular-default-rtdb.firebaseio.com/products', data);
  // }

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
    return this.http.get<sellerAddNewProductData[]>('http://localhost:3000/products?_limit=5')
  }

  // This API will call all the Products from Products List to the HomePage i.e Top Selling Products
  getTopSellingProducts() {
    return this.http.get<sellerAddNewProductData[]>('http://localhost:3000/products?_limit=10')
  }

  // This API will call the products when Searched from the SEARCH AREA
  getSearchedProducts(query: string) {
    return this.http.get<sellerAddNewProductData[]>(`http://localhost:3000/products?q=${query}`)
  }

  // This will Add the product to Basket
  addProductToBasket(data: sellerAddNewProductData) {
    let cartData = [];

    // Check if the Cart is Empty or Not
    let cart = localStorage.getItem('cart');
    if(!cart) {
      localStorage.setItem('cart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }else {
      cartData = JSON.parse(cart);
      cartData.push(data);
      localStorage.setItem('cart', JSON.stringify([cartData]));
    }
    this.cartData.emit(cartData);
  }
  
  // this will remove product/item from cart
  removeProductFromCart(productId: number) {
    let cartData = localStorage.getItem('cart');
    if(cartData) {
      let items:sellerAddNewProductData[] = JSON.parse(cartData);
      items= items.filter( (item: sellerAddNewProductData) => {
        productId !== item.id
      })
      // console.log(items);
      localStorage.setItem('cart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  // This API will add product to database
  addToCartDatabase(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  
  // To Update the Cart Value in the Header
  updateCartList(userId: number) {
    return this.http.get<sellerAddNewProductData[]>(`http://localhost:3000/cart?userId=` + userId, {
      observe: 'response'
    }).subscribe( (resdata) => {
      if(resdata && resdata.body) {
        this.cartData.emit(resdata.body);
      }
    })
  }

  // Remove item from CartList
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart' + cartId)
  }

  // This service is for the Cart Page i.e to get the Products on the Cart page
  currentCart() {
    let userData = localStorage.getItem('userData');
    let userStoredData = userData && JSON.parse(userData);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userStoredData.id)
  }

}
