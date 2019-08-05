import { Component, OnInit } from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TerminalService} from "../../../../shared/terminal.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, ParamMap} from "@angular/router";

import Swal from 'sweetalert2';
import {ComfirmComponent} from "../../../directives/alert/comfirm/comfirm.component";
import {TerminalAddFormalComponent} from "../modals/terminal-add-formal/terminal-add-formal.component";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-terminal-list-formal',
  templateUrl: './terminal-list-formal.component.html',
  styleUrls: ['./terminal-list-formal.component.css']
})
export class TerminalListFormalComponent implements OnInit {
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

  constructor(private terminalService: TerminalService,
              private nzModal: NzModalService,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        // console.log('param', params.get('status'));
        this.page = parseInt(params.get('page'));
        if (!this.page) {
          this.page = 1;
        }
        this.getList();
        return (params.get('status') || []);
      })
    ).subscribe();

    // this.getList();
  }


  // 获取列表
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

  searchStatus(n?) {
    this.online = n;
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


  // 新增终端模态框
  addTerm() {
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
  }


  //  批量下发
  batchSend() {
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
      title = '确认要删除此终端吗？';
      // subtitle = '';

      this.creatModal(title, subtitle, () => {
        this.checkBatch(checked);
      });
    } else {
      title = '请选择终端设备';
      this.nzModal.info({
        nzTitle: '请选择终端设备',
        nzContent: '',
        nzOnOk: () => console.log('Info OK')
      });


      /*this.creatModal(title, subtitle, () => {

      });*/
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
    this.loading = true;
    this.terminalService.issued(post)
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
