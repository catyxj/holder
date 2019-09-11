import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  constructor(private http: HttpClient) { }

  // 获取总览列表
  getGeneralLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // let roleId = localStorage.getItem('roleId');
    let url = `/api/formal/charge/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;


    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取明细列表
  getDetailLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // let roleId = localStorage.getItem('roleId');
    let url = `/api/formal/charge/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;


    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `错误代码 ${error.status}, ` +
        `错误内容: ${error.error}`);
    }
    if (error.status === 550) {
      window.location.reload();
    }
    return throwError(
      error.error);
  }


}
