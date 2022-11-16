import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

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

  // Load Error Component
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
