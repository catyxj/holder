import {Component, OnInit, TemplateRef} from '@angular/core';
import {AccountService} from "../../../../shared/account.service";

import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";

import Swal from 'sweetalert2';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AcBatchDisabledAdComponent} from "../modals/ac-batch-disabled-ad/ac-batch-disabled-ad.component";
import {AcBatchActiveAdComponent} from "../modals/ac-batch-active-ad/ac-batch-active-ad.component";



@Component({
  selector: 'app-ac-list-ad',
  templateUrl: './ac-list-ad.component.html',
  styleUrls: ['./ac-list-ad.component.css']
})
export class AcListAdComponent implements OnInit {
  public accountList = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'username';
  public value;
  public type;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;


  constructor(private accountService: AccountService,
              private nzModal: NzModalService,
              private modalService: NgbModal) { }

  ngOnInit() {
    /*this.accountList = [
      {
        uid: 'asdfasdf',
        username: 'asdfasf',
        org_name: 'asdfsafadddddddddddddddd'
      },
      {
        uid: 'asdfasdf',
        username: 'asdfasf'
      }
    ];
    this.totalItems = 30;*/

    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.accountService.getLists(this.page, this.pageSize, this.search, this.value, this.type)
      .subscribe(data => {
        this.loading = false;
        this.accountList = data.data;
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
    console.log(this.page);
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
    this.type = n;
    if (!n) {
      this.type = '';
    }
    this.searchChange();
  }


  // 全选
  checkAll(value: boolean): void {
    console.log(value);
    this.accountList.forEach(item => {
      item.checked = value;
      if (item.role_id === 1) {
        item.checked = false;
      }
    });
  }

  // 改变全选状态
  refreshStatus() {
    this.isAllChecked = true;
    for (let i = 0; i < this.accountList.length; i++) {
      let ac = this.accountList[i];
      if (ac.role_id === 1) {
        continue;
      }
      if (!ac.checked) {
        this.isAllChecked = false;
        break;
      }
    }
  }

  // 批量禁用激活
  batch(n) {
    let that = this;
    let title = '';
    let subtitle = '';

    let checked = [];
    if (!this.accountList || this.accountList.length <= 0 ) {
      this.accountList = [];
    }
    for (let i = 0; i < this.accountList.length; i++) {
      let ac = this.accountList[i];
      if (ac.checked) {
        checked.push(ac.uid);
      }
    }
    if (checked.length > 0) {
      if (n === 1) {
        title = '确认要恢复此账号吗？';
        subtitle = '';
        this.batchActive(checked);
      } else if (n === 0) {
        title = '确认要禁用此账号吗？';
        subtitle = '禁用后可到设置内恢复账号状态。';
        this.batchDisable(checked);
      }
      /*this.creatModal(title, subtitle, () => {
        this.checkBatch(n, checked);
      });*/
    } else {
      this.nzModal.info({
        nzTitle: '请选择账号',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });
      // title = '请选择账号';
      // this.creatModal(title, subtitle, () => {
      //
      // });
    }

    /*this.modalService.confirm({
      nzTitle: '<b class="confirm_modal_title">确认要禁用此账号吗？</b>',
      nzContent: '<div class="text-muted">禁用后可到设置内恢复账号状态。</div>',
      nzOnOk: () => {check(); }
    });*/

  }


  // 批量禁用模态框
  batchDisable(checked) {
    let that = this;
    const modalRef = this.modalService.open(AcBatchDisabledAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = checked;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  batchActive(checked) {
    let that = this;
    const modalRef = this.modalService.open(AcBatchActiveAdComponent, {windowClass: 'modal_md', centered: true});
    modalRef.componentInstance.currentData = checked;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        that.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
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
  checkBatch(n, checked) {
    let that = this;
    let post = {
      status: n,
      data: checked
    };
    this.loading = true;
    this.accountService.disableAccount(post)
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
  }


}
