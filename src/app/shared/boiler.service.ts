import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BoilerService {

  // private eptUrl = 'assets/server/boiler_list.json';
  // private templatesUrl = 'assets/server/boiler_template_list.json';
  // private eptInfo = 'assets/server/boiler.json';
  // private templateListUrl = 'assets/server/boiler_template_list.json';

  private eptUrl = '/api/formal/equipment/list'; // 列表模式
  private eptInfo = '/api/formal/ept/info/detail';  // 设备详情-设备信息
  private eptTermInfo = '/api/formal/ept/terminal/info/detail';  // 设备详情-终端信息




  constructor(private http: HttpClient, private router: Router) { }


  // 获取列表模式列表
  getLists(n: number, pageSize: number, search?: string, value?: string, online?: string, run?: string, status?: string  ): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.eptUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&online=${online}&run_status=${run}&status=${status}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取详情页设备信息
  getInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.eptInfo}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取详情页终端信息
  getTermInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.eptTermInfo}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 删除设备
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/batch/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 禁用/激活设备
  disableData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/batch/update/status', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新地址信息
  updateAddress(data: any): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/address/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新基本信息
  updateBasic(data: any): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/info/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // -------------地图模式------------
  // 获取地图坐标
  getMapDetail(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/map/detail`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取监控数量
  getMonitor(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/monitor`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }



  // ---------------------首页---------------------

  // 获取重要提醒
  getRemind(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/monitor`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取重要提醒列表
  getRemindList(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/remind/list?page=${n}&pageSize=${pageSize}&search=${search}&value=${value}&log_type=${status}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取通知消息
  getNotice(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/notice/info`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取通知消息列表
  getNoticeList(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/notice/list?page=${n}&pageSize=${pageSize}&search=${search}&value=${value}&log_type=${status}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  batchNotice(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/notice/batch`;
    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ----------------------end 首页-----------------------------



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
