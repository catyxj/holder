import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintain-list',
  templateUrl: './maintain-list.component.html',
  styleUrls: ['./maintain-list.component.css']
})
export class MaintainListComponent implements OnInit {

  public maintains;
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;

  constructor() { }

  ngOnInit() {
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {

    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

}
