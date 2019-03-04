import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BluetoothService} from '../../../shared/bluetooth.service';
import {BlueEditComponent} from '../blue-edit/blue-edit.component';
import {BlueAddComponent} from '../blue-add/blue-add.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-blue-list',
  templateUrl: './blue-list.component.html',
  styleUrls: ['./blue-list.component.css']
})
export class BlueListComponent implements OnInit {
  public user;
  public dataLists;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private bluetoothService: BluetoothService,
              private userService: UserService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getblueteeth();

    //this.getTest(); // 测试数据

  }

  // 获取蓝牙列表
  getblueteeth() {
    this.isSpinning = true;
    this.bluetoothService.getlist(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.isSpinning = false;
        this.dataLists = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  getTest() {
    this.dataLists = [
      {
        Uid: 'as1111111',
        Name: 'asdfaf',
        Mac: 'FA:58:D6:E4:0F:36'
      },
      {
        Uid: '122334552dddd',
        Name: 'dddddd',
        Mac: 'FA:58:D6:E4:0F:38'
      }
    ];
    this.totalItems = 20;
  }

  // 删除
  delete(uid, name) {
    const cf = confirm(`确定删除[${name}]？`);
    if (cf === true) {
      this.bluetoothService.deleteData([uid])
        .subscribe( () => {
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          Swal(
            '删除失败！',
            '',
            'error'
          );
        });
    }
  }

  // 批量选择
  checkDel(data): void {
    if ( data.checkDelete === true) {
      this.deleteList.push(data.Uid);
    } else {
      for (let i = 0; i < this.deleteList.length; i++) {
        const dl = this.deleteList[i];
        if (dl === data.Uid) {
          this.deleteList.splice(i, 1);
        }
      }
    }
    // console.log(this.deleteList);
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.dataLists.length; i++) {
        this.dataLists[i].checkDelete = true;
        this.deleteList.push(this.dataLists[i].Uid);
      }
    } else {
      for (let i = 0; i < this.dataLists.length; i++) {
        this.dataLists[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中数据 ？`);
    if (cf === true) {
      this.isLoading = true;
      this.bluetoothService.deleteData(this.deleteList)
        .subscribe(() => {
          this.isLoading = false;
          Swal(
            '删除成功！',
            '',
            'success'
          );
          this.pageChange();
        }, err => {
          this.isLoading = false;
          Swal(
            '删除失败！',
            '',
            'error'
          );
        });
    } else {

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
    this.getblueteeth();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 新增
  addData() {
    const modalRef = this.modalService.open(BlueAddComponent);
    // modalRef.componentInstance.currentUser = this.user;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }

// 修改
  editData(data) {
    const modalRef = this.modalService.open(BlueEditComponent);
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(reason);
    });
  }






}
