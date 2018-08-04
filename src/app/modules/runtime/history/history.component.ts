import { Component, OnInit } from '@angular/core';
import {RuntimeService} from "../../../shared/runtime.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class RuntimeHistoryComponent implements OnInit {

  public page = 1;
  public pageSize = 10;
  public totalItems = 0;
  public rangeValue = 'today';
  public dateRange = [];
  private uid;
  public params = [];
  public history = [];

  constructor(private runtimeService: RuntimeService) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.selectDate();
  }

  // 选择时间区间
  changeDate() {
    console.log(this.dateRange);
    this.refreshData();
  }

  selectDate() {
    let start = new Date();
    let end = new Date();
    switch (this.rangeValue) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        let d1 = start.getDate() - 7;
        start.setDate(d1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
    }

    this.dateRange = [start, end];
    console.log(this.dateRange);
    this.refreshData();
  }


  refreshData() {
    let postData = {
      uid: this.uid,
      startDate: this.dateRange[0],
      endDate: this.dateRange[1],
      page: this.page,
      pageSize: this.pageSize
    };
    this.runtimeService.getHistory(postData)
      .subscribe( data => {
        console.log(data);
        this.totalItems = data.counts;
        let runtimes = data.params;

        this.params = [];
        this.history = [];
        let param = runtimes.channel;
        let lists = runtimes.history;

        // 通道列表
        for ( let i = 0; i < param.length; i++) {
          let pa = param[i];
          let da = {
            id: '',
            Name: '',
            Unit: ''
          };
          da.id = pa.ChannelType + '_' + pa.ChannelNumber;
          da.Name = pa.Name;
          da.Unit = pa.Unit;
          this.params.push(da);
        }

        // 历史数据列表
        if (lists) {
          for (let i = 0; i < lists.length; i++) {
            let li = JSON.parse(lists[i].data);
            let his = {
              date: '',
              data: {}
            };
            his.date = lists[i].date;
            for (let j = 0; j < li.length; j++) {
              let dat = li[j];
              let id = dat.type + '_' + dat.number;
              his.data[id] = dat.value;
            }
            this.history.push(his);
          }
        }


        console.log(this.params, this.history);

      });
  }

  pageChange() {
    console.log(this.page);
  }

  pageSizeChange() {
    console.log(this.pageSize);
  }

}
