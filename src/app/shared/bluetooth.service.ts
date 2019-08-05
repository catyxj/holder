import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  //  管理员
  private dataListUrl = '/api/admin/bluetooth/list';
  private dataBasicUrl = '/api/admin/bluetooth/detail';
  private dataOperateUrl = '/api/admin/bluetooth/log/info';
  private dataOperateMoreUrl = '/api/admin/bluetooth/log/list';

  // 正式用户
  private dataListUrlF = '/api/formal/bluetooth/list';
  private dataBasicUrlF = '/api/formal/bluetooth/detail';
  private dataOperateUrlF = '/api/formal/bluetooth/log/info';
  private dataOperateMoreUrlF = '/api/formal/bluetooth/log/info/more';

  // private token = 'authtoken';
  // private dataListUrlF = 'assets/server/cluster_list.json';


  constructor(private http: HttpClient) { }

  // 获取蓝牙列表
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


  // 新增
  addData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '1') {
      url = '/api/admin/bluetooth/add';
    }
    if (roleId === '10') {
      url = '/api/formal/bluetooth/create';
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
      url = '/api/admin/bluetooth/batch/delete';
    }
    if (roleId === '10') {
      url = '/api/formal/bluetooth/batch/delete';
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
      url = '/api/admin/bluetooth/update';
    }
    if (roleId === '10') {
      url = '/api/formal/bluetooth/update';
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

    return this.http.get(`/api/admin/bluetooth/scrapped?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /*----正式用户-----------*/
  // 报修
  repair(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/bluetooth/repair?uid=${data}`, httpOptions)
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
