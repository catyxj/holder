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
export class RuntimeService {

  constructor(private http: HttpClient) { }

  getInstants(): Observable<any> {
    return this.http.get('assets/server/runtime.json')
      .pipe(
        catchError(this.handleError)
      );
  }


  // 获取设备型态信息
  getEquipTemp(uid): Observable<any>  {
    return this.http.get(`/equipment_template_get?uid=${uid}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //  设备控制开关
  equipControl(data): Observable<any> {
    return this.http.post('/equipment_ctl', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取运行参数
  getRuntimeList(data): Observable<any> {
    return this.http.post(`/equipment_runtime_list`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取图表数据
  getRuntimeData(uid): Observable<any> {
    return this.http.get(`/equipment_runtime_data_list?uid=${uid}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 历史数据
  getHistory(data): Observable<any> {
    return this.http.post('/equipment_runtime_history', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 导出历史数据
  getHistoryExport(data): Observable<any> {
    return this.http.post('/equipment_runtime_history_export', data, httpOptions)
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
