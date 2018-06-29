import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {
  constructor( private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let userlogin: boolean;
    /*if (!sessionStorage.user) {
      console.log('canactivate' );
      this.router.navigate(['/login']);
      userlogin = false;
    } else {
      userlogin = true;
    }*/
    return true;
  }
}
