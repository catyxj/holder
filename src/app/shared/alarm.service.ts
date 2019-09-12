import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';

const token = localStorage.getItem('authToken');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': token
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  private currentUrl = 'assets/server/boiler_alarm_list.json';
  private historyUrl = 'assets/server/boiler_alarm_history_list.json';
  // private detailUrl = 'assets/server/boiler_alarm_detail.json';


  private alarmNumUrl = '/alarm_new_count';

  private alarmSource = new Subject<any>();
  alarmStatus$ = this.alarmSource.asObservable(); // 父组件监测子组件alarm

  constructor(private http: HttpClient) { }

  // 从子组件获取alarm
  AlarmMission(message: any) {
    this.alarmSource.next(message);
  }



  // 获取告警列表-设备详情页
  getAlarm(uid, page, pageSize, search, value): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/alarm/list?uid=${uid}&page=${page}&rows=${pageSize}&search=${search}&value=${value}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/alarm/list?uid=${uid}&page=${page}&rows=${pageSize}&search=${search}&value=${value}`;
    }

    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取告警详情
  getDetail(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/ept/alarm/detail?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/ept/alarm/detail?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取未查看告警数
  getAlarmNum(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get<any>(this.alarmNumUrl, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取当前告警列表
  getCurrents(n: number, pageSize: number, search?: string, uid?: string): Observable<any> {
    const url = `${this.currentUrl}/?page=${n}&pageSize=${pageSize}&search=${search}&uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取历史告警列表
  getHistories(n: number, pageSize: number, search?: string, uid?: string): Observable<any> {
    const url = `${this.historyUrl}/?page=${n}&pageSize=${pageSize}&search=${search}&uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }



  getSubscribe(uid): Observable<any> {
    return this.http.get(`/alarm_subscribe?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  setsubscribe(uid): Observable<any> {
    return this.http.post('/alarm_set_subscribe', uid, httpOptions)
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
    if (error.status === 550) {
      localStorage.removeItem('authToken');
      window.location.reload();
    }
    return throwError(
      error.error);
  }

}
