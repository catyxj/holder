import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../shared/account.service";
import {ActivatedRoute} from "@angular/router";
import {ChargeService} from "../../../../shared/charge.service";

@Component({
  selector: 'app-account-operate-formal',
  templateUrl: './account-operate-formal.component.html',
  styleUrls: ['./account-operate-formal.component.css']
})
export class AccountOperateFormalComponent implements OnInit {
  public uid;
  public name;
  public operateList = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'order_sn';
  public value;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private chargeService: ChargeService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');

    this.getList();
  }

  // 获取列表
  getList() {
    /*this.operateList = [
      {
        uid: 'asdfa',
        name: 'asdfa',
        status: 1,
        amount: 222
      },
      {
        uid: 'dsa2adf',
        name: 'sdwwrf',
        status: 2,
        amount: 111
      }
    ];*/

    this.loading = true;
    this.chargeService.getOrderLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.operateList = data.data;
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
    this.page = 1;
    this.pageChange();
  }

  goBack() {
    window.history.go(-1);
  }

}
