import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {
  public userInfo: any;
  constructor(  private userService: UserService, private router: Router ) {}

  GuardLogin(url): boolean {
    // const loginStatus = sessionStorage.getItem('status');
    if (sessionStorage.user === 'true') {
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
    // return this.GuardLogin(url);
    return true;
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.GuardLogin(url);
  }

}
