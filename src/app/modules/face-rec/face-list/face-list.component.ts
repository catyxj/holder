import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../shared/user.service';
import {FaceService} from '../../../shared/face.service';

import Swal from 'sweetalert2';
import {FaceViewComponent} from "../face-view/face-view.component";

@Component({
  selector: 'app-face-list',
  templateUrl: './face-list.component.html',
  styleUrls: ['./face-list.component.css']
})
export class FaceListComponent implements OnInit {
  public user;
  public faceLists;
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
              private faceService: FaceService) {
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
    this.faceService.getLists(this.page, this.pageSize)
      .subscribe( data => {
        this.isSpinning = false;
        this.faceLists = data.params;
        this.totalItems = data.counts;
      }, err => {
        this.isSpinning = false;
      });
  }

  getTest() {
    this.faceLists = [
      {
        Uid: 'afdasf',
        Name: 'asdfasdf',
        Online: true,
        Wechat: 'asdfa',
        Sex: 1,
        Date: new Date(),
        Result: true,
        Telephone: '12313'
      },
      {
        Uid: 'afdasf11111',
        Name: 'asdfasdfasdfa',
        Online: false,
        Wechat: 'asdfaadsf',
        Sex: 2,
        Date: new Date(),
        Result: false
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
      for (let i = 0; i < this.faceLists.length; i++) {
        this.faceLists[i].checkDelete = true;
        this.deleteList.push(this.faceLists[i].Uid);
      }
    } else {
      for (let i = 0; i < this.faceLists.length; i++) {
        this.faceLists[i].checkDelete = false;
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


  // 查看
  viewData(data) {
    const modalRef = this.modalService.open(FaceViewComponent);
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {

      console.log(reason);
    });
  }


}
