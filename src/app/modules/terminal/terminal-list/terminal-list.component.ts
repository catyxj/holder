import { Component, OnInit } from '@angular/core';
import {TerminalService} from '../../../shared/terminal.service';
import {AddTerminalComponent} from '../add-terminal/add-terminal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupConfigComponent} from '../group-config/group-config.component';
import {EditTerminalComponent} from '../edit-terminal/edit-terminal.component';
import {GroupAddComponent} from '../group-add/group-add.component';

@Component({
  selector: 'app-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.css']
})
export class TerminalListComponent implements OnInit {

  terminals = [];
  page = 1;
  totalItems = 0;
  search: string;
  deleteList = [];
  allDelete = false;
  pageSize = 10;

  constructor(private terminalService: TerminalService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getTerminals();
  }

  // 获取终端列表
  getTerminals(): void {
    // console.log({page: this.page, pageSize: this.pageSize , search: this.search});
    this.terminalService.getTerminals(this.page, this.pageSize , this.search)
      .subscribe(terminals => {
        this.totalItems = terminals.counts;
        this.terminals = terminals.params;
        if (this.terminals.length <= 0) {
          return;
        }
        for (let i = 0; i < this.terminals.length; i++) {
          let terminal = this.terminals[i];
          if (terminal.TermVer === terminal.PlatVer) {
            terminal.confStatus = '配置成功';
          } else {
            terminal.confStatus = '配置失败';
          }
          if ( terminal.IsOnline === true) {
            terminal.isOnline = '在线';
          } else {
            terminal.isOnline = '离线';
          }

          terminal.checkDelete = false;
        }
      });
  }


  // 批量选择
  checkDel(terminal): void {
    if ( terminal.checkDelete === true) {
      this.deleteList.push(terminal.TerminalCode.toString());
    } else {
      for (let i = 0; i < this.deleteList.length; i++){
        let dl = this.deleteList[i];
        if (dl === terminal.TerminalCode.toString()) {
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
        this.deleteList.push(this.terminals[i].TerminalCode.toString());
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
      this.terminalService.deleteTerminal(this.deleteList)
        .subscribe(() => {
          this.pageChange();
        });

    } else {

    }

    // console.log(this.deleteList);
  }

  // 每页数量
  pageSizeChange() {
    this.page = 1;
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
      alert('未选择任何终端,请先选择终端');
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
    const modalRef = this.modalService.open(GroupAddComponent, { size: 'lg' });
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


}
