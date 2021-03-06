import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs/index';
import { map } from 'rxjs/operators';
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class BoilerSocketService {

  ws: WebSocket;
  constructor() { }

  creatSocket(url: string, data: any): Observable<any> {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => {
      this.sendMessage(data);
    };
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () => this.ws.close();
      }
    ).pipe(
      // map(message => JSON.parse(message))
      catchError(this.handleError)
    );
  }

  closeSocket() {
    this.ws.close();
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  retrieveData() {
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
      }
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
