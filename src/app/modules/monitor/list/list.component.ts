import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoilerService} from '../../../shared/boiler.service';
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

import { environment } from './../../../../environments/environment';

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
  checkValue = 0;
  socket: any;
  public isSpinning = false;
  public checkOnline: boolean;

  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    /*const message = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize
    };
    this.getBoilers(message);*/


    this.getBoilers();

    // this.getTest();

  }

  getBoilers(): void {
    /*const wsUrl = `wss://${window.location.host}/equipment_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          this.isSpinning = false;
          let equips = JSON.parse(data);
          // console.log(equips);
          this.totalItems = equips.counts;
          this.boilers = equips.ept;
          if (!this.boilers) {
            this.boilers = [];
          }
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
              bo.online = '未绑定';
              bo.isBurning = '未运行';
              bo.warning = '无告警';
              bo.malfunction = '无故障';
            }
          }
        },
        err => {console.log(err); },
        () => {
          console.log('ws结束');
          this.isSpinning = true;
        }
      );*/

    this.boilerService.getBoilerLists(this.page, this.pageSize, this.search, this.checkValue)
      .subscribe( data => {
        this.isSpinning = false;
        this.boilers = data.ept;
        this.totalItems = data.counts;
        if (!this.boilers) {
          this.boilers = [];
        }
        for (let i = 0; i < this.boilers.length; i++) {
          const bo = this.boilers[i];
          bo.isBurning = '未运行';
          bo.warning = '无告警';
          bo.malfunction = '无故障';

          if (bo.termStatus === 1) {
            bo.online = '终端在线';
            if (bo.eptStatus === true) {
              bo.isBurning = '运行中';
            }
            if (bo.alarmStatus === true) {
              bo.warning = '告警';
            }
            if (bo.mtStatus === true) {
              bo.malfunction = '故障';
            }
          } else if (bo.termStatus === 0) {
            bo.online = '终端离线';
          } else {
            bo.online = '未绑定';
            bo.isBurning = '未测定';
            bo.warning = '未测定';
            bo.malfunction = '未测定';
          }
        }

        // this.filList = this.boilers.filter(item => item.eptStatus.indexOf(this.search) !== -1);


      });

  }

  getTest() {
    this.boilerService.getBoilers(this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.boilers = data.params;
        this.totalItems = data.counts;
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
    // this.socket.unsubscribe();
    // this.boilerWsService.closeSocket();
    this.isSpinning = true;
    // this.getBoilers({page: this.page, pageSize: this.pageSize, search: this.search});
    this.getBoilers();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 状态筛选
  onlineChoose(online) {
    this.checkValue = online;
    this.page = 1;
    this.getBoilers();
  }

  trackByUid(index, item) {
    return item.uid;
  }

  ngOnDestroy() {

    /*this.socket.unsubscribe();
    this.boilerWsService.closeSocket();*/
  }

}
