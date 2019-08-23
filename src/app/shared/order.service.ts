import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";
import {Observable, throwError} from "rxjs/index";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private dataListUrl = '/api/admin/order/list';  // 订单列表
  private dataBasicUrl = '/api/admin/order/detail';
  private commentUrl = '/api/admin/dialogue/comment/list';


  // private dataListUrl = 'assets/server/terminal_list.json';

  constructor(private http: HttpClient) { }

  // 获取列表
  getLists(n: number, pageSize: number, search?: string, value?: string, type?: string,): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&type=${type}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取基本信息
  getBasic(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataBasicUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取产品信息
  getProducts(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.commentUrl}?uid=${uid}`;
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
