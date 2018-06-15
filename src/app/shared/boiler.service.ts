import { Injectable } from '@angular/core';

import {Observable, of, throwError} from 'rxjs';

import { Boiler } from '../boiler';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class BoilerService {
  private boilersUrl = 'assets/server/boiler.json';  // URL to web api

  constructor(private http: HttpClient) { }

  getBoilers(): Observable<Boiler[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Boiler[]>(this.boilersUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
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
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  getBoiler(id: number): Observable<Boiler> {
    const url = `${this.boilersUrl}/?id=${id}&n=1&size=4&name=哈哈`;

    return this.http.get<Boiler>(url);
    // return of(BOILERS.find(boiler => boiler.id === id));
  }

}
