import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError, retry} from "rxjs/internal/operators";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapAllUrl = '/equipment_map_location';
  private mapCountUrl = '/equipment_map_count';
  private mapBatchUrl = '/equipment_map_list';

  constructor(private http: HttpClient) { }

  // 获取全部地图信息
  getMapAll(): Observable<any> {
    return this.http.get<any>(this.mapAllUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取状态信息
  getMapCount(): Observable<any> {
    return this.http.get<any>(this.mapCountUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取分页地图信息
  getMapBatch(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.mapBatchUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
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
