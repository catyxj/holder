import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private terminalsUrl = 'assets/server/terminal_list.json';
  private messageUrl = 'assets/server/terminal_origin_message_list.json';
  private funcUrl = 'assets/server/term_function_code_list.json';
  private byteUrl = 'assets/server/term_byte_list.json';
  private templateUrl = 'assets/server/template_list.json';

  // private terminalsUrl = '/terminal_list';
  // private messageUrl = '/terminal_origin_message_list';
  // private funcUrl = '/term_function_code_list';
  // private byteUrl = '/term_byte_list';
  // private templateUrl = '/terminal_template';

  constructor(private http: HttpClient) { }

  // 获取终端列表
  getTerminals(n: number, pageSize: number, search?: string ): Observable<any> {
    // TODO: send the message _after_ fetching the heroes
    const url = `${this.terminalsUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取调试消息
  getMessage(code: string): Observable<any> {
    const url = `${this.messageUrl}/?dev=origin&terminal=${code}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加终端
  addTerminal(ter): Observable<any> {
    return this.http.post('/terminal_add/', ter, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量添加终端
  groupAdd(ter): Observable<any> {
    return this.http.post('/terminal_group_add/', ter, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量配置模板
  groupConfig(item): Observable<any> {
    return this.http.post('/template_group_config', item, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteTerminal(uid): Observable<any> {
    return this.http.post('/terminal_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取bin文件
  getBin(): Observable<any> {
    return this.http.get<any>('/bin_list')
      .pipe(
        catchError(this.handleError)
      );
  }

  // 升级配置
  upgrade(bin): Observable<any> {
    return this.http.post('/upgrade_configuration', bin, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取功能码
  getFuncode(): Observable<any> {
    return this.http.get<any>(this.funcUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTemplate(): Observable<any> {
    return this.http.get<any>(this.templateUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取高低字节
  getByte(): Observable<any> {
    return this.http.get<any>(this.byteUrl)
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
    return throwError(
      error.error);
  }

}
