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
export class AlarmService {

  // private currentUrl = 'assets/server/boiler_alarm_list.json';
  // private historyUrl = 'assets/server/boiler_alarm_history_list.json';
  // private detailUrl = 'assets/server/boiler_alarm_detail.json';

  private currentUrl = '/alarm_list';
  private historyUrl = '/alarm_history_list';
  private detailUrl = '/boiler_alarm_detail';

  constructor(private http: HttpClient) { }


  // 获取当前告警列表
  getCurrents(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.currentUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取历史告警列表
  getHistories(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.historyUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取告警详情
  getDetail(uid): Observable<any> {
    const url = `${this.detailUrl}/?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
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
