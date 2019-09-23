import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {InvoiceService} from "../../../../shared/invoice.service";

@Component({
  selector: 'app-invoice-list-fi',
  templateUrl: './invoice-list-fi.component.html',
  styleUrls: ['./invoice-list-fi.component.css']
})
export class InvoiceListFiComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'order_sn';
  public value;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private route: ActivatedRoute,
              private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.log('param', params.get('status'));
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('page') || []);
      })
    ).subscribe();
  }

  // 获取列表
  getList() {
    /*this.dataLists = [
      {
        order_sn: 'daf11111111',
        created_username: 'aaaa',
        created_org: 'aaaaa',
        pay_at: '2019-10-1',
        pay_money: 300,
        invoice_status: true
      }
    ];*/

    this.loading = true;
    this.invoiceService.getInvoiceList(this.page, this.pageSize, this.search, this.value)
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

}
