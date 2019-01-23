import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs/index';
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
export class OverviewService {
  private fileListUrl = '/file_manage_list';
  private fileInfoUrl = '/file_manage_detail';

  private fileSource = new Subject<any>();
  fileStatus$ = this.fileSource.asObservable(); // 档案列表监测组件变化

  constructor(private http: HttpClient) { }


  // 从子组件获取列表变化
  fileMission(message: any) {
    this.fileSource.next(message);
  }

  // 获取档案列表
  getFileList(n: number, pageSize: number ): Observable<any> {
    const url = `${this.fileListUrl}/?pageNum=${n}&pageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除档案
  deleteFile(data): Observable<any> {
    return this.http.post('/file_manage_delete', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取档案信息
  getFileInfo(uid: string ): Observable<any> {
    const url = `${this.fileInfoUrl}?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加设备-档案
  addFile(data): Observable<any> {
    return this.http.post('/file_manage_add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 绑定终端
  addTerm(data): Observable<any> {
    return this.http.post('/file_manage_second', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 新建模板
  addTemplate(data): Observable<any> {
    return this.http.post('/file_manage_third', data, httpOptions)
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
