import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-template-add-main',
  templateUrl: './template-add-main.component.html',
  styleUrls: ['./template-add-main.component.css']
})
export class TemplateAddMainComponent implements OnInit {
  public current;
  public show;
  public uid;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.show = JSON.parse(localStorage.getItem('auth')).calculate;
    this.current = 0;

    // this.uid = '123';

  }

  changeCurrent(n) {
    if (n === 0) {
      this.current = 0;
      this.uid = '';
      return;
    }
    this.current = this.current + n;
  }

  changeUid(data) {
    this.uid = data;
  }

}
