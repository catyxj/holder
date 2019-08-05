import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ServiceService} from "../../../../shared/service.service";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";

import Swal from 'sweetalert2';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-service-list-formal',
  templateUrl: './service-list-formal.component.html',
  styleUrls: ['./service-list-formal.component.css']
})
export class ServiceListFormalComponent implements OnInit {
  public serviceList = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'uid';
  public value;
  public type;
  public status;
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  constructor(private serviceService: ServiceService,
              private nzModal: NzModalService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('page') || []);
      })
    ).subscribe();

    // this.getList();
  }


  // 获取列表
  getList() {
    /*this.serviceList = [
      {
        username: 'asdfasf',
        org_name: 'asdfsafadddddddddddddddd',
        status: 1
      },
      {
        username: 'asdfasf',
        status: 2
      }
    ];
    this.totalItems = 20;*/


    this.loading = true;
    this.serviceService.getListsF(this.page, this.pageSize, this.search, this.value, this.type, this.status)
      .subscribe(data => {
        this.loading = false;
        this.serviceList = data.data;
        this.totalItems = data.count;
        if (!this.serviceList) {
          this.serviceList = [];
          this.totalItems = 0;
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

  searchType(n?) {
    this.type = n;
    this.searchChange();
  }

  searchStatus(n?) {
    this.status = n;
    this.searchChange();
  }

  // 全选
  checkAll(value: boolean): void {
    console.log(value);
    this.serviceList.forEach(item => {
      item.checked = value;
    });
  }

  // 改变全选状态
  refreshStatus() {
    this.isAllChecked = true;
    for (let i = 0; i < this.serviceList.length; i++) {
      let ac = this.serviceList[i];
      if (!ac.checked) {
        this.isAllChecked = false;
        break;
      }
    }
  }

  // 批量关闭
  batchClose() {
    let that = this;
    let title = '';
    let subtitle = '';

    let checked = [];
    if (!this.serviceList || this.serviceList.length <= 0 ) {
      this.serviceList = [];
    }
    for (let i = 0; i < this.serviceList.length; i++) {
      let ac = this.serviceList[i];
      if (ac.checked) {
        checked.push(ac.uid);
      }
    }
    if (checked.length > 0) {
      title = '确认要关闭此表单吗？';
      subtitle = '';
      this.creatModal(title, subtitle,  () => {
        this.checkBatch(checked);
      });
    } else {
      title = '请选择表单';
      this.nzModal.info({
        nzTitle: '请选择表单',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });
    }

    /*this.modalService.confirm({
      nzTitle: '<b class="confirm_modal_title">确认要禁用此账号吗？</b>',
      nzContent: '<div class="text-muted">禁用后可到设置内恢复账号状态。</div>',
      nzOnOk: () => {check(); }
    });*/

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
          onClick: () => this.tplModal.destroy()
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
    this.loading = true;
    this.serviceService.closeDataF(post)
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
