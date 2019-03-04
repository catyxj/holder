import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendListUrl = '/attendance_list';

  constructor(private http: HttpClient) { }


  // 获取列表
  getList(data): Observable<any> {
    const url = `${this.attendListUrl}`;
    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getListAll(): Observable<any> {
    return this.http.get('/attendance_list_all')
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
