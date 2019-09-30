import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MaintainService} from "../../../../shared/maintain.service";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";
import {MaintainRecordEditSerComponent} from "../modals/maintain-record-edit-ser/maintain-record-edit-ser.component";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintain-record-list-ser',
  templateUrl: './maintain-record-list-ser.component.html',
  styleUrls: ['./maintain-record-list-ser.component.css']
})
export class MaintainRecordListSerComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'label';
  public value;
  public status;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private modalService: NgbModal,
              private nzModal: NzModalService,
              private maintainService: MaintainService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表
  getList() {
    /*this.dataLists = [
      {
        label: 'adsf223a',
        ept_name: 'aaaa'
      }
    ]*/

    this.loading = true;
    this.maintainService.getLogLists(this.page, this.pageSize, this.search, this.value, this.status)
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



  // 编辑
  editData(data) {
    let that = this;
    const modalRef = this.modalService.open(MaintainRecordEditSerComponent, {windowClass: 'modal_lg', centered: true});
    modalRef.componentInstance.uid = data.id;
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
      title = '确认要删除此记录吗？';
      // subtitle = '禁用后可到设置内恢复账号状态。';

      this.creatModal(title, subtitle, () => {
        this.checkBatch(checked);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择记录',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });

    }
  }


  creatModal(title, subtitle, call) {
    let that = this;
    this.tplModal = this.nzModal.create({
      nzTitle: '',
      nzContent: ComfirmComponent,
      nzComponentParams: {
        title: title,
        subtitle: subtitle
      },
      nzMaskClosable: true,
      nzClosable: false,
      nzClassName: 'comfirm_modal',
      nzWidth: 440,
      nzFooter: [
        {
          label: '取消',
          shape: 'default',
          onClick: () => that.tplModal.destroy()
        },
        {
          label: '确定',
          type: 'primary',
          onClick: () => {
            call();
            that.tplModal.destroy();
          }
        }
      ],
    });
  }

  // 发送批量操作请求
  checkBatch(checked) {
    let that = this;
    let post = {
      data: checked
    };
    this.maintainService.deleteLogData(post)
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
  }

}
