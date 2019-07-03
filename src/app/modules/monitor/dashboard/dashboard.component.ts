import {Component, OnDestroy, OnInit} from '@angular/core';
import { BoilerService } from '../../../shared/boiler.service';
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  boilers: any = [];
  boiler: any;
  page = 1;
  pageSize = 4;
  totalItems;
  search: string;
  socket: any;
  checkValue = 2;


  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    if (sessionStorage.getItem('pageNum')) {
      this.page = parseInt(sessionStorage.getItem('pageNum'));
    }
    this.totalItems = 0;
    let message = {
      page: this.page,
      search: this.search,
      pageSize: this.pageSize
    };
    this.getBoilers(message);
  }

  sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }


  getBoilers(message): void {
    console.log(message);
    /*const wsUrl = `wss://${window.location.host}/equipment_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          let equips = JSON.parse(data);
          // console.log(equips);
          this.totalItems = equips.counts;
          this.boilers = equips.ept;
          if (!this.boilers) {
            this.boilers = [];
          }
          this.refreshData();
        },
        err => console.log(err),
        () => console.log('ws结束')
      );*/

    this.boilerService.getBoilers(this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.boilers = data.params;
        this.totalItems = data.counts;
        this.refreshData();
      });
  }


  refreshData() {
    for (let i = 0; i < this.boilers.length; i++) {
      let bo = this.boilers[i];
      if (!bo.img) {
        bo.img = 'assets/images/no_image.png';
      }

      bo.isBurning = '未运行';
      bo.warning = '无告警';
      bo.malfunction = '无故障';
      if (bo.termStatus === 1) {
        bo.online = '终端在线';
        if (bo.eptStatus === true) {
          bo.isBurning = '运行';
        }
        if (bo.alarmStatus === true) {
          bo.warning = '告警';
        }
        if (bo.mtStatus === true) {
          bo.malfunction = '故障';
        }
      } else if (bo.termStatus === 0) {
        bo.online = '终端离线';
        bo.isBurning = '未知';
        bo.warning = '未知';
        bo.malfunction = '未知';
      } else {
        bo.online = '未绑定';
        bo.isBurning = '未知';
        bo.warning = '未知';
        bo.malfunction = '未知';
      }
    }
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

  // 运行状态
  checkStatus(value) {
    this.checkValue = value;
    this.searchChange();
  }


  trackByUid(index, item) {
    return item.uid;
  }

  /*goRuntime(data) {
    sessionStorage.setItem('equipName', data.name);
  }*/


  ngOnDestroy() {
    // console.log('page close');

    // this.socket.unsubscribe();
    // this.boilerWsService.closeSocket();
  }


}
