import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  private authSource = new Subject<any>();

  authStatus$ = this.authSource.asObservable();  // 子组件监测父组件authority值

  constructor(private http: HttpClient) { }

  // 从父组件获取authority值
  GetAuthority(message: any) {
    this.authSource.next(message);
  }



}
