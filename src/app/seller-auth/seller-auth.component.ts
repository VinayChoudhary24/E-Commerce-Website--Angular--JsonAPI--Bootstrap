import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // This will Submit the Form
  onSubmit(form: NgForm ) {
    console.log(form);
    // if(!form.valid) {
    //   return;
    // }
    // const name = form.value.name;
    // const email = form.value.email;
    // const password = form.value.password;
    
  }
  
}
