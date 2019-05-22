import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs/index';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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
export class VideoService {
  private videoListUrl = '/camera_list';

  constructor(private http: HttpClient) { }

  // 获取列表
  getLists(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.videoListUrl}/?page=${n}&row=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  editData(data): Observable<any> {
    return this.http.post('/camera_update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteData(uid): Observable<any> {
    return this.http.post('/camera_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加
  addData(data): Observable<any> {
    return this.http.post('/camera_add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 云台控制（按下）
  startCtrl(data): Observable<any> {
    return this.http.post('/camera_console_begin', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 云台控制（放开）
  endCtrl(data): Observable<any> {
    return this.http.post('/camera_console_stop', data, httpOptions)
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
