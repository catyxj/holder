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







  constructor(private http: HttpClient, private router: Router) { }


  // 获取列表模式列表
  getLists(n: number, pageSize: number, search?: string, value?: string, online?: string, run?: string, status?: string  ): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/equipment/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&online=${online}&run_status=${run}&status=${status}`;
    }
    if (roleId === '11') {
      url = `/api/general/equipment/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&online=${online}&run_status=${run}&status=${status}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取详情页设备信息
  getInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/info/detail?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/info/detail?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取详情页终端信息
  getTermInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/terminal/info/detail?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/terminal/info/detail?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 删除设备
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/batch/delete`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/batch/delete`;
    }
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 禁用/激活设备
  disableData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/batch/update/status`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/batch/update/status`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新地址信息
  updateAddress(data: any): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/address/update`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/address/update`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新基本信息
  updateBasic(data: any): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/info/update`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/info/update`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // -------------地图模式------------
  // 获取地图坐标
  getMapDetail(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/ept/map/detail';
    }
    if (roleId === '11') {
      url = '/api/general/ept/map/detail';
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取监控数量
  getMonitor(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/ept/monitor';
    }
    if (roleId === '11') {
      url = '/api/general/ept/monitor';
    }

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

    const url = `/api/formal/ept/remind`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取重要提醒列表
  getRemindList(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/ept/remind/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&log_type=${status}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取通知消息
  getNotice(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/ept/notice/info';
    }
    if (roleId === '11') {
      url = '/api/general/ept/notice/info';
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取通知消息列表
  getNoticeList(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/notice/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&log_type=${status}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/notice/list?page=${n}&pageSize=${pageSize}&search=${search}&value=${value}&log_type=${status}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 通知批量操作
  batchNotice(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/ept/notice/batch';
    }
    if (roleId === '11') {
      url = '/api/general/ept/notice/batch';
    }

    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNoticeInfo(id): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/notice/detail?id=${id}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/notice/detail?id=${id}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ----------------------end 首页-----------------------------



  // -----------------普通用户----------------
  // 新增设备关联
  addEptLink(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/general/ept/bind', data, httpOptions)
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
