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

  // private templatesUrl = 'assets/server/template_lists.json';
  // private channelUrl = 'assets/server/chan_config_list.json';
  // private templateAllUrl = 'assets/server/template_list.json';

  private templatesUrl = '/terminal_template_list';
  private channelUrl = '/terminal_template_detail';
  private templateAllUrl = '/terminal_template_list_all';

  constructor(private http: HttpClient) { }

  // 获取模板列表
  getTemplates(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.templatesUrl}/?page=${n}&row=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取模板列表--下拉列表
  getTemplateAll(): Observable<any> {
    return this.http.get<any>(this.templateAllUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteTemplate(uid): Observable<any> {
    return this.http.post('/terminal_template_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取模板配置数据
  getChannel(uid: string): Observable<any> {
    const url = `${this.channelUrl}/?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加模板
  add(data): Observable<any> {
    return this.http.post('/terminal_template_add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  save(data): Observable<any> {
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
