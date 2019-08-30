import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute} from "@angular/router";
import {ClusterService} from "../../../../../../shared/cluster.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clu-ept-add',
  templateUrl: './clu-ept-add.component.html',
  styleUrls: ['./clu-ept-add.component.css']
})
export class CluEptAddComponent implements OnInit {
  public uid;
  public dataAll = [];
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

  constructor(private nzModal: NzModalService,
              private route: ActivatedRoute,
              private clusterService: ClusterService) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.clusterService.getLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.dataAll = this.dataLists.slice();
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
    /*console.log(this.search);
    this.page = 1;
    this.pageChange();*/
    if (!this.value) {
      this.dataLists = this.dataAll.slice();
    } else {
      this.dataLists = this.dataAll.filter(data => data[this.search].indexOf(this.value) !== -1 );
    }
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

  //  批量关联
  batchLink() {
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
      title = '确认要关联此设备吗？';
      this.creatModal(title, subtitle, () => {
        let post = {
          data: checked
        };
        that.loading = true;
        that.clusterService.eptLink(post)
          .subscribe(val => {
            that.loading = false;
            Swal(
              '操作成功！',
              '',
              'success'
            );
            this.getList();
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
        nzTitle: '请选择设备',
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


  goBack() {
    window.history.go(-1);
  }

}
