import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';

// This Array Contains all the Routes Required
const routes: Routes = [
  // this Routes to the Seller Component
  { path: 'seller-auth', component: SellerAuthComponent },

  // Load Error Component
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
