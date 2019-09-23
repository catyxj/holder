import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-renewal-list-dir',
  templateUrl: './renewal-list-dir.component.html',
  styleUrls: ['./renewal-list-dir.component.css']
})
export class RenewalListDirComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public totalItems;
  public isSpinning = false;
  public pageSizeList = [15, 30, 50, 100];
  public checkTime = 0;

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getList();
  }


  getList() {
    this.dataLists = [
      {
        uid: '1',
        name: '物联网终端采购',
        age: 32,
        address: 'New York No. 1 Lake Park',
        status: 1
      },
      {
        uid: '2',
        name: '物联网终端采购',
        age: 42,
        address: 'London No. 1 Lake Park',
        status: 0
      }
    ];

    this.isSpinning = true;
    this.chargeService.getRenewalLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.isSpinning = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
      }, err => {
        this.isSpinning = false;
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
    this.getList();
  }

  // 页码跳转
  goPage() {
    let totalPage = Math.ceil(this.totalItems / this.pageSize);
    if (this.pageNum > totalPage) {
      return;
    }
    this.page = this.pageNum;
    this.pageChange();
  }

  // 搜索
  searchChange() {
    console.log(this.search);
    this.page = 1;
    this.pageChange();
  }
  searchEnter(event) {
    if (event.keyCode === 13) {
      this.searchChange();
    }
  }

  /*searchRoleId(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
  }*/

  selectTime(n) {
    this.checkTime = n;
    this.searchChange();
  }



}
