import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {MaintainService} from "../../../../../shared/maintain.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {MTemplateAddFComponent} from "../modals/m-template-add-f/m-template-add-f.component";
import {MTemplateEditFComponent} from "../modals/m-template-edit-f/m-template-edit-f.component";

@Component({
  selector: 'app-m-template-list-formal',
  templateUrl: './m-template-list-formal.component.html',
  styleUrls: ['./m-template-list-formal.component.css']
})
export class MTemplateListFormalComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'label';
  public value;
  public status = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private maintainService: MaintainService,
              private nzModal: NzModalService,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('status') || []);
      })
    ).subscribe();
  }


  // 获取列表
  getList() {
    this.dataLists = [
      {
        uid: 'adsfafsd',
        name: 'asdfassfd'
      }
    ];
    this.totalItems = 12;

    this.loading = true;
    this.maintainService.getTempLists(this.page, this.pageSize, this.search, this.value)
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



  // 全选
  checkAll(value: boolean): void {
    // console.log(value);
    this.dataLists.forEach(item => {
      item.checked = value;
    });
  }

  // 改变全选状态
  refreshStatus() {
    this.isAllChecked = true;
    for (let i = 0; i < this.dataLists.length; i++) {
      let ac = this.dataLists[i];
      if (!ac.checked) {
        this.isAllChecked = false;
        break;
      }
    }
  }


  // 新增模态框
   addData() {
     let that = this;
     const modalRef = this.modalService.open(MTemplateAddFComponent, {windowClass: 'modal_l', centered: true});
     // modalRef.componentInstance.currentData = this.config;
     // modalRef.componentInstance.uid = this.uid;
     modalRef.result.then((result) => {
       if (result === 'ok') {
         that.pageChange();
       }
     }, (reason) => {
       console.log(reason);
     });
   }


// 设置模态框
  editData(data) {
    let that = this;
    const modalRef = this.modalService.open(MTemplateEditFComponent, {windowClass: 'modal_l', centered: true});
    modalRef.componentInstance.currentData = data;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
