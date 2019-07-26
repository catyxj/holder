import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FlowService} from '../../../../shared/flow.service';
import {ComfirmComponent} from '../../../directives/alert/comfirm/comfirm.component';

import Swal from 'sweetalert2';
import {FlowBatchRechargeAdComponent} from '../modals/flow-batch-recharge-ad/flow-batch-recharge-ad.component';

@Component({
  selector: 'app-flow-list-ad',
  templateUrl: './flow-list-ad.component.html',
  styleUrls: ['./flow-list-ad.component.css']
})
export class FlowListAdComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'iccid';
  public searchLabel = '请输入完整ICCID';
  public value = '';
  public status = 1;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public amount;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private nzModal: NzModalService,
              private modalService: NgbModal,
              private flowService: FlowService) { }

  ngOnInit() {
    /*this.dataLists = [
      {
        iccid: 'asdfsa'
      }
    ];
*/
    this.getList();
    this.getAmount();
  }


  // 获取列表
  getList() {
    this.loading = true;
    this.flowService.getLists(this.page, this.pageSize, this.status, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;
      }, err => {
        this.loading = false;
      });
  }

  // 获取系统余额
  getAmount() {
    this.flowService.getAmount()
      .subscribe(data => {
        this.amount = data.amount;
      }, err => {

      });
  }


  searchSelect() {
    if (this.search === 'iccid') {
      this.searchLabel = '请输入完整ICCID';
    } else {
      this.searchLabel = '';
    }
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
      const ac = this.dataLists[i];
      if (!ac.checked) {
        this.isAllChecked = false;
        break;
      }
    }
  }

  // 批量充值模态框
  batchCharge() {
    const that = this;
    let title = '';
    const subtitle = '';

    const checked = [];
    if (!this.dataLists || this.dataLists.length <= 0 ) {
      this.dataLists = [];
    }
    for (let i = 0; i < this.dataLists.length; i++) {
      const ac = this.dataLists[i];
      if (ac.checked) {
        checked.push(ac.iccid);
      }
    }
    if (checked.length > 0) {
      const modalRef = this.modalService.open(FlowBatchRechargeAdComponent, {windowClass: 'modal_md', centered: true});
      modalRef.componentInstance.currentData = checked;
      // modalRef.componentInstance.uid = this.uid;
      modalRef.result.then((result) => {
        if (result === 'ok') {
          that.pageChange();
        }
      }, (reason) => {
        console.log(reason);
      });
    } else {

      this.nzModal.info({
        nzTitle: '请选择流量卡',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });
    }

  }

  //  批量停用
  batchDelete(n) {
    const that = this;
    let title = '';
    const subtitle = '';

    const checked = [];
    if (!this.dataLists || this.dataLists.length <= 0 ) {
      this.dataLists = [];
    }
    for (let i = 0; i < this.dataLists.length; i++) {
      const ac = this.dataLists[i];
      if (ac.checked) {
        checked.push(ac.iccid);
      }
    }
    if (checked.length > 0) {
      if (n === 2) {
        title = '确认要停用此流量卡吗？';
      } else {
        title = '确认要启用此流量卡吗？';
      }
      // subtitle = '禁用后可到设置内恢复账号状态。';

      this.creatModal(title, subtitle, () => {
        this.checkBatch(n, checked);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择流量卡',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });
    }
  }


  creatModal(title, subtitle, call) {
    const that = this;
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
    const that = this;
    const post = {
      status: n,
      iccid: checked
    };
    this.loading = true;
    this.flowService.deleteData(post)
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
          err.message || err,
          '',
          'error'
        );
      });
  }

}
