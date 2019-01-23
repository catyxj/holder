import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
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
    const cf = confirm(`确认删除选中内容？`);
    if (cf === true) {
      this.isLoading = true;
      // this.clusterService.deleteCluster(this.deleteList)
      //   .subscribe(() => {
      //     this.isLoading = false;
      //     Swal(
      //       '删除成功！',
      //       '',
      //       'success'
      //     );
      //     this.pageChange();
      //   }, err => {
      //     this.isLoading = false;
      //     Swal(
      //       '删除失败！',
      //       '',
      //       'error'
      //     );
      //   });
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
    // this.getclusters();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }




}
