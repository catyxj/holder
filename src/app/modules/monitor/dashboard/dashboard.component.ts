import {Component, OnDestroy, OnInit} from '@angular/core';
import { BoilerService } from '../../../shared/boiler.service';
import {Observable} from "rxjs/index";
import {BoilerSocketService} from '../../../shared/boiler-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  boilers: any = [];
  boiler: any;
  page;
  pageSize = 4;
  totalItems;
  search: string;
  socket: any;
  checkValue = 2;


  constructor(private boilerService: BoilerService,
              private boilerWsService: BoilerSocketService) { }

  ngOnInit() {
    this.page = 1;
    this.totalItems = 0;
    let message = {
      page: this.page,
      search: this.search
    };
    this.getBoilers(message);
  }

  sendMessage(message) {
    this.boilerWsService.sendMessage(message);
  }


  getBoilers(message): void {

    const wsUrl = `ws://${window.location.host}/equipment_show`;
    this.socket = this.boilerWsService.creatSocket(wsUrl, message)
      .subscribe(
        data => {
          console.log(data);
          let boilers = JSON.parse(data);
          console.log(boilers);
        },
        err => console.log(err),
        () => console.log('ws结束')
      );

    /*this.boilerService.getBoilers(this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.boilers = data.params;
        this.totalItems = data.counts;
        this.refreshData();
      });*/
  }


  refreshData() {
    for (let i = 0; i < this.boilers.length; i++) {
      let bo = this.boilers[i];
      if (!bo.imageUrl) {
        bo.imgUrl = 'assets/images/no_image.png';
      }

      if (bo.TermStatus === 1) {
        bo.online = '终端在线';
        if (bo.IsBurning === true) {
          bo.isBurning = '设备运行中';
        } else {
          bo.isBurning = '设备未运行';
        }
        if (bo.Warning === true) {
          bo.warning = '有告警';
        } else {
          bo.warning = '无告警';
        }
        if (bo.Malfunction === true) {
          bo.malfunction = '有故障';
        } else {
          bo.malfunction = '无故障';
        }
      } else if (bo.TermStatus === 0) {
        bo.online = '终端离线';
        bo.isBurning = '设备未运行';
        bo.warning = '无告警';
        bo.malfunction = '无故障';
      } else {
        bo.online = '终端未绑定';
        bo.isBurning = '设备未运行';
        bo.warning = '无告警';
        bo.malfunction = '无故障';
      }
    }
  }


  // 页码变化
  pageChange(): void {
    this.sendMessage({page: this.page});
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.sendMessage({page: 1, search: this.search});
    this.pageChange();
  }


  ngOnDestroy() {
    // this.socket.unsubscribe();
    // this.boilerWsService.closeSocket();
  }


}
