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
export class AdressService {
  public address;

  constructor(private http: HttpClient) { }

  getAddress(): Observable<any> {
    return this.http.get('assets/server/location_list.json');
    // return this.http.get('/location_list')
    //   .pipe(
    //     catchError(this.handleError) // then handle the error
    //   );
  }

  getMapStyle() {
    return this.http.get('assets/server/map_config.json');
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
