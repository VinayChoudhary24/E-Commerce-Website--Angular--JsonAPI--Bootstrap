import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

// This Array Contains all the Routes Required
const routes: Routes = [
  // this Routes to the Seller Component
  { path: 'seller-auth', component: SellerAuthComponent },

  // Load the SellerHome Component After the SignUp
  { path: 'seller-home', component: SellerHomeComponent,
  // Add AuthGuard so that the User Cannot re-direct to other pages after SignUp
  canActivate: [SellerAuthGuard]
  },

  // Load the Seller Add Products Section
  { path: 'seller-add-product', component: SellerAddProductComponent, 
 // Add AuthGuard so that the User Cannot re-direct to other pages after SignUp
  canActivate: [SellerAuthGuard] 
  },

  // Load the Seller Update Product Section
  // pass the /:id here to get the Open the Details of Specific Product when Clicked Edit/Update ICON
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent,
  // Add AuthGuard so that the User Cannot re-direct to other pages after SignUp
  canActivate: [SellerAuthGuard]
  },

  // Load the HomePage of the Application when Clicked The  Madani.in TEXT
  { path: 'app-home', component: HomeComponent }, 

  // Load Error Component
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
