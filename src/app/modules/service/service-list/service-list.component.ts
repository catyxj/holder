import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {ServiceService} from '../../../shared/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  public user;
  public serviceList = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  public isSpinning = false;
  public isLoading = false;

  constructor(private userService: UserService,
              private serviceService: ServiceService) {
    this.userService.userStatus$ // 监测父组件user
      .subscribe( data => {
          this.user = data;
        }
      );
  }

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.user = user;
    this.getList();
  }

  getList() {
    this.serviceService.getLists(this.page, this.pageSize, this.search)
      .subscribe(data => {
        this.serviceList = data.params;
        this.totalItems = data.counts;
      });
    /*this.serviceList = [
      {
        id: 111,
        content: 'asfdsaf',
        classify: 'asdf',
        submitor: 'asdfsaf',
        date: '2018-11-1',
        status: true
      }
    ];*/
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
  }

  // 全选
  allDel() {
    if (this.allDelete === true) {
      for (let i = 0; i < this.serviceList.length; i++) {
        this.serviceList[i].checkDelete = true;
        this.deleteList.push(this.serviceList[i].Uid);
      }
    } else {
      for (let i = 0; i < this.serviceList.length; i++) {
        this.serviceList[i].checkDelete = false;
        // this.deleteList.splice(i, 1);
      }
      this.deleteList = [];
    }
  }

  // 批量删除
  deleteG() {
    const cf = confirm(`确认删除选中集群 ？`);
    if (cf === true) {
      this.isLoading = true;
      this.serviceService.delete(this.deleteList)
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
    this.getList();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }



}
