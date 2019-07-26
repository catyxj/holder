import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../../shared/order.service";


@Component({
  selector: 'app-order-list-ad',
  templateUrl: './order-list-ad.component.html',
  styleUrls: ['./order-list-ad.component.css']
})
export class OrderListAdComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'uid';
  public value;
  public type;
  public status;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];


  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.dataLists = [
      {
        name: 'asdfas',
        amount: 500
      },
      {
        name: 'asdfas',
        amount: 10000
      }
    ];
    this.totalItems = 22;

    // this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.orderService.getLists(this.page, this.pageSize, this.status, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
      }, err => {
        this.loading = false;
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
    this.isAllChecked = false;
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

  searchStatus(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
  }



}
