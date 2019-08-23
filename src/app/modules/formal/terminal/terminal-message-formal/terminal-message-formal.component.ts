import { Component, OnInit } from '@angular/core';
import {TerminalService} from "../../../../shared/terminal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-terminal-message-formal',
  templateUrl: './terminal-message-formal.component.html',
  styleUrls: ['./terminal-message-formal.component.css']
})
export class TerminalMessageFormalComponent implements OnInit {
  public uid;
  public code;
  public dataLists = [];
  public totalItems;
  public loading;
  public updateDate;
  public temperCols = [];
  public switchCols = [];
  public calcCols = [];

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.code = this.route.snapshot.paramMap.get('code');
    this.initCol();
    this.getList();
  }

  initCol() {

    for (let i = 1; i <= 24; i++) {
      this.temperCols.push('temper_' + i + '_channel');
    }

    for (let i = 1; i <= 12; i++) {
      this.calcCols.push('calculate_' + i + '_param');
    }

    this.switchCols = [
      'switch_1_16_channel_bit', 'switch_17_32_channel_bit', 'switch_33_48_channel_bit'
    ];

    /*for (let i = 1; i <= 3; i++) {
      this.switchCols.push('Switch_' + i + '_channel');
    }*/
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.terminalService.getMessage(this.uid)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data;
        this.updateDate = new Date();
      }, err => {
        this.loading = false;
      });
  }


  goBack() {
    window.history.go(-1);
  }

  trackByUid(index, item) {
    return item.Id;
  }
}
