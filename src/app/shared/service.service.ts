import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {catchError, filter} from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private listUrl = '/dialogue_list'; // 我的表单列表
  private questionUrl = '/dialogue_problem_list';  // 提交表单列表
  private questionDetailUrl = '/dialogue_problem_detail_list';
  private typeUrl = '/dialogue_type_list';
  private commentUrl = '/dialogue_comment_list';

  constructor(private http: HttpClient) { }

  // 获取列表-我的表单
  getLists(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.listUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取问题类型
  getType() {
    return this.http.get<any>(this.typeUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取问题列表-提交表单
  getQuestion(n: number, pageSize: number, id) {
    const url = `${this.questionUrl}/?page=${n}&pageSize=${pageSize}&typeId=${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取问题详情
  getQDetail(uid) {
    const url = `${this.questionDetailUrl}/?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取留言列表
  getComment(uid, page, pageSize) {
    const url = `${this.commentUrl}/?uid=${uid}&pageNum=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 新增
  addComment(data) {
    return this.http.post('/dialogue_add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 回复表单
  updateComment(data) {
    return this.http.post('/dialogue_update', data, httpOptions)
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



  delete(data) {
    return this.http.post('/dialogue_delete', data, httpOptions)
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
