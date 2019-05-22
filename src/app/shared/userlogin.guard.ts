import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {UserService} from './user.service';
import { environment } from './../../environments/environment';

import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild,
  Route
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {
  public userInfo: any;
  constructor(  private userService: UserService, private router: Router ) {}

  GuardLogin(url): boolean {
    // sessionStorage.user === 'true'
    // console.log('status true');
    if (localStorage.status === 'true') {
      return true;
    } else {
      // this.userService.redirectUrl = url;
      // console.log('status false');
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    /*if (environment.production) {

    } else {
      return true;
    }*/
    return this.GuardLogin(url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.GuardLogin(url);
  }

}
