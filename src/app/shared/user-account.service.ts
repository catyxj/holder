import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {catchError} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private userRoleUrl = 'assets/server/user_roles.json'
  private userAccountUrl = 'assets/server/user_list.json';  // URL to web api

  constructor(private http: HttpClient) { }


  getUserRoles(): Observable<any[]> {
    return this.http.get<any>(this.userRoleUrl)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

  getAccounts(n: number, search?: string): Observable<any[]> {
    const url = `${this.userAccountUrl}/?page=${n}&search=${search}`;
    return this.http.get<any[]>(url)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getAccount(id: number): Observable<any> {
    const url = `${this.userAccountUrl}/?id=${id}&n=1&search=哈哈`;

    return this.http.get<any>(url);
    // return of(BOILERS.find(boiler => boiler.id === id));
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
    // return an observable with a user-facing error message
    return throwError(
      error.error);
  }

}
