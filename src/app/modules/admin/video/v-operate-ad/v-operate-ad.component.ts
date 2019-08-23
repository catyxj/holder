import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../../../shared/video.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-v-operate-ad',
  templateUrl: './v-operate-ad.component.html',
  styleUrls: ['./v-operate-ad.component.css']
})
export class VOperateAdComponent implements OnInit {
  public uid;
  public name;
  public operateList = [];
  public page = 1;
  public pageNum;
  public pageSize = 15;
  public totalItems;
  public loading;
  public pageSizeList = [15, 30, 50, 100];

  constructor(private videoService: VideoService,
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
    this.videoService.getOperateMore(this.uid, this.page, this.pageSize)
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
