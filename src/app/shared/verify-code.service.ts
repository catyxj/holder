import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};


@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  constructor(private http: HttpClient) { }

  // 获取验证码图片
  getCode(): Observable< any > {
    return this.http.get< any >('/captcha_get')
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
