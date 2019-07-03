import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

const token = localStorage.getItem('authToken');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': token
  })
};


@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  constructor(private http: HttpClient) { }

  // 获取验证码id
  getCodeId(): Observable< any > {
    return this.http.get< any >('/login/captchaid')
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取验证码图片
  getCode(id) {
    return this.http.get< any >(`/login/captcha?id=${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 发送验证码
  sendCode(data): Observable<any> {
    return this.http.post('/captcha_checkout', data, httpOptions)
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
