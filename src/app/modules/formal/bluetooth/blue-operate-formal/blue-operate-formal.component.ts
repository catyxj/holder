import { Component, OnInit } from '@angular/core';
import {BluetoothService} from "../../../../shared/bluetooth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blue-operate-formal',
  templateUrl: './blue-operate-formal.component.html',
  styleUrls: ['./blue-operate-formal.component.css']
})
export class BlueOperateFormalComponent implements OnInit {
  public uid;
  public name;
  public operateList = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private blueService: BluetoothService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getList();

    /*this.operateList = [
      {
        created_at: '2016-5-10',
        info: 'asdf'
      },
      {
        created_at: '2016-5-10',
        info: 'asdf'
      }
    ];
    this.totalItems = 22;*/
  }


  // 获取列表
  getList() {
    this.loading = true;
    this.blueService.getOperateMore(this.uid, this.page, this.pageSize)
      .subscribe(data => {
        this.loading = false;
        this.operateList = data.data;
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
    this.page = 1;
    this.pageChange();
  }

  goBack() {
    window.history.go(-1);
  }

}
