import { Component, OnInit } from '@angular/core';
import {Boiler} from '../../../boiler';
import {BoilerService} from '../../../shared/boiler.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  boilers: any = [];
  page = 1;
  pageSize = 10;
  totalItems = 0;
  search: string;
  checkValue = 2;

  constructor(private boilerService: BoilerService) { }

  ngOnInit() {
    this.getBoilers();

  }

  getBoilers(): void {
    this.boilerService.getBoilers(this.page, 4, this.search)
      .subscribe( data => {
        this.boilers = data.params;
        this.totalItems = data.counts;
        for (let i = 0; i < this.boilers.length; i++) {
          let bo = this.boilers[i];

          if (bo.Online === true) {
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
          } else {
            bo.online = '终端离线';
            bo.isBurning = '设备未运行';
            bo.warning = '无告警';
            bo.malfunction = '无故障';
          }
        }
      });
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getBoilers();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }



}
