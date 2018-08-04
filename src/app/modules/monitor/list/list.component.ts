import {Component, OnDestroy, OnInit} from '@angular/core';
import {Boiler} from '../../../boiler';
import {BoilerService} from '../../../shared/boiler.service';
import {BoilerSocketService} from "../../../shared/boiler-socket.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  boilers: any = [];
  page = 1;
  pageSize = 10;
  totalItems = 0;
  search: string;
  checkValue = 2;
  socket: any;

  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    let message = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize
    };
    this.getBoilers(message);
  }

  getBoilers(message): void {
    const wsUrl = `ws://${window.location.host}/equipment_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let equips = JSON.parse(data);
          // console.log(equips);
          this.totalItems = equips.counts;
          this.boilers = equips.ept;
          for (let i = 0; i < this.boilers.length; i++) {
            let bo = this.boilers[i];

            if (bo.termStatus === 1) {
              bo.online = '终端在线';
              if (bo.eptStatus === true) {
                bo.isBurning = '运行中';
              } else {
                bo.isBurning = '未运行';
              }
              if (bo.alarmStatus === true) {
                bo.warning = '有告警';
              } else {
                bo.warning = '无告警';
              }
              if (bo.Malfunction === true) {
                bo.malfunction = '有故障';
              } else {
                bo.malfunction = '无故障';
              }
            } else if (bo.termStatus === 0) {
              bo.online = '终端离线';
              bo.isBurning = '未运行';
              bo.warning = '无告警';
              bo.malfunction = '无故障';
            } else {
              bo.online = '终端未绑定';
              bo.isBurning = '未运行';
              bo.warning = '无告警';
              bo.malfunction = '无故障';
            }
          }
        },
        err => console.log(err),
        () => console.log('ws结束')
      );
    /*this.boilerService.getBoilers()
      .subscribe( data => {
        this.boilers = data.params;
        this.totalItems = data.counts;
        for (let i = 0; i < this.boilers.length; i++) {
          let bo = this.boilers[i];

          if (bo.termStatus === 1) {
            bo.online = '终端在线';
            if (bo.eptStatus === true) {
              bo.isBurning = '运行中';
            } else {
              bo.isBurning = '未运行';
            }
            if (bo.alarmStatus === true) {
              bo.warning = '有告警';
            } else {
              bo.warning = '无告警';
            }
            if (bo.Malfunction === true) {
              bo.malfunction = '有故障';
            } else {
              bo.malfunction = '无故障';
            }
          } else if (bo.termStatus === 0) {
            bo.online = '终端离线';
            bo.isBurning = '未运行';
            bo.warning = '无告警';
            bo.malfunction = '无故障';
          } else {
            bo.online = '终端未绑定';
            bo.isBurning = '未运行';
            bo.warning = '无告警';
            bo.malfunction = '无故障';
          }
        }
      });*/
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
    this.getBoilers({page: this.page, search: this.search, pageSize: this.pageSize});
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  ngOnDestroy() {
    console.log('page close');
    this.socket.unsubscribe();
    this.boilerWsService.closeSocket();
  }

}
