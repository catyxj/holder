import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/internal/operators';
import { Resolve, Router} from '@angular/router';
import { environment } from './../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'auth'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: any = false;
  public userInfo = [];

  private userSource = new Subject<any>();
  private changeUserSource = new Subject<any>();
  userStatus$ = this.userSource.asObservable();  // 子组件监测父组件user值
  changeUserStatus$ = this.changeUserSource.asObservable();

  constructor(private http: HttpClient) { }

  // 从父组件获取user值
  StatusMission(message: any) {
    this.userSource.next(message);
  }
  // 子组件修改user
  ChangeMission(message: any) {
    this.changeUserSource.next(message);
  }



  // 退出登录
  logout(uid): Observable< any > {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.post<any> ('/api/user/logout', uid, httpOptions)
      .pipe(
        tap( (val) => {
          localStorage.setItem('user', 'false');
          localStorage.removeItem('authToken');
        })
      );
  }


  // 获取用户信息
  getUser(): Observable< any > {
    console.log('environment:', environment.production);
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);
    // console.log(httpOptions);

    if (!environment.production) {
      return this.http.get< any >('assets/server/user.json');
    } else {
      return this.http.get< any >('/api/user', httpOptions)
        .pipe(
          tap((val) => {
            // if (!val) {
            //   sessionStorage.setItem('user', 'false');
            // }
            console.log('token:', token);
          }),
          catchError(this.handleError2)
        );
    }

    // return this.http.get< any >('assets/server/user.json');
    /*return this.http.get< any >('/api/user', httpOptions)
        .pipe(
          tap((val) => {
            // if (!val) {
            //   sessionStorage.setItem('user', 'false');
            // }
            console.log('token:', token);
          }),
          catchError(this.handleError2)
        );*/


  }



  // 获取侧边栏，权限
  getSide(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    /*return this.http.get< any >('/api/user/menutree', httpOptions)
      .pipe(
        catchError(this.handleError)
      );*/

    let roleId = localStorage.getItem('roleId');
    // 管理员
    if (roleId === '1') {
      return this.http.get< any >('assets/server/sidenav_admin.json')
        .pipe(
          catchError(this.handleError)
        );
    }
    // 正式版
    if (roleId === '10') {
      return this.http.get< any >('assets/server/sidenav_formal.json')
        .pipe(
          catchError(this.handleError)
        );
    }
    // 普通版
    if (roleId === '11') {
      return this.http.get< any >('assets/server/sidenav_ordinary.json')
        .pipe(
          catchError(this.handleError)
        );
    }
    // 维保
    if (roleId === '15') {
      return this.http.get< any >('assets/server/sidenav_service.json')
        .pipe(
          catchError(this.handleError)
        );
    }

    // 运维
    if (roleId === '16') {
      return this.http.get< any >('assets/server/sidenav_operator.json')
        .pipe(
          catchError(this.handleError)
        );
    }

    // 财务
    if (roleId === '17') {
      return this.http.get< any >('assets/server/sidenav_finance.json')
        .pipe(
          catchError(this.handleError)
        );
    }




  }

  // 费用侧边栏
  getSideC(): Observable<any> {
    let token = localStorage.getItem('authToken');
    httpOptions.headers = httpOptions.headers.set('Authorization', token);

    return this.http.get< any >('assets/server/sidenav_charge.json')
      .pipe(
        catchError(this.handleError)
      );





  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'error:', error,
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    if (!error.status) {
      window.location.reload();
    }
    if (error.status === 550) {
      localStorage.user = 'false';
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      alert(error.error);
    }
    return throwError(
      error.error
    );
  }

  private handleError2(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        'error:', error,
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    if (error.status === 550) {
      localStorage.user = 'false';
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      alert(error.error);
    }
    return throwError(
      error
    );
  }

}


export class UserResolver implements Resolve<any> {
  constructor(private us: UserService, private router: Router) {}

  resolve(): Observable<any> {
    return this.us.getUser();
  }
}
