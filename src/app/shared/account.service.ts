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
export class AccountService {

  // 管理员
  private accountListUrl = '/api/admin/user_list';
  private accountBasicUrl = '/api/admin/user_basic_info';
  private accountConfigUrl = '/api/admin/user_config_info';
  private accountOperateUrl = '/api/admin/user_operate_info';
  private accountOperateMoreUrl = '/api/admin/user_operate_more';



  // private token = 'authtoken';
  // private accountListUrl = 'assets/server/user_list.json';


  constructor(private http: HttpClient) { }


  /*----管理员---------------------------------------------------------------*/

  // 获取账号列表
  getLists(n: number, pageSize: number, search?: string, value?: string, type?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.accountListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&type=${type}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 账号禁用激活
  disableAccount(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/user_batch_status', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取基本信息
  getBasic(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.accountBasicUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取配置信息
  getConfig(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.accountConfigUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息
  getOperate(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.accountOperateUrl}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息列表
  getOperateMore(uid, n, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.accountOperateMoreUrl}?uid=${uid}&page=${n}&rows=${pageSize}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改配置信息
  updateConfig(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/user_config_update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

// 进入
  entry(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/admin/forced_entry?uid=${uid}`;
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*-------维保-------------------------------------------------*/
  getInfo() {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = '/account';
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  setInfo(data) {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post<any>('/account/set', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /*--------正式用户--------------------------------------------------*/
  // 修改配置信息
  updateConfigF(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/user/info/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  changePassF(data) {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/user/password/update', data, httpOptions)
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
    if (error.status === 550) {
      window.location.reload();
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }


}
