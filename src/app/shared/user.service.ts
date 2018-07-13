import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/internal/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: any = false;
  public userInfo;
  public redirectUrl: string;

  constructor(private http: HttpClient) { }

  // 登录
  login(user): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    return this.http.post< any >('/user_login/', user, httpOptions)
      // .subscribe(cuser => { this.userInfo = cuser; })
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap((val) => {
          this.isLoggedIn = 'true';
          sessionStorage.setItem('status', this.isLoggedIn);
        }),
        catchError(this.handleError) // then handle the error
      );
  }

  // 退出登录
  logout(uid): Observable< any > {
    // this.isLoggedIn = false;
    return this.http.post<any> ('/user_logout/', uid, httpOptions)
      .pipe(
        tap( (val) => {
          this.isLoggedIn = 'false';
          sessionStorage.setItem('status', 'false');
        })
      );
  }


  // 获取用户信息
  getUser(): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get< any >('assets/server/user.json');
    // return this.http.get< any >('/user')  // assets/server/user.json
    //   .pipe(
    //     tap((val) => {
    //       if (!val) {
    //         this.isLoggedIn = 'false';
    //         sessionStorage.setItem('user', 'false');
    //       }
    //     }),
    //     catchError(this.handleError) // then handle the error
    //   );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      error.error);
  }

}
