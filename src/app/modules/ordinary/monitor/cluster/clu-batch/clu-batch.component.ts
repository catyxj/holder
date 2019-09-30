import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute} from "@angular/router";
import {BoilerService} from "../../../../../shared/boiler.service";
import {ClusterService} from "../../../../../shared/cluster.service";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clu-batch',
  templateUrl: './clu-batch.component.html',
  styleUrls: ['./clu-batch.component.css']
})
export class CluBatchComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public status = '';
  public run = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  public roleId;

  constructor(private nzModal: NzModalService,
              private route: ActivatedRoute,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.clusterService.getBatchLists(this.page, this.pageSize, this.search, this.value, this.status)
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

  searchOnline(n?) {
    this.online = n;
    this.searchChange();
  }
  searchRun(n?) {
    this.run = n;
    this.searchChange();
  }
  searchStatus(n?) {
    this.status = n;
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

  //  批量禁用
  batchDisable() {
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
      title = '确认要禁用此集群吗？';
      this.creatModal(title, subtitle, () => {
        let post = {
          data: checked,
          type: 3
        };
        this.batch(post);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择集群',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });

    }
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
        checked.push(ac.uid);
      }
    }
    if (checked.length > 0) {
      title = '确认要删除此集群吗？';
      this.creatModal(title, subtitle, () => {
        let post;
        if (this.roleId === '10') {
          post = {
            data: checked,
            type: 1
          };
        } else {
          post = {
            data: checked
          };
        }
        this.batch(post);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择集群',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });

    }
  }

  //  批量激活
  batchAble() {
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
      title = '确认要激活集群吗？';
      this.creatModal(title, subtitle, () => {
        let post = {
          data: checked,
          type: 2
        };
        this.batch(post);
      });
    } else {
      this.nzModal.info({
        nzTitle: '请选择集群',
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

  // 批量操作
  batch(post) {
    let that = this;
    that.loading = true;
    that.clusterService.batchD(post)
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
          err.message || err,
          'error'
        );
      });
  }


  goBack() {
    window.history.go(-1);
  }

}
