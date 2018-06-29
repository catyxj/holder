import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/internal/operators';
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
  private userUrl = 'assets/server/config.json';  // URL to web api
  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(user): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    return this.http.post< any >('/user_login/', user, httpOptions)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap(val => this.isLoggedIn = true),
        catchError(this.handleError) // then handle the error
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  getUser(): Observable< any > {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get< any >('assets/server/user.json')  // /user
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
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
