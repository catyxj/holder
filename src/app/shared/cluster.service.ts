import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  private clusterUrl = 'assets/server/cluster_list.json';

  constructor(private http: HttpClient) { }

  // 获取集群列表
  getClustersz(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.clusterUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
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
