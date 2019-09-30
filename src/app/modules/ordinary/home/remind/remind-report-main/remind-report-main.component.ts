import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-remind-report-main',
  templateUrl: './remind-report-main.component.html',
  styleUrls: ['./remind-report-main.component.css']
})
export class RemindReportMainComponent implements OnInit {
  public type;
  public uid;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.type = this.route.snapshot.paramMap.get('type');
  }

}
