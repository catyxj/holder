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

  // --------费用账单 ----------
  // 获取账单总览列表
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


  // 获取账单明细列表
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


  // ---------我的订单-----------
  // 获取订单列表
  getOrderLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // let roleId = localStorage.getItem('roleId');
    let url = `/api/formal/charge/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;


    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // ---------续费管理-----------


  // ----------发票管理-----------



  addAddress(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // let roleId = localStorage.getItem('roleId');
    let url = `/api/formal/charge/address`;

    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ---------------订购服务------------------

  // 产品订购列表
  getProductList(): Observable<any>  {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let url = `/api/formal/product/list`;

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 订购产品信息列表
  getProductInfo(): Observable<any>  {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let url = `/api/formal/product/list`;

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
