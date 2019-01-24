import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LifeService} from '../../../../shared/life.service';
import {LifeAddComponent} from '../life-add/life-add.component';
import {LifeEditComponent} from '../life-edit/life-edit.component';
import {SerAddComponent} from '../../../service/ser-add/ser-add.component';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-life-list',
  templateUrl: './life-list.component.html',
  styleUrls: ['./life-list.component.css']
})
export class LifeListComponent implements OnInit {
  public uid;
  public name;
  public lifeList = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isLoading;

  constructor(private modalService: NgbModal,
              private lifeService: LifeService,
              private router: Router) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    // console.log(this.uid, this.name);
    this.getList();
  }

  // 获取列表数据
  getList() {
    this.lifeList = [
      {
        Uid: 'asdfasdf',
        name: 'asdf',
        CreatedDate: new Date(),
        period: 12,
        percent: 0.2
      },
      {
        Uid: 'asdfasdf22222',
        name: 'asdf',
        CreatedDate: new Date(),
        period: 12,
        percent: 0.8
      },
      {
        Uid: 'asdfasdf33333',
        name: 'asdf',
        CreatedDate: new Date(),
        period: 6,
        percent: -0.1
      },
      {
        Uid: 'asdfasdf4444',
        name: 'asdf',
        CreatedDate: new Date(),
        period: 10,
        percent: 0.04
      }
    ];

    for (let i = 0; i < this.lifeList.length; i++) {
      let lf = this.lifeList[i];
      if (lf.percent < 0) {
        lf.percent = 0;
      }
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
      for (let i = 0; i < this.lifeList.length; i++) {
        this.lifeList[i].checkDelete = true;
        this.deleteList.push(this.lifeList[i].Uid);
      }
    } else {
      for (let i = 0; i < this.lifeList.length; i++) {
        this.lifeList[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    // console.log(this.deleteList);
    const cf = confirm(`确认删除选中内容？`);
    if (cf === true) {
      this.isLoading = true;
      this.lifeService.deleteLife(this.deleteList)
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
    this.getList();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

  // 添加
  add() {
    const modalRef = this.modalService.open(LifeAddComponent);
    modalRef.componentInstance.uid = this.uid;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 修改
  edit(data) {
    const modalRef = this.modalService.open(LifeEditComponent);
    modalRef.componentInstance.uid = this.uid;
    modalRef.componentInstance.currentData = data;
    modalRef.result.then((result) => {
      if (result === 'ok') {
        this.pageChange();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  // 联系厂家
  contact() {
    // this.router.navigate(['/admin/service/add']);
    // if (this.user.Role.RoleId <= 10) {
    //   return;
    // }

    const modalRef = this.modalService.open(SerAddComponent);
    modalRef.componentInstance.id = 4;
    modalRef.componentInstance.typeName = 'D类问题';
    modalRef.result.then((result) => {
      if (result === 'ok') {
        // this.pageChange();
        this.router.navigate(['/admin/service/list']);
      }
    }, (reason) => {
      console.log(reason);
    });
  }


}
