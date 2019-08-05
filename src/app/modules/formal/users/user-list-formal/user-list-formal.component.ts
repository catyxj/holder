import { Component, OnInit } from '@angular/core';
import {UserListService} from "../../../../shared/user-list.service";
import {switchMap} from "rxjs/internal/operators";
import {ActivatedRoute, ParamMap} from "@angular/router";

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
  public search = 'username';
  public value;
  public status = '';
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];


  constructor(private usersService: UserListService,
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
    this.status = n;
    this.searchChange();
  }

}
