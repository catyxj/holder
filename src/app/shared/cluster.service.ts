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



  constructor(private http: HttpClient, private router: Router) { }

  // 获取集群列表
  getLists(n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);


    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/cluster/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    }
    if (roleId === '11') {
      url = `/api/general/cluster/list?page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    }

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
    return this.http.get<any>(`/api/formal/cluster/bind/ept/list/all?uid=${uid}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取设备列表-分页（集群外）
  getEptList(uid, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    //  return this.http.get<any>('assets/server/cluster_list.json', httpOptions);
    return this.http.get<any>(`/api/formal/cluster/bind/ept/list?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取集群状态信息
  getStatus(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/cluster/status/detail?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/cluster/status/detail?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取集群信息
  getInfo(uid): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/cluster/detail?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/cluster/detail?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取集群设备列表--全部
  getClusEquipAll(uid: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/cluster/ept/list/all?uid=${uid}`;
    }
    if (roleId === '11') {
      url = `/api/general/cluster/ept/list/all?uid=${uid}`;
    }

    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取集群设备列表--（分页）
  getClusEquipList(uid: string, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/cluster/ept/list?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取集群设备列表--（分页）批量取消关联
  getClusUnbindEquip(uid: string, n: number, pageSize: number, search?: string, value?: string): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    const url = `/api/formal/cluster/unbind/ept/list?uid=${uid}&page=${n}&rows=${pageSize}&search=${search}&value=${value}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 集群批量操作-删除，激活，禁用
  batchD(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = `/api/formal/cluster/batch`;
    }
    if (roleId === '11') {
      url = `/api/general/cluster/batch`;
    }

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

    let roleId = localStorage.getItem('roleId');
    let url;
    if (roleId === '10') {
      url = '/api/formal/cluster/update';
    }
    if (roleId === '11') {
      url = `/api/general/cluster/update`;
    }

    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  // ---------普通用户-----------
  addClu(data): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post('/api/general/cluster/bind', data, httpOptions)
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
