import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RuntimeService {

  constructor(private http: HttpClient) { }

  getContent(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // return this.http.get('assets/server/device.json', httpOptions);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/instant/content/get?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/instant/content/get?uid=${uid}`;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getInstants(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // /ept/instant/ws
    return this.http.get('assets/server/runtime.json', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  //  设备控制开关
  equipControl(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/ept/switch/console';
    }
    if (roleId === '11') {
      url = '/api/general/ept/switch/console';
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取运行参数--图表页
  getRuntimeList(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/runtime/channel/list?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/runtime/channel/list?uid=${uid}`;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取图表数据
  getRuntimeData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/runtime/list`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/runtime/list`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 历史数据
  getHistory(uid, page, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // return this.http.get('/assets/server/boiler.json');

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/runtime/history?uid=${uid}&page=${page}&rows=${pageSize}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/runtime/history?uid=${uid}&page=${page}&rows=${pageSize}`;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 导出历史数据
  getHistoryExport(uid, type): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let data = {
      uid: uid,
      type: type
    };

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/runtime/history/export`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/runtime/history/export`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取组件列表
  getCompLists(uid, page, pageSize, search?, value?): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get(`/api/formal/ept/component/list?uid=${uid}&page=${page}&pageSize=${pageSize}&search=${search}&value=${value}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 新增组件
  addCompData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/component/create', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 设置组件
  editCompData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/component/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除组件
  deleteCompData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/ept/component/delete', data, httpOptions)
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
