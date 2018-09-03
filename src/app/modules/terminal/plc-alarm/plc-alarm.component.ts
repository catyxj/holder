import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../shared/terminal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-plc-alarm',
  templateUrl: './plc-alarm.component.html',
  styleUrls: ['./plc-alarm.component.css']
})
export class PlcAlarmComponent implements OnInit {

  public plcs;
  public page = 1;
  public totalItems = 0;
  public pageSize = 10;
  public code;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    this.getPlcs();
  }

  getPlcs() {
    this.terminalService.getPlcAlarm(this.code, this.page, this.pageSize)
      .subscribe( data => {
        this.plcs = data.params;
        this.totalItems = data.counts;
      });
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getPlcs();
  }

  goBack() {
    window.history.go(-1);
  }


}
