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
  public dataLists = [];
  public totalItems;
  public loading;
  public updateDate;
  public temperCols = [];
  public analogCols = [];
  public switchCols = [];
  public calcCols = [];

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.initCol();
    this.getList();
  }

  initCol() {
    for (let i = 1; i <= 12; i++) {
      this.temperCols.push('Temper' + i + '_channel');
      this.analogCols.push('Analog' + i + '_channel');
      this.calcCols.push('C' + i + '_calculate_parm');
    }

    for (let i = 1; i <= 3; i++) {
      this.switchCols.push('Switch_' + i + '_channel');
    }
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.terminalService.getMessage(this.uid)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
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
