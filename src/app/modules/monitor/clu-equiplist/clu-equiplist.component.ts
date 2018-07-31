import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clu-equiplist',
  templateUrl: './clu-equiplist.component.html',
  styleUrls: ['./clu-equiplist.component.css']
})
export class CluEquiplistComponent implements OnInit {

  equips: any = [];
  page = 1;
  totalItems = 0;
  pageSize = 10;
  search: string;

  constructor() { }

  ngOnInit() {
    this.getClusterEquip();
  }

  getClusterEquip() {
    this.equips = [
      {
        Name: 'ad1da',
        Online: true,
        IsBurning: false,
        Warning: false,
        Malfunction: false
      }
    ];
    this.totalItems = 2;
    for (let i = 0; i < this.equips.length; i++) {
      let eq = this.equips[i];

      if (eq.Online === true) {
        eq.online = '终端在线';
        if (eq.IsBurning === true) {
          eq.isBurning = '设备运行中';
        } else {
          eq.isBurning = '设备未运行';
        }
        if (eq.Warning === true) {
          eq.warning = '有告警';
        } else {
          eq.warning = '无告警';
        }
        if (eq.Malfunction === true) {
          eq.malfunction = '有故障';
        } else {
          eq.malfunction = '无故障';
        }
      } else {
        eq.online = '终端离线';
        eq.isBurning = '设备未运行';
        eq.warning = '无告警';
        eq.malfunction = '无故障';
      }
    }
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getClusterEquip();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


}
