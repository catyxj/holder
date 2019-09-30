import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";
import {NzModalService} from "ng-zorro-antd/modal";


@Component({
  selector: 'app-invoice-list-dir',
  templateUrl: './invoice-list-dir.component.html',
  styleUrls: ['./invoice-list-dir.component.css']
})
export class InvoiceListDirComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public totalItems;
  public isSpinning = false;
  public pageSizeList = [15, 30, 50, 100];
  public isAllChecked = false;
  public totalAmount = 0;
  public isVisible = false;

  constructor(private chargeService: ChargeService,
              private nzModal: NzModalService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表
  getList() {
    /*this.dataLists = [
      {
        order_sn: '11',
        item_name: '物联网终端采购',
        age: 32,
        pay_money: 800,
        address: 'New York No. 1 Lake Park',
        status: 1
      },
      {
        order_sn: '12',
        item_name: '物联网终端采购',
        age: 32,
        pay_money: 800,
        address: 'New York No. 1 Lake Park',
        status: 1
      }
    ];*/

    this.isSpinning = true;
    this.chargeService.getInvoiceLists(this.page, this.pageSize, this.search, this.value)
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

  /*searchRoleId(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
  }*/

  // 全选
  checkAll(value: boolean): void {
    // console.log(value);
    this.totalAmount = 0;
    this.dataLists.forEach(item => {
      item.checked = value;
      if (value) {
        this.totalAmount += item.pay_money;
      }
    });
  }

  // 改变全选状态
  refreshStatus() {
    this.isAllChecked = true;
    this.totalAmount = 0;
    for (let i = 0; i < this.dataLists.length; i++) {
      let ac = this.dataLists[i];
      if (!ac.checked) {
        this.isAllChecked = false;
      }
      if (ac.checked) {
        this.totalAmount += ac.pay_money;
      }
    }
  }

  addInvoice(data) {
    /*if (!this.totalAmount) {
      this.nzModal.info({
        nzTitle: '请选择需要开票的订单',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });
      return;
    }*/
    // this.isVisible = true;

    /*let checked = [];
    if (!this.dataLists || this.dataLists.length <= 0 ) {
      this.dataLists = [];
    }
    for (let i = 0; i < this.dataLists.length; i++) {
      let ac = this.dataLists[i];
      if (ac.checked) {
        checked.push(ac.order_sn);
      }
    }*/
    // let sn = JSON.stringify(checked);
    window.open(`./#/dir/charge/invoice/info/${data.pay_money}/${data.order_sn}`);
  }

  handleOk(): void {
    this.isVisible = false;
    console.log('refresh');
    this.pageChange();
  }

  handleCancel(): void {
    this.isVisible = false;
    console.log('refresh');
    this.pageChange();
  }



}
