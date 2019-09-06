import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notice-report-main',
  templateUrl: './notice-report-main.component.html',
  styleUrls: ['./notice-report-main.component.css']
})
export class NoticeReportMainComponent implements OnInit {
  public type;
  public status;
  public uid;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.type = this.route.snapshot.paramMap.get('type');
    this.status = this.route.snapshot.paramMap.get('status');
  }

}
