import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
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
export class BoilerService {

  // private boilersUrl = 'assets/server/boiler_list.json';
  // private templatesUrl = 'assets/server/boiler_template_list.json';
  // private boilerUrl = 'assets/server/boiler.json';
  // private templateListUrl = 'assets/server/boiler_template_list.json';

  private boilersUrl = '/equipment_list';
  private templatesUrl = '/equipment_template';
  private boilerUrl = '/equipment_detail';
  private templateListUrl = '/equipment_template_list'; // 设备型态列表

  constructor(private http: HttpClient, private router: Router) { }

  getBoilers(n: number, pageSize: number, search?: string ): Observable<any> {
    // TODO: send the message _after_ fetching the heroes
    const url = `${this.boilersUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 添加
  addBoiler(boiler): Observable<any> {
    return this.http.post('/equipment_add', boiler, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 删除
  deleteBoiler(uid): Observable<any> {
    return this.http.post('/equipment_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 批量添加集群
  addCluster(boiler): Observable<any> {
    return this.http.post('/equipment_batch_cluster', boiler, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取炉型列表-下拉
  getTemplates(): Observable<any> {
    return this.http.get(this.templatesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  getBoiler(uid: string): Observable<any> {
    const url = `${this.boilerUrl}/?uid=${uid}`;
    return this.http.get<any>(url);
    // return of(BOILERS.find(boiler => boiler.id === id));
  }

  // 绑定终端
  terBind(code: any): Observable<any> {
    return this.http.post('/equipment_bind/', code, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 终端解绑
  unBind(data: any): Observable<any> {
    return this.http.post('/equipment_unbind/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新地址信息
  updateAddress(boiler: any): Observable<any> {
    return this.http.post('/equipment_update/?scope=location', boiler, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 更新基本信息
  updateBoiler(address: any): Observable<any> {
    return this.http.post('/equipment_update/?scope=basic', address, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 更新维保信息
  updateMaintain(data: any): Observable<any> {
    return this.http.post('/equipment_update/?scope=maintain', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取设备型态列表
  getTemplateList(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.templateListUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 添加设备型态
  addTemplate(temp): Observable<any> {
    return this.http.post('/equipment_template_add', temp, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 修改设备型态
  editTemplate(temp): Observable<any> {
    return this.http.post('/equipment_template_update', temp, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除设备型态
  deleteTemplate(temp): Observable<any> {
    return this.http.post('/equipment_template_delete', temp, httpOptions)
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
