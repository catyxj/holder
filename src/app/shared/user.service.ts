import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError,  tap} from 'rxjs/internal/operators';
import { Resolve, Router} from '@angular/router';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
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

  // 登录
  login(user): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    return this.http.post< any >('/user_login/', user, httpOptions)
      // .subscribe(cuser => { this.userInfo = cuser; })
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap((val) => {
          // this.isLoggedIn = 'true';
          localStorage.setItem('status', 'true');
        }),
        catchError(this.handleError) // then handle the error
      );
  }

  // 退出登录
  logout(uid): Observable< any > {
    // this.isLoggedIn = false;
    return this.http.post<any> ('/user_logout/', uid, httpOptions)
      .pipe(
        tap( (val) => {
          this.isLoggedIn = 'false';
          localStorage.setItem('status', 'false');
        })
      );
  }


  // 获取用户信息
  getUser(): Observable< any > {
    console.log('environment:', environment.production);

    /*if (!environment.production) {
      return this.http.get< any >('assets/server/user.json');
    } else {

    }*/
    return this.http.get< any >('/user')
      .pipe(
        tap((val) => {
          if (!val) {
            this.isLoggedIn = 'false';
            sessionStorage.setItem('user', 'false');
          }
        }),
        catchError(this.handleError)
      );


  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
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


export class UserResolver implements Resolve<any> {
  constructor(private us: UserService, private router: Router) {}

  resolve(): Observable<any> {
    return this.us.getUser();
  }
}
