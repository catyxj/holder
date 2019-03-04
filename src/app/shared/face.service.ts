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
export class FaceService {
  private faceListUrl = '/face_attendance_log_list';
  private faceRecUrl = '/face_list';

  constructor(private http: HttpClient) { }

  // 获取列表
  getLists(n: number, pageSize: number): Observable<any> {
    const url = `${this.faceListUrl}/?page=${n}&pageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取匹配列表
  getRecLists(n: number, pageSize: number): Observable<any> {
    const url = `${this.faceRecUrl}/?page=${n}&pageSize=${pageSize}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 修改
  editData(data): Observable<any> {
    return this.http.post('/face_update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteData(uid): Observable<any> {
    return this.http.post('/face_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加
  addData(data): Observable<any> {
    return this.http.post('/face_add', data, httpOptions)
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
