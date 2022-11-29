import { Component, OnInit } from '@angular/core';
import { orderData } from '../data-type';
import { ProductService } from '../seller-services/product.service';

@Component({
  selector: 'app-user-returns-and-orders',
  templateUrl: './user-returns-and-orders.component.html',
  styleUrls: ['./user-returns-and-orders.component.css']
})
export class UserReturnsAndOrdersComponent implements OnInit {

  // To Store the Orders Data
  orderData: undefined | orderData[];

  // Inject Productservice to Call API ordersListData
  constructor( private productService: ProductService ) {}

  ngOnInit(): void {
    this.productService.ordersListData().subscribe( (resdata) => {
      console.log({resdata}, "OrdersListData API Called...");

      this.orderData = resdata;
    })
  }

}
