import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeliveryService} from "../../../../../shared/delivery.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeliverySetComponent} from "../modals/delivery-set/delivery-set.component";

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css']
})
export class DeliveryInfoComponent implements OnInit {
  public uid;
  public basic;
  public products;
  public listPage;

  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private route: ActivatedRoute,
              private deliveryService: DeliveryService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.listPage = this.route.snapshot.paramMap.get('page');
    this.basic = {
      amount: 300,
      pay_account: 'asdfa@123.com'
    };

    this.getBasic();
    this.getList();
  }

  // 获取基础信息
  getBasic() {
    this.deliveryService.getDeliveryBasic(this.uid)
      .subscribe(data => {
        this.basic = data;
      }, err => {

      });
  }


  // 获取列表
  getList() {
    this.loading = true;
    this.deliveryService.getLists(this.page, this.pageSize, this.search, this.value)
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
    this.page = 1;
    this.pageChange();
  }
  searchEnter(event) {
    if (event.keyCode === 13) {
      this.searchChange();
    }
  }


  // 状态设置模态框
  statusSet() {
    let that = this;
    const modalRef = this.modalService.open(DeliverySetComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = this.basic;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.getBasic();
      }
    }, (reason) => {
      console.log(reason);
    });
  }



}
