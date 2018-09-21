import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {TerminalService} from '../../../shared/terminal.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public messages;
  public code;
  public updateDate;
  public temperCols = [];
  public analogCols = [];
  public switchCols = [];
  public calcCols = [];
  public isSpinning = false;

  constructor(private terminalService: TerminalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initCol();
    this.isSpinning = true;
    this.getMessage();
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

  // 获取消息调试信息
  getMessage() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.code = params.get('code');
        return this.terminalService.getMessage(params.get('code'));
      })
    ).subscribe( mess => {
      this.isSpinning = false;
      this.messages = mess;
      this.updateDate = this.messages[0].TS;
    }, err => {
      this.isSpinning = false;
    });
  }

  goBack() {
    window.history.go(-1);
  }

  trackByUid(index, item) {
    return item.Id;
  }


}
