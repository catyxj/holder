import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TemplateService} from "../../../../shared/template.service";
import {ActivatedRoute} from "@angular/router";

import Swal from 'sweetalert2';
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";
import {TerminalService} from "../../../../shared/terminal.service";

@Component({
  selector: 'app-template-batch-allocate',
  templateUrl: './template-batch-allocate.component.html',
  styleUrls: ['./template-batch-allocate.component.css']
})
export class TemplateBatchAllocateComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'terminal_code';
  public value;
  public status = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  public templateList = [];
  public selectedTemplate;

  constructor(private templateService: TemplateService,
              private terminalService: TerminalService,
              private nzModal: NzModalService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getList();
    this.getTemplates();
  }

  // 获取模板下拉列表
  getTemplates() {
    this.templateService.getTemplateAll()
      .subscribe(data => {
          this.templateList = data;
      });
  }

  // 获取终端列表
  getList() {
    this.loading = true;
    this.terminalService.getLists(this.page, this.pageSize, this.status, this.search, this.value, this.online)
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


  //  批量分配
  batchAllocate() {
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
      title = '确认要下发此模板吗？';
      // subtitle = '';

      this.creatModal(title, subtitle, () => {
        this.checkBatch(checked);
      });
    } else {
      title = '请选择模板';
      this.nzModal.info({
        nzTitle: '请选择模板',
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

  // 发送批量操作请求
  checkBatch(checked) {
    let that = this;
    let post = {
      uid: this.selectedTemplate,
      data: checked
    };
    this.loading = true;
    this.templateService.batchSet(post)
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
          err.message,
          '',
          'error'
        );
      });
  }

  goBack() {
    window.history.go(-1);
  }

}
