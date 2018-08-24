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
export class RuntimeService {

  constructor(private http: HttpClient) { }

  getInstants(): Observable<any> {
    return this.http.get('assets/server/runtime.json');
  }

  // 获取设备型态信息
  getEquipTemp(uid): Observable<any>  {
    return this.http.get(`/equipment_template_get?uid=${uid}`);
  }

  // 获取运行参数
  getRuntimeList(uid): Observable<any> {
    return this.http.get(`/equipment_runtime_list?uid=${uid}`);
  }

  // 获取图表数据
  getRuntimeData(uid): Observable<any> {
    return this.http.get(`/equipment_runtime_data_list?uid=${uid}`);
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
    return throwError(
      error.error);
  }

}
