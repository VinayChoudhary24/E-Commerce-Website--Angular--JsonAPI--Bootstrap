import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserReturnsAndOrdersComponent } from './user-returns-and-orders/user-returns-and-orders.component';

// This Array Contains all the Routes Required
const routes: Routes = [

  // Load the HomePage of the Application when Clicked The  Madani.in TEXT
  { path: '', component: HomeComponent,
  // Add AuthGuard so that the User Cannot re-direct to other pages after SignUp 
  // canActivate: [SellerAuthGuard] 
},

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
  
  // Load the SearchPage whe nClicked on Search Button
  { path: 'search/:query', component: SearchComponent,
  // Add AuthGuard so that the User Cannot re-direct to other pages after SignUp 
  // canActivate: [SellerAuthGuard] 
},

// Load the ProductDetails when Clicked on View Details
{ path: 'details/:productId', component: ProductDetailsComponent, 
// Add AuthGuard so that the User Cannot re-direct to other pages after SignUp 
// canActivate: [SellerAuthGuard]
},

// Load the user SignUp/SignIn Page when clicked on Hello guest 
{ path: 'user-auth', component: UserAuthComponent, 
// Add AuthGuard so that the User Cannot re-direct to other pages after SignUp 
// canActivate: [SellerAuthGuard]
},

// Loads Orders Section of User
{ path: 'returns-orders', component: UserReturnsAndOrdersComponent, 
// Add AuthGuard so that the User Cannot re-direct to other pages after SignUp 
// canActivate: [SellerAuthGuard]
},

// Loads Users Cart Page
{ path: 'app-cart', component: CartPageComponent }, 

  // Load Error Component
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
