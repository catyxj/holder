import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {MaintainService} from '../../../../../../shared/maintain.service';
import {ActivatedRoute} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-ac-batch-add',
  templateUrl: './m-ac-batch-add.component.html',
  styleUrls: ['./m-ac-batch-add.component.css']
})
export class MAcBatchAddComponent implements OnInit {
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

  constructor(private nzModal: NzModalService,
              private maintainService: MaintainService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getList();
  }


  // 获取列表
  getList() {
    this.loading = true;
    this.maintainService.UserEptUnbindlist(this.uid, this.page, this.pageSize, this.search, this.value)
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
    const totalPage = Math.ceil(this.totalItems / this.pageSize);
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
      const ac = this.dataLists[i];
      if (!ac.checked) {
        this.isAllChecked = false;
        break;
      }
    }
  }




//  批量新增
  batchAdd() {
    const that = this;
    let title = '';
    let subtitle = '';

    let checked = [];
    if (!this.dataLists || this.dataLists.length <= 0 ) {
      this.dataLists = [];
    }
    for (let i = 0; i < this.dataLists.length; i++) {
      const ac = this.dataLists[i];
      if (ac.checked) {
        checked.push(ac.uid);
      }
    }
    if (checked.length > 0) {
      title = '确认要添加此产品吗？';
      this.creatModal(title, subtitle, () => {
        const post = {
          uid: this.uid,
          data: checked
        };
        this.maintainService.UserEptBind(post)
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
              err.message || err,
              'error'
            );
          });
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
    const that = this;
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


  goBack() {
    window.history.go(-1);
  }


}
