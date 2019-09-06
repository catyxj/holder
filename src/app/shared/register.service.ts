import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError, tap} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // 登录
  login(user): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    // return this.http.post< any >('/user_login/', user, httpOptions)
    return this.http.post< any >('/api/login', user, httpOptions)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap((val) => {
          localStorage.setItem('status', 'true');
        }),
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取验证码
  getCode(data): Observable< any > {
    return this.http.post< any >('/api/verification_code_get', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取手机验证码
  getPhCode(data): Observable< any > {
    return this.http.post< any >('/api/login/send_sms_code', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 注册
  signUp(data): Observable<any> {
    return this.http.post< any >('/api/login/register', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 重置密码
  recoverPass(data): Observable<any> {
    return this.http.post< any >('/api/login/password_recover', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
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
