import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-runtime-main',
  templateUrl: './runtime-main.component.html',
  styleUrls: ['./runtime-main.component.css']
})
export class RuntimeMainComponent implements OnInit {

  public uid;
  public name;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.name = this.route.snapshot.paramMap.get('name');
    sessionStorage.setItem('runtimeUid', this.uid);
  }


  goBack() {
    window.history.go(-1);
  }




}
