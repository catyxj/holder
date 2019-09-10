import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {switchMap} from "rxjs/internal/operators";
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";
import {TemplateService} from "../../../../shared/template.service";

import Swal from 'sweetalert2';
import {TerminalService} from "../../../../shared/terminal.service";


@Component({
  selector: 'app-template-list-formal',
  templateUrl: './template-list-formal.component.html',
  styleUrls: ['./template-list-formal.component.css']
})
export class TemplateListFormalComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'name';
  public value;
  public status = '';
  public online = '';
  public totalItems;
  public isAllChecked = false;
  public loading;
  public pageSizeList = [15, 30, 50, 100];
  tplModal: NzModalRef;

  private heartbeatList = [];

  constructor(private templateService: TemplateService,
              private terminalService: TerminalService,
              private nzModal: NzModalService,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getCmtList();
        return (params.get('status') || []);
      })
    ).subscribe();
  }


  // 获取通信参数下拉列表
  getCmtList() {
    this.terminalService.getCmtParam()
      .subscribe(data => {
        this.heartbeatList = data.heart_beat;  // 心跳包频率

        this.getList();
      });
  }

  // 获取列表
  getList() {
    /*this.dataLists = [
      {
        uid: 'adsfafsd',
        name: 'asdfassfd'
      }
    ];
    this.totalItems = 12;*/

    this.loading = true;
    this.templateService.getLists(this.page, this.pageSize, this.search, this.value)
      .subscribe(data => {
        this.loading = false;
        this.dataLists = data.data;
        this.totalItems = data.count;

        for (let i = 0; i < this.dataLists.length; i++) {
          let da = this.dataLists[i];
          // 心跳包频率
          for (let j = 0; j < this.heartbeatList.length; j++) {
            if (da.heart_beat === this.heartbeatList[j].value) {
              da.heart_beat = this.heartbeatList[j].name;
              break;
            }
          }
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

/*  searchOnline(n?) {
    this.online = n;
    this.searchChange();
  }
  searchStatus(n?) {
    this.status = n;
    this.searchChange();
  }*/


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
 /* addTerm() {
    let that = this;
    const modalRef = this.modalService.open(TerminalAddFormalComponent, {windowClass: 'modal_md', centered: true});
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


  //  批量下发
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
      title = '确认要删除此模板吗？';
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


      /*this.creatModal(title, subtitle, () => {

      });*/
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
      data: checked
    };
    this.loading = true;
    this.templateService.deleteData(post)
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

}
