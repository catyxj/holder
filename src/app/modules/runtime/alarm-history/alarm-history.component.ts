import { Component, OnInit } from '@angular/core';
import {AlarmService} from '../../../shared/alarm.service';

@Component({
  selector: 'app-alarm-history',
  templateUrl: './alarm-history.component.html',
  styleUrls: ['./alarm-history.component.css']
})
export class AlarmHistoryComponent implements OnInit {

  public alarms = [];
  public page = 1;
  public totalItems = 0;
  public search: string;
  public deleteList = [];
  public allDelete = false;
  public pageSize = 10;
  private uid;

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.getalarms();
  }


  // 获取告警列表
  getalarms() {
    this.alarmService.getHistories(this.page, this.pageSize, this.search, this.uid)
      .subscribe( data => {
        this.alarms = data.params;
        this.totalItems = data.counts;
      });
  }


  // 每页数量
  pageSizeChange() {
    this.page = 1;
    this.pageChange();
  }

  // 页码变化
  pageChange(): void {
    this.getalarms();
    this.allDelete = false;
    this.deleteList = [];
  }

  // 搜索
  searchChange() {
    this.page = 1;
    this.pageChange();
  }


}
