import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-runtime-main',
  templateUrl: './runtime-main.component.html',
  styleUrls: ['./runtime-main.component.css']
})
export class RuntimeMainComponent implements OnInit, OnDestroy {
  public uid;
  public auth;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.auth = JSON.parse(localStorage.getItem('auth'));
    sessionStorage.setItem('runtimeUid', this.uid);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('runtimeUid');
  }

}
