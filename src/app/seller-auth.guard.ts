import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './seller-services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate {

  // Inject sellerServive to use the BehaviorSubject
  constructor( private sellerService: SellerService ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // To make sure user Remains Sign-In after a Re-fresh
      if(localStorage.getItem('sellerData')) {
        return true;
      }

    return this.sellerService.isSellerSignUp;
  }
  
}
