import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
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
export class MaintainService {


  private dataListUrl = '/api/formal/mt/user/list';

  // private dataListUrl = 'assets/server/cluster_list.json';

  constructor(private http: HttpClient) { }


  // -------------------维保账号-------------------
  // 获取维保账号列表
  getUserLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保账号详情
  getUserInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/mt/user/detail?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增维保账号
  addUserData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/user/create', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改维保账号状态
  updateUserStatus(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/user/update/status', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除维保账号
  deleteUserData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/user/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保账号设备信息
  getUserMtInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/mt/user/mt/info?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保账号设备详情
  getUserMtDetail(uid, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/mt/user/mt/detail?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 修改维保账号
  updateUser(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/user/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // 维保账号未绑定设备列表
  UserEptUnbindlist(uid, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/mt/user/unbind/ept/list?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 维保账号绑定设备
  UserEptBind(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post(`/api/formal/mt/user/bind/ept`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 维保账号解绑设备
  UserEptUnbind(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post(`/api/formal/mt/user/unbind/batch`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // ---------------维保模板-----------------------
  // 获取维保模板列表
  getTempLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/mt/temp/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保模板详情
  getTempInfo(id): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/mt/temp/detail?id=${id}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增维保模板
  addTempData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/temp/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改维保模板
  updateTemp(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/temp/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除维保模板
  deleteTempData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/temp/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保模板列表-全部
  getTempListAll(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/mt/temp/name/list/all`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 维保模板-设备列表
  tempEptlist(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/mt/temp/ept/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 维保模板批量设置
  tempEptBatch(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post(`/api/formal/mt/temp/batch/set`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // -------------维保记录------------------
  // 获取维保记录列表
  getLogLists(n: number, pageSize: number, search?: string, value?: string, status?, eptId?): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/mt/log/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&status=${status}&ept_id=${eptId}`;
    }
    if (roleId === '15') {
      url = `/api/maintenance/ept/mt/log/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&status=${status}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保记录详情
  getLogInfo(id): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/mt/log/detail?id=${id}`;
    }
    if (roleId === '15') {
      url = `/api/maintenance/ept/mt/log/detail?id=${id}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除维保记录
  deleteLogData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/mt/log/delete';
    }
    if (roleId === '15') {
      url = '/api/maintenance/ept/mt/log/batch';
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }





  // ---------------------运维用户----------------------------
  // 维保产品
  // 获取维保产品列表
  getProdLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/maintenance/ept/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取维保产品信息
  getProdInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/maintenance/ept/detail?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 新增维保产品
  addProdData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/maintenance/ept/mt/create', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // ---------- end 维保产品--------------



  // 删除
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/a/batch/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 产品批量新增
  batchAddP(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/formal/maintain/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取维保列表
  getLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增维保
  addData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/mt/create', data, httpOptions)
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
