import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../../shared/maintain.service";
import {ActivatedRoute} from "@angular/router";

import Swal from 'sweetalert2';


@Component({
  selector: 'app-m-account-product-f',
  templateUrl: './m-account-product-f.component.html',
  styleUrls: ['./m-account-product-f.component.css']
})
export class MAccountProductFComponent implements OnInit {
  public uid;

  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'terminal_code';
  public value;
  public status;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private nzModal: NzModalService,
              private maintainService: MaintainService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.maintainService.getUserMtDetail(this.uid, this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
        if (!this.dataLists) {
          this.dataLists = [];
        }
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

  searchRoleId(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
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



  // 新增
  /*addData() {
    let that = this;
    const modalRef = this.modalService.open(MAccountAddFComponent, {windowClass: 'modal_m', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    // modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }*/

//  批量删除
  /*batchDelete() {
    let that = this;
    let title = '';
    let subtitle = '';

    let checked = [];
    if (!this.dataLists || this.dataLists.length <= 0 ) {
      this.dataLists = [];
    }
    for (let i = 0; i < this.dataLists.length; i++) {
      let ac = this.dataLists[i];
      if (ac.checked) {
        checked.push(ac.uid);
      }
    }
    if (checked.length > 0) {
      title = '确认要删除此账号吗？';
      // subtitle = '禁用后可到设置内恢复账号状态。';

      this.creatModal(title, subtitle, () => {
        this.checkBatch(checked);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择账号',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });

    }
  }


  creatModal(title, subtitle, call) {
    let that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: '',
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }

  // 发送批量操作请求
  checkBatch(checked) {
    let that = this;
    let post = {
      data: checked
    };
    this.maintainService.deleteData(post)
      .subscribe(val => {
        Swal(
          '操作成功！',
          '',
          'success'
        );
        this.pageChange();
      }, err => {
        Swal(
          '操作失败！',
          err,
          'error'
        );
      });
  }*/


  goBack() {
    window.history.go(-1);
  }

}