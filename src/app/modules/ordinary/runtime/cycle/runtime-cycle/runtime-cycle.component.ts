import { Component, OnInit } from '@angular/core';
import {CycleAddComponent} from "../modals/cycle-add/cycle-add.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {RuntimeService} from "../../../../../shared/runtime.service";

import Swal from 'sweetalert2';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {CycleEditComponent} from "../modals/cycle-edit/cycle-edit.component";

@Component({
  selector: 'app-runtime-cycle',
  templateUrl: './runtime-cycle.component.html',
  styleUrls: ['./runtime-cycle.component.css']
})
export class RuntimeCycleComponent implements OnInit {
  public uid;
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private nzModal: NzModalService,
              private runtimeService: RuntimeService,
              private router: Router) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getList();
  }


  // 获取列表
  getList() {
    /*this.dataLists = [
      {
        name: 'aaa',
        status: 0.1
      }
    ];*/

    this.loading = true;
    this.runtimeService.getCompLists(this.uid, this.page, this.pageSize, this.search, this.value)
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
    const modalRef = this.modalService.open(CycleAddComponent, {windowClass: 'modal_md', centered: true});
    // modalRef.componentInstance.currentData = this.config;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  // 设置
  editData(data) {
    let that = this;
    const modalRef = this.modalService.open(CycleEditComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = data;
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }


  //  批量删除
  batchDelete() {
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
        checked.push(ac.id);
      }
    }
    if (checked.length > 0) {
      title = '确认要删除此组件吗？？';
      // subtitle = '禁用后可到设置内恢复账号状态。';

      this.creatModal(title, subtitle, () => {
        let that = this;
        let post = {
          data: checked
        };
        this.loading = true;
        this.runtimeService.deleteCompData(post)
          .subscribe(val => {
            that.loading = false;
            Swal(
              '操作成功！',
              '',
              'success'
            );
            this.pageChange();
          }, err => {
            that.loading = false;
            Swal(
              '操作失败！',
              err,
              'error'
            );
          });
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择组件',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });

    }
  }


  creatModal(title, subtitle, call) {
    const that = this;
    this.tplModal = this.nzModal.confirm({
      nzTitle: title,
      nzContent: subtitle,
      nzIconType: 'fill:question-circle',
      nzOnOk: () => {
        call();
        that.tplModal.destroy();
      }
    });
  }




}
