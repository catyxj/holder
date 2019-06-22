import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

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

  // 获取验证码
  getCode(data): Observable< any > {
    return this.http.post< any >('/verification_code_get', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 注册
  signUp(data): Observable<any> {
    return this.http.post< any >('/user_register', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 重置密码
  recoverPass(data): Observable<any> {
    return this.http.post< any >('/user_recover_password', data, httpOptions)
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
