import { Component, OnInit } from '@angular/core';
import {RuntimeService} from '../../../shared/runtime.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-operate',
  templateUrl: './operate.component.html',
  styleUrls: ['./operate.component.css']
})
export class OperateComponent implements OnInit {

  public uid;
  public name;
  public current = true;
  public rangeValue = 'today';
  public dateRange = [];
  public params;
  public currentParams = [];
  public runtimes;
  public chartOption;
  public currentData;

  constructor(private runtimeService: RuntimeService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.getRuntime();
  }

  // 获取通道参数
  getRuntime() {
    let postData = {
      uid: this.uid,
      beginDate: this.dateRange[0],
      endDate: this.dateRange[1],
      channels: this.currentParams
    };
    this.runtimeService.getRuntimeList(postData)
      .subscribe( data => {
        // console.log(data);
        this.params = data.channel;
        this.runtimes = data.param;
        this.initChart();
      });
  }

  // 获取图表数据
  getChartData(uid) {
    this.runtimeService.getRuntimeData(uid)
      .subscribe( data => {
        console.log(data);
        this.runtimes = data;
        this.initChart();
      });
  }

  initChart() {
    if (!this.runtimes) {
      this.runtimes = [
        {
          CreatedDate: 0,
          Value: 0
        }
      ];
    }
    for (let i = 0; i < this.runtimes.length; i++) {
      let rt = this.runtimes[i];
      rt.CreatedDate = this.datePipe.transform(new Date(rt.CreatedDate), 'MM-dd HH:mm:ss');
    }
    this.chartOption = {
      title: {
        text: ''
      },
      color: '#00838f',
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: []
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          // dataView: {}
        },
        right: 50
      },
      grid: {
        left: 60,
        right: 50
      },
      xAxis: [
        {
          type: 'category'
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: function(value) {  // 'dataMin'
            return value.min;
          }
        }
      ],
      series: [
        {
          type: 'line',
          smooth: true,
        }
      ],
      dataset: {
        dimensions: ['CreatedDate', 'Value'],
        source: this.runtimes
      },

    };
  }


  // 选择时间区间
  changeDate() {

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

  }

  // 选择参数
  changeData(uid) {
    for (let i = 0; i < this.params.length; i++) {
      if (this.params[i].Uid === uid) {
        this.params[i].checked = true;
        this.currentData = this.params[i];
      } else {
        this.params[i].checked = false;
      }
    }
    this.getChartData(uid);
  }


  // 实时数据
  showCurrent() {
    this.current = true;
    this.dateRange = [];
    this.getRuntime();
  }


  // 历史数据
  showHistory() {
    this.current = false;
    this.selectDate();
    this.getRuntime();
  }

}
