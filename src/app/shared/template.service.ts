import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templatesUrl = 'assets/server/template_lists.json';
  private channelUrl = 'assets/server/chan_config_list.json';
  private templateAllUrl = 'assets/server/template_list.json';

  // private templatesUrl = '/api/formal/terminal/temp/list';
  // private channelUrl = '/api/formal/template/detail';
  // private templateAllUrl = '/api/formal/template/list/all';

  constructor(private http: HttpClient) { }

  // 获取模板列表
  getLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.templatesUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // ---------------------新增模板-----------------------
  // 新增设备信息
  addEpt(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/ept', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增通信参数
  addCmt(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/cmt', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增数据点位
  addChannel(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/channel', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增能效计算
  addCalc(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/calc', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增组态
  addZt(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/zt', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新增模板名称
  addName(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/create/name', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // ----------------end 新增模板---------------------------------

  // 删除
  deleteData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量设置
  batchSet(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/terminal/temp/batch/set', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取通信参数信息
  getCmt(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/temp/cmt/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取模板配置基本信息
  getEpt(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/temp/ept/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取通道基本信息
  getChannelBrief(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/temp/channel/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取组态基本信息
  getzZTBrief(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(`/api/formal/terminal/temp/zt/brief?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取通道具体信息
  getChannelInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // return this.http.get('assets/server/chan_config_list.json');
    return this.http.get<any>(`/api/formal/terminal/temp/channel/detail?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取组态内容
  getContent(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    // return this.http.get('assets/server/device.json', httpOptions);
    return this.http.get<any>(`/api/formal/terminal/temp/zt/detail?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }









  // 获取模板列表--下拉列表
  getTemplateAll(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.templateAllUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }




  // 获取模板通道数据
  getChannel(uid: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.channelUrl}/?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加模板
  add(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/template/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  save(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/terminal_template_update', data, httpOptions)
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
