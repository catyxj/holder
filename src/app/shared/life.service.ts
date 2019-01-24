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
export class LifeService {
  private lifelistUrl = '/asdf'; // 生命周期列表

  constructor(private http: HttpClient) { }

  // 获取列表
  getLifeLists(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.lifelistUrl}/?pageNum=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加
  add(data): Observable<any> {
    return this.http.post('/add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  edit(data): Observable<any> {
    return this.http.post('/edit', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteLife(data) {
    return this.http.post('/delete', data, httpOptions)
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
