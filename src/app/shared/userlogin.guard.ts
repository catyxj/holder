import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {
  public userInfo: any;
  constructor(  private user: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let userlogin: boolean;
    /*this.user.getUser().
      subscribe(user => {
        this.userInfo = user;
        if (!this.userInfo) {
          userlogin = false;
        } else {
          userlogin = true;
        }
      // return userlogin;
      });*/
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
