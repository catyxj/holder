import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../shared/maintain.service";
import {MaintainProdAddSerComponent} from "../modals/maintain-prod-add-ser/maintain-prod-add-ser.component";

@Component({
  selector: 'app-maintain-prod-list-ser',
  templateUrl: './maintain-prod-list-ser.component.html',
  styleUrls: ['./maintain-prod-list-ser.component.css']
})
export class MaintainProdListSerComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private modalService: NgbModal,
              private maintainService: MaintainService) { }

  ngOnInit() {
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

// 新增维保
  addData() {
    let that = this;
    const modalRef = this.modalService.open(MaintainProdAddSerComponent, {windowClass: 'modal_lg', centered: true});
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


}
