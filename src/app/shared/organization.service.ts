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
export class OrganizationService {

  private orgUrl = 'assets/server/organization_list.json';
  private orgTypeUrl = 'assets/server/organization_type_list.json';

  // private orgUrl = '/organization_list';
  // private orgTypeUrl = '/organization_type_list/';



  constructor(private http: HttpClient) { }

  getOrganization(n: number, pageSize: number, search?: string): Observable <any> {
    const url = `${this.orgUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  // 获取企业类型
  getOrgType(): Observable<any> {
    return this.http.get<any>(this.orgTypeUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 获取企业列表（下拉）
  getOrgList(): Observable <any> {
    const url = `${this.orgUrl}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 删除
  deleteOrg(uid): Observable<any> {
    return this.http.post('/organization_delete/', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 保存
  save(data): Observable<any> {
    return this.http.post('/organization_update/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // 添加企业
  add(data): Observable<any> {
    return this.http.post('/organization_add/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 添加账号
  addAccount(acc): Observable<any> {
    return this.http.post('', acc, httpOptions);
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      error.error);
  }

}
