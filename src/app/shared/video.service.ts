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
export class VideoService {

  // 管理员
  private dataListUrl = '/api/admin/camera/list';
  private dataBasicUrl = '/api/admin/camera/detail';
  private dataExpandUrl = '/api/admin/camera/capacity/get';
  private dataOperateUrl = '/api/admin/camera/log/info';
  private dataOperateMoreUrl = '/api/admin/camera/log/list';

  // 正式用户
  private dataListUrlF = '/api/formal/camera/list';
  private dataBasicUrlF = '/api/formal/camera/detail';
  private dataExpandUrlF = '/api/formal/camera/capacity/get';
  private dataOperateUrlF = '/api/formal/camera/log/info';
  private dataOperateMoreUrlF = '/api/formal/camera/log/info/more';
  private eptListUrl = '/api/formal/ept/camera/list'; // 设备详情页-视频列表

  // private token = 'authtoken';
  // private dataListUrl = 'assets/server/cluster_list.json';

  constructor(private http: HttpClient) { }

  // 获取列表
  getLists(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&status=${status}`;
    }
    if (roleId === '10') {
      url = `${this.dataListUrlF}?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取基本信息
  getBasic(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataBasicUrl}?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `${this.dataBasicUrlF}?uid=${uid}`;
    }
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取扩展应用
  getExpand(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataExpandUrl}?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `${this.dataExpandUrlF}?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息
  getOperate(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataOperateUrl}?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `${this.dataOperateUrlF}?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取记录信息列表
  getOperateMore(uid, n, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `${this.dataOperateMoreUrl}?uid=${uid}&page=${n}&rows=${pageSize}`;
    }
    if (roleId === '10') {
      url = `${this.dataOperateMoreUrlF}?uid=${uid}&page=${n}&rows=${pageSize}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增视频
  addData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/camera/add';
    }
    if (roleId === '10') {
      url = '/api/formal/camera/create';
    }
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/camera/batch/delete';
    }
    if (roleId === '10') {
      url = '/api/formal/camera/batch/delete';
    }
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 修改基础信息
  updateBasic(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/camera/update';
    }
    if (roleId === '10') {
      url = '/api/formal/camera/update';
    }
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 报废
  scrap(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/admin/camera/scrapped?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 在线直播
  live(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `/api/admin/camera/live/address?uid=${uid}`;
    }
    if (roleId === '10') {
      url = `/api/formal/camera/live/address?uid=${uid}`;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 视频控制开始
  startCtrl(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `/api/admin/camera/console/start`;
    }
    if (roleId === '10') {
      url = `/api/formal/camera/console/start`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 视频控制结束
  endCtrl(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = `/api/admin/camera/console/stop`;
    }
    if (roleId === '10') {
      url = `/api/formal/camera/console/stop`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  /*-----正式用户---------------------------------*/
  repair(data) {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/camera/repair?uid=${data}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取详情页视频列表
  getEptList(data): Observable<any>  {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`${this.eptListUrl}?uid=${data}`, httpOptions)
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
    return throwError(
      error.error);
  }

}
