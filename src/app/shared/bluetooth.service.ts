import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs/index';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  private bluetoothUrl = '/bluetooth_list';
  private bluetoothAllUrl = '/bluetooth_list_all';

  constructor(private http: HttpClient) { }

  // 获取集群列表
  getlist(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.bluetoothUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  addData(data): Observable<any> {
    return this.http.post('/bluetooth_add', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteData(uid): Observable<any> {
    return this.http.post('/bluetooth_delete', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  updateData(data): Observable<any> {
    return this.http.post('/bluetooth_update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取蓝牙列表-下拉
  getBlueAll(): Observable<any> {
    return this.http.get(this.bluetoothAllUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 设备绑定蓝牙---设备查看页
  bindEqBlue(data): Observable<any> {
    return this.http.post('/bluetooth_bind', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 蓝牙绑定设备
  bindBlueEq(data): Observable<any> {
    return this.http.post('/bind', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 蓝牙解绑
  unBind(data): Observable<any> {
    return this.http.post('/bluetooth_unbind', data, httpOptions)
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
