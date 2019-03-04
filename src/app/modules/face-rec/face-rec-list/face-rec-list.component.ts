import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../shared/user.service';
import {FaceService} from '../../../shared/face.service';
import { Location } from '@angular/common';
import {RecEditComponent} from '../rec-edit/rec-edit.component';

import Swal from 'sweetalert2';
import {FaceAddComponent} from "../face-add/face-add.component";


@Component({
  selector: 'app-face-rec-list',
  templateUrl: './face-rec-list.component.html',
  styleUrls: ['./face-rec-list.component.css']
})
export class FaceRecListComponent implements OnInit {
  public user;
  public recLists;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private faceService: FaceService,
              private location: Location) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;

    this.getlists();

    // this.getTest();

  }

  // 获取列表
  getlists() {
    // this.isSpinning = true;
    this.faceService.getRecLists(this.page, this.pageSize)
      .subscribe( data => {
        this.isSpinning = false;
        this.recLists = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  getTest() {
    this.recLists = [
      {
        Uid: 'afdasf',
        Name: 'asdfasdf',
        Online: true,
        Sex: 1,
        Type: 1,
        Telephone: '122222222',
        Wechat: 'asdfa',
        Organization: {
          Name: 'asdfa'
        }
      },
      {
        Uid: 'afdasf11111',
        Name: 'asdfasdfasdfa',
        Online: false,
        Sex: 2,
        Type: 2,
        Telephone: '122224444444442222',
        Wechat: 'w33dasdf',
        Organization: {
          Name: '21343523tadsfa4'
        }
      }
    ];
    this.totalItems = 12;
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
      for (let i = 0; i < this.recLists.length; i++) {
        this.recLists[i].checkDelete = true;
        this.deleteList.push(this.recLists[i].Uid);
      }
    } else {
      for (let i = 0; i < this.recLists.length; i++) {
        this.recLists[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中内容 ？`);
    if (cf === true) {
      this.isLoading = true;
      this.faceService.deleteData(this.deleteList)
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
    this.getlists();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 修改
  viewData(data) {
    const modalRef = this.modalService.open(RecEditComponent, {size: 'lg'});
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {

      console.log(reason);
    });
  }

  // 新增
  newData() {
    const modalRef = this.modalService.open(FaceAddComponent);
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



  // 返回
  goBack(): void {
    this.location.back();
  }

}
