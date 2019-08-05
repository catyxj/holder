import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {catchError, filter} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private dataListUrl = '/api/admin/dialogue/list';  // 服务支持列表
  private dataBasicUrl = '/api/admin/dialogue/detail';
  private commentUrl = '/api/admin/dialogue/comment/list';

  // 正式用户
  private dataListUrl_f = '/api/formal/dialogue/list';  // 服务支持列表
  private dataBasicUrl_f = '/api/formal/dialogue/detail';
  private commentUrl_f = '/api/formal/dialogue/comment/list';
  // 正式用户 / 普通用户
  private questionUrl_f = '/api/dialogue/problem/list';
  private questionDetailUrl_f = '/api/dialogue/problem/detail';

  // private token = 'authtoken';
  // private dataListUrl = 'assets/server/terminal_list.json';

  private typeUrl = '/dialogue_type_list';



  constructor(private http: HttpClient) { }

  // 获取列表
  getLists(n: number, pageSize: number, search?: string, value?: string, type?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&type=${type}&status=${status}`;
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

  // 获取留言列表
  getComments(uid, page, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.commentUrl}?uid=${uid}&page=${page}&rows=${pageSize}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // 批量关闭
  closeData(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/dialogue/close', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 回复表单
  updateComment(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/admin/dialogue/comment/commit', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  /*--------正式用户------------------------------*/

  // 获取列表
  getListsF(n: number, pageSize: number, search?: string, value?: string, type?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataListUrl_f}?page=${n}&rows=${pageSize}&search=${search}&value=${value}&type=${type}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取基本信息
  getBasicF(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.dataBasicUrl_f}?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取留言列表
  getCommentsF(uid, page, pageSize): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.commentUrl_f}?uid=${uid}&page=${page}&rows=${pageSize}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取问题列表
  getQuestionF(page, pageSize, id): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.questionUrl_f}?page=${page}&rows=${pageSize}&id=${id}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取问题详情
  getQDetailF(id): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.questionDetailUrl_f}?id=${id}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 批量关闭
  closeDataF(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/dialogue/close', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 回复表单
  updateCommentF(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/dialogue/commit', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 创建表单
  addDataF(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/dialogue/create', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }





  // 上传文件-(废)
  uploadReply(formData): Observable<any> {
    const req = new HttpRequest('POST', '/dialogue_update', formData, {
      reportProgress: true
    });
    return this.http
      .request(req)
      .pipe(
        filter(e => e instanceof HttpResponse),
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
