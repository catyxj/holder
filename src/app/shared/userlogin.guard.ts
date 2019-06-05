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
    if (localStorage.status === 'true') {
      return true;
    } else {
      // this.userService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;

    if (environment.production) {
      return this.GuardLogin(url);
    } else {
      return true;
    }

  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.GuardLogin(url);
  }

}
