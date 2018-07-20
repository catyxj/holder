import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class BoilerSocketService {

  ws: WebSocket;
  constructor() { }

  creatSocket(url: string, data: any): Observable<any> {
    this.ws = new WebSocket(url);
    /*this.ws.onopen = () => {
      this.sendMessage(data);
    };*/
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  sendMessage(message) {
    this.ws.send(message);
  }




}
