import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-runtime-main',
  templateUrl: './runtime-main.component.html',
  styleUrls: ['./runtime-main.component.css']
})
export class RuntimeMainComponent implements OnInit, OnDestroy {

  public uid;
  public name;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.name = this.route.snapshot.paramMap.get('name');
    sessionStorage.setItem('runtimeUid', this.uid);
    sessionStorage.setItem('runtimeName', this.name);
  }


  goBack() {
    window.history.go(-1);
  }


  ngOnDestroy() {
    sessionStorage.removeItem('runtimeUid');
    sessionStorage.removeItem('runtimeName');
  }


}
