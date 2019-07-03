import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../../../shared/terminal.service';
import {AddTerminalComponent} from '../add-terminal/add-terminal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupConfigComponent} from '../group-config/group-config.component';
import {EditTerminalComponent} from '../edit-terminal/edit-terminal.component';
import {GroupAddComponent} from '../group-add/group-add.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.css']
})
export class TerminalListComponent implements OnInit {

  public terminals = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public status = 0;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public user;
  public isLoading1 = false;
  public isLoading2 = false;

  constructor(private terminalService: TerminalService,
              private modalService: NgbModal) { }

  ngOnInit() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getTerminals();
  }

  // 获取终端列表
  getTerminals(): void {
    this.isSpinning = true;
    this.terminalService.getTerminals(this.page, this.pageSize, this.status, this.search)
      .subscribe(terminals => {
        this.isSpinning = false;
        this.totalItems = terminals.counts;
        this.terminals = terminals.params;
        if (!this.terminals || this.terminals.length <= 0) {
          return;
        }
        for (let i = 0; i < this.terminals.length; i++) {
          let terminal = this.terminals[i];
          if ( terminal.IsOnline === 1) {
            terminal.isOnline = '在线';
          } else {
            terminal.isOnline = '离线';
          }

          terminal.checkDelete = false;
        }

      }, err => {
        this.isSpinning = false;
      });
  }


  // 批量选择
  checkDel(terminal): void {
    if ( terminal.checkDelete === true) {
      this.deleteList.push(terminal.Sn.toString());
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === terminal.Sn.toString()) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.terminals.length; i++) {
        this.terminals[i].checkDelete = true;
        this.deleteList.push(this.terminals[i].Sn.toString());
      }
    } else {
      for (let i = 0; i < this.terminals.length; i++) {
        this.terminals[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中终端 ？`);
    if (cf === true) {
      this.isLoading1 = true;
      this.terminalService.deleteTerminal(this.deleteList)
        .subscribe(() => {
          this.isLoading1 = false;
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading1 = false;
          Swal(
            '删除失败！',
            err,
            'error'
          );
        });

    } else {

    }

    // console.log(this.deleteList);
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
    this.getTerminals();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 状态筛选
  filterData(n) {
    this.status = n;
    this.pageChange();
  }

  trackByUid(index, item) {
    return item.Uid;
  }

// 添加终端模态框
  newTerminal() {
    const modalRef = this.modalService.open(AddTerminalComponent, { size: 'lg' });
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.getTerminals();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 关联终端模态框
  editTerminal(ter) {
    const modalRef = this.modalService.open(EditTerminalComponent, { size: 'lg' });
    modalRef.componentInstance.currentData = ter;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.getTerminals();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 批量配置模态框
  groupConfig() {
    if (this.deleteList.length <= 0) {
      Swal(
        '未选择任何终端,请先选择终端',
        '',
        'warning'
      );
      return;
    }
    const modalRef = this.modalService.open(GroupConfigComponent);
    modalRef.componentInstance.checkList = this.deleteList;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 批量添加模态框
  groupAdd() {
    const modalRef = this.modalService.open(GroupAddComponent, { size: 'lg' , backdropClass: 'modal_backdrop', windowClass: 'dark_modal'});
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

  // 批量下发
  groupIssued() {
    const cf = confirm(`确认批量下发 ？`);
    if (cf === true) {
      this.isLoading2 = true;
      this.terminalService.groupIssued(this.deleteList)
        .subscribe(() => {
          this.isLoading2 = false;
          Swal(
            '发送成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading2 = false;
          Swal(
            '发送失败！',
            err,
            'error'
          );
        });

    } else {

    }
  }


}
