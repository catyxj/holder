import { Component, OnInit } from '@angular/core';
import {MaintainService} from "../../../../../shared/maintain.service";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RuntimeMViewComponent} from "../modals/runtime-m-view/runtime-m-view.component";

@Component({
  selector: 'app-runtime-maintain',
  templateUrl: './runtime-maintain.component.html',
  styleUrls: ['./runtime-maintain.component.css']
})
export class RuntimeMaintainComponent implements OnInit {
  public uid;
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'id';
  public value;
  public status;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private maintainService: MaintainService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.maintainService.getLists(this.page, this.pageSize, this.search, this.value)
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

  searchRoleId(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
  }

  // 查看
  viewData(data) {
    let that = this;
    const modalRef = this.modalService.open(RuntimeMViewComponent, {windowClass: 'modal_lg', centered: true});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


}
