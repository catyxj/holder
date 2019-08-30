import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";
import {Router} from "@angular/router";

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
  // private clusEquipUrl = 'assets/server/cluster_equip.json';

  private clusterUrl = '/api/formal/cluster/list';
  private clusEquipUrl = '/api/formal/cluster/ept/list';

  constructor(private http: HttpClient, private router: Router) { }

  // 获取集群列表
  getLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.clusterUrl}?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取集群列表-批量操作
  getBatchLists(n: number, pageSize: number, search?: string, value?: string, status?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/cluster/name/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}&status=${status}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取设备列表-全部（集群外）
  getEptAll(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    //  return this.http.get<any>('assets/server/cluster_list.json', httpOptions);
    return this.http.get<any>(`/api/formal/cluster/bind/ept/list?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStatus(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/cluster/status/detail?uid=${uid}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取集群设备列表
  getClusEquip(uid: string, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `${this.clusEquipUrl}?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 集群批量操作-删除，激活，禁用
  batchD(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/cluster/batch`;
    return this.http.post<any>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 添加
  addCluster(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/cluster/create', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量关联设备
  eptLink(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/cluster/bind', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改基础信息
  updateBasic(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/formal/cluster/update', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 从集群中移除设备
  deleteEquip(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/cluster_equipment_remove/', data, httpOptions)
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
