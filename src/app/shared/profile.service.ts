import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Ida'
  })
};

const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type':  'application/octet-stream',
    'Authorization': 'Ida'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  /*getProfile(): Observable<any> {

  }*/

  changePassword(password): Observable <any> {
    return this.http.post<any>('/user_password_update/', password, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateImg(img): Observable <any> {
    return this.http.post<any>('/upload_img/', img, httpOptions1)
      .pipe(
        catchError(this.handleError)
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
