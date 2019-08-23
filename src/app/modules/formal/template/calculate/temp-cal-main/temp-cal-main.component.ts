import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-temp-cal-main',
  templateUrl: './temp-cal-main.component.html',
  styleUrls: ['./temp-cal-main.component.css']
})
export class TempCalMainComponent implements OnInit {
  public uid;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
  }

  goBack() {
    window.history.go(-1);
  }

}
