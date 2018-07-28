import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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
export class ClusterService {

  // private clusterUrl = 'assets/server/cluster_list.json';
  // private clustersUrl = 'assets/server/cluster_list_all.json';
  // private clusEquipUrl = 'assets/server/cluster_list.json';

  private clusterUrl = '/cluster_list';
  private clustersUrl = '/cluster_list_all';
  private clusEquipUrl = '/cluster_detail';

  constructor(private http: HttpClient) { }

  // 获取集群列表
  getClusters(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.clusterUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取集群列表-下拉列表
  getClustersAll(): Observable<any> {
    return this.http.get<any>(this.clustersUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加
  addCluster(cluster): Observable<any> {
    return this.http.post('/cluster_add', cluster, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改
  editCluster(cluster): Observable<any> {
    return this.http.post('/cluster_update', cluster, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除
  deleteCluster(uid): Observable<any> {
    return this.http.post('/cluster_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 从集群中移除设备
  deleteEquip(data): Observable<any> {
    return this.http.post('/cluster_equipment_remove/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取集群设备列表
  getClusEquip(uid: string, n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.clusEquipUrl}/?uid=${uid}&page=${n}&pageSize=${pageSize}&search=${search}`;
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
