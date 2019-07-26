import { Component, OnInit } from '@angular/core';
import {UserListService} from "../../../../shared/user-list.service";

@Component({
  selector: 'app-user-list-formal',
  templateUrl: './user-list-formal.component.html',
  styleUrls: ['./user-list-formal.component.css']
})
export class UserListFormalComponent implements OnInit {
  public dataLists = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public search = 'phone';
  public value;
  public status = '';
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];


  constructor(private usersService: UserListService) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表
  getList() {
    this.loading = true;
    this.usersService.getLists(this.page, this.pageSize, this.search, this.value, this.status)
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

  searchRoleId(n?) {
    this.status = n;
    // if (!n) {
    //   this.type = '';
    // }
    this.searchChange();
  }

}
