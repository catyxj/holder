import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class BoilerSocketService {

  ws: WebSocket;
  constructor() { }

  creatSocket(url: string, data: any): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        this.ws.onopen = (event) => {
          this.sendMessage(data);
        };
      }
    ).map(message => JSON.parse(message));
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }




}
