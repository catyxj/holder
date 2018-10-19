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
        for (let i = 0; i < this.plcs.length; i++) {
          let plc = this.plcs[i];
          plc.num = i + 1;
          if (plc.ChannelNumber > 0 && plc.ChannelNumber <= 24 ) {
            plc.name = '模拟通道' + (plc.ChannelNumber);
          }
          if (plc.ChannelNumber > 24 && plc.ChannelNumber <= 72 ) {
            plc.name = '开关通道' + (plc.ChannelNumber - 24);
          }
          if (plc.ChannelNumber > 72 && plc.ChannelNumber <= 84 ) {
            plc.name = '状态通道' + (plc.ChannelNumber - 72);
          }
          if (plc.ChannelNumber === 85) {
            plc.name = '波特率';
          }
          if (plc.ChannelNumber === 86) {
            plc.name = '数据位';
          }
          if (plc.ChannelNumber === 87) {
            plc.name = '停止位';
          }
          if (plc.ChannelNumber === 88) {
            plc.name = '校验位';
          }
          if (plc.ChannelNumber === 89) {
            plc.name = '通讯接口类型';
          }
          if (plc.ChannelNumber === 90) {
            plc.name = '从机地址';
          }
          if (plc.ChannelNumber === 91 ) {
            plc.name = '心跳包频率';
          }
        }
      });
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    if (typeof(this.pageSize) !== 'number') {
      this.pageSize = parseInt(this.pageSize);
    }
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
