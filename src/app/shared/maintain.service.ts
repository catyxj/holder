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
export class MaintainService {
  private mlistUrl = '/maintenance_list'; // 维保记录
  private mlExportUrl = '/maintenance_export'; // 导出
  private mlistUrl2 = '/maintenance_alarm_list'; // 故障列表
  private mlistUrl3 = '/maintenance_alarm_list_all'; // 故障列表
  private mdetailUrl = '/maintenance_detail';  // 维保详情
  private maddUrl = '/maintenance_add';

  constructor(private http: HttpClient) { }


  // 获取单台设备维保记录列表
  getLists(n: number, pageSize: number, uid?: string, search?: string): Observable<any> {
    const url = `${this.mlistUrl}/?pageNum=${n}&row=${pageSize}&uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取单台设备导出列表
  exports(uid: string): Observable<any> {
    const url = `${this.mlExportUrl}/?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取故障列表
  getMalLists(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.mlistUrl2}/?pageNum=${n}&row=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取故障历史列表
  getMalHistoryLists(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.mlistUrl3}/?pageNum=${n}&row=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取故障详情
  getDetail(uid): Observable<any> {
    const url = `${this.mdetailUrl}/?uid=${uid}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加
  add(data): Observable<any> {
    return this.http.post('/maintenance_add', data, httpOptions)
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
