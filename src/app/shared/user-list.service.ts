import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";
import {Observable, throwError} from "rxjs/index";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private dataListUrl = '/api/formal/user/list';
  private dataBasicUrl = '/api/formal/user/detail';
  private dataEptListUrl = '/api/formal/user/ept/list';

  // private dataListUrl = 'assets/server/user_list.json';

  constructor(private http: HttpClient) { }

  // 获取用户列表
  getLists(n: number, pageSize: number, search?: string, value?: string, tag?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&tag=${tag}`;
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


  // 获取用户设备列表
  getEptLists(uid: string, n: number, pageSize: number, search?: string, value?: string, online?: string, run?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataEptListUrl}?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}&online=${online}&run=${run}&status=${status}`;
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
      localStorage.removeItem('authToken');
      window.location.reload();
    }
    return throwError(
      error.error);
  }


}
