import { Component, OnInit } from '@angular/core';
import {MaintainService} from "../../../shared/maintain.service";

@Component({
  selector: 'app-mal-history',
  templateUrl: './mal-history.component.html',
  styleUrls: ['./mal-history.component.css']
})
export class MalHistoryComponent implements OnInit {
  public malfunctions = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public pageSize = 10;

  constructor(private maintainService: MaintainService) { }

  ngOnInit() {
    this.getmals();
  }

  // 获取故障列表
  getmals() {
    /*this.malfunctions = [
      {
        Name: 'asdf',
        Create: '大哥好',
        Date: '2018-01-01',
        Result: true
      },
      {
        Name: 'asdfadf',
        Create: '哈哈哈',
        Date: '2018-01-01',
        Result: false
      }
    ];
    this.totalItems = 2;*/

    this.maintainService.getMalHistoryLists(this.page, this.pageSize, this.search)
      .subscribe( data => {
        this.malfunctions = data.params;
        this.totalItems = data.counts;
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
    this.getmals();
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }

}
