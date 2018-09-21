import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private userRoleUrl = '/user_roles/ ';
  private userAccountUrl = '/user_list';
  private authorityUrl = 'a';

  // private userRoleUrl = 'assets/server/user_roles.json';
  // private userAccountUrl = 'assets/server/user_list.json';
  // private authorityUrl = 'a';


  constructor(private http: HttpClient) { }


  getUserRoles(): Observable<any[]> {
    return this.http.get<any>(this.userRoleUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  getAccounts(n: number, pageSize: number, search?: string): Observable<any> {
    const url = `${this.userAccountUrl}/?page=${n}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<any>(url)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // 账号删除
  deleteAccount(uid): Observable<any> {
    return this.http.post('/user_delete', uid, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 账号修改
  saveAccount(data): Observable<any> {
    return this.http.post('/user_update/', data, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );

  }



  // 添加账号（企业）
  addAccount(data): Observable<any> {
    return this.http.post('/user_add/', data, httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  // 获取管理权限
  getAuthority(): Observable<any[]> {
    return this.http.get<any>(this.authorityUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    if (error.status === 550) {
      window.location.reload();
    }
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }

}
