import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-runtime-main',
  templateUrl: './runtime-main.component.html',
  styleUrls: ['./runtime-main.component.css']
})
export class RuntimeMainComponent implements OnInit, OnDestroy {
  public uid;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    sessionStorage.setItem('runtimeUid', this.uid);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('runtimeUid');
  }

}
