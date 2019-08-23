import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  private terminalDataUrl = '/api/admin/terminal/status/statistics';
  private videoDataUrl = '/api/admin/camera/status/statistics';
  private bluetoothDataUrl = '/api/admin/bluetooth/status/statistics';

  // private fileSource = new Subject<any>();
  // fileStatus$ = this.fileSource.asObservable(); // 档案列表监测组件变化

  constructor(private http: HttpClient) { }


  // 获取终端信息
  getTerminal(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.terminalDataUrl}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取视频信息
  getVideo(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.videoDataUrl}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取视频信息
  getBlue(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.bluetoothDataUrl}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 从子组件获取列表变化
  /*fileMission(message: any) {
    this.fileSource.next(message);
  }*/




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
