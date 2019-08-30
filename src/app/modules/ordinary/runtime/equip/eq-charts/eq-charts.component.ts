import { Component, OnInit } from '@angular/core';
import {RuntimeService} from "../../../../../shared/runtime.service";
import {DatePipe} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EqChartExComponent} from "../modals/eq-chart-ex/eq-chart-ex.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eq-charts',
  templateUrl: './eq-charts.component.html',
  styleUrls: ['./eq-charts.component.css']
})
export class EqChartsComponent implements OnInit {
  public uid;
  public name;
  public current = true;  // 实时数据
  public rangeValue = 'today';
  public dateRange = []; // 时间区间
  public params; // 所有参数
  public currentParams = [];  // 选中参数
  public runtimes = [];  // 图表数据 4组
  public chartOption = []; // 图表参数 4组

  constructor(private runtimeService: RuntimeService,
              private datePipe: DatePipe,
              private modalService: NgbModal,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getRuntime();
  }

  // 获取通道参数
  getRuntime() {

    /*let chans = [];
    for (let i = 0; i < this.currentParams.length; i++) {
      chans[i] = this.currentParams[i].Uid;
    }*/
    /*let postData = {
      uid: this.uid,
      begin: this.dateRange[0],
      end: this.dateRange[1],
      // channels: chans
    };*/
    this.runtimeService.getRuntimeList(this.uid)
      .subscribe( data => {
        // console.log(data);
        this.params = data;
        // this.runtimes = data.data;
        let n = 4;
        if (this.params.length > 4) {
          n = 4;
        } else {
          n = this.params.length;
        }
        for (let i = 0; i < n; i++) {
          this.currentParams[i] = this.params[i];
          this.params[i].checked = true;
        }
        this.getChartData();
        // this.initCharts();
      }, err => { });

    /*this.params = [
      {
        Name: 'adf',
        Uid: 'asdfadfq23344'
      },
      {
        Name: 'aasdfa',
        Uid: 'asdfasdf44'
      },
      {
        Name: 'aw35gaf',
        Uid: 'asdf134543344'
      },
      {
        Name: 'jjjjj',
        Uid: 'asdfadfasdf44'
      },
      {
        Name: 'abbbbb',
        Uid: 'asdfadde3344'
      },
      {
        Name: 'adddddddaf',
        Uid: 'asdf132222224'
      },
      {
        Name: 'aasdfa',
        Uid: 'asdfasdf44'
      },
      {
        Name: 'aw35gaf',
        Uid: 'asdf134543344'
      },
      {
        Name: 'jjjjj',
        Uid: 'asdfadfasdf44'
      },
      {
        Name: 'abbbbb',
        Uid: 'asdfadde3344'
      },
      {
        Name: 'adddddddaf',
        Uid: 'asdf132222224'
      }
    ];
    this.runtimes = [
      {
        data: [
        {
          created_date: '2018-11-6 11:20:10' ,
          value: 333
        },
        {
          created_date: '2018-11-6 11:20:20',
          value: 343
        },
        {
          created_date: '2018-11-6 11:20:30',
          value: 355
        },
        {
          created_date: '2018-11-6 11:20:40',
          value: 311
        }
      ],
        unit: 'M'
      },
      {
        data: [
        {
          created_date: '2018-11-6 11:20:10' ,
          value: 333
        },
        {
          created_date: '2018-11-6 11:20:20',
          value: 343
        },
        {
          created_date: '2018-11-6 11:20:30',
          value: 355
        },
        {
          created_date: '2018-11-6 11:20:40',
          value: 311
        }
      ],
        unit: 'aa'
      },
      {
        data: [
        {
          created_date: '2018-11-6 11:20:10' ,
          value: 333
        },
        {
          created_date: '2018-11-6 11:20:20',
          value: 343
        },
        {
          created_date: '2018-11-6 11:20:30',
          value: 355
        },
        {
          created_date: '2018-11-6 11:20:40',
          value: 311
        }
      ],
        unit: 'aaa'
      },
      {
        data: [
        {
          created_date: '2018-11-6 11:20:10' ,
          value: 333
        },
        {
          created_date: '2018-11-6 11:20:20',
          value: 343
        },
        {
          created_date: '2018-11-6 11:20:30',
          value: 355
        },
        {
          created_date: '2018-11-6 11:20:40',
          value: 311
        }
      ],
        unit: 'aaccd'
      }
    ];

    let n = 4;
    if (this.params.length > 4) {
      n = 4;
    } else {
      n = this.params.length;
    }
    for (let i = 0; i < n; i++) {
      this.currentParams[i] = this.params[i];
      this.params[i].checked = true;
    }
    this.initCharts();*/


  }


  // 多个图表初始化
  /*initCharts() {
    if (!this.runtimes) {
      return;
    }
    for (let i = 0; i < this.runtimes.length; i++) {
      let rts = this.runtimes[i];
      /!*if (!this.runtimes[i] || this.runtimes[i].length <= 0) {
        rts = null;
      }*!/
      this.initChart(rts, i);
    }
  }*/

  // 获取图表数据
  getChartData() {

    /*this.runtimes = [
      {
        data:[
          {
            created_date: '2018-11-6 11:20:10',
            value: 333
          },
          {
            created_date: '2018-11-6 11:20:20',
            value: 343
          },
          {
            created_date: '2018-11-6 11:20:30',
            value: 355
          },
          {
            created_date: '2018-11-6 11:20:40',
            value: 311
          }
        ],
        unit: 'aa'
      },
      {
        data: [
          {
            created_date: '2018-11-6 11:20:10' ,
            value: 333
          },
          {
            created_date: '2018-11-6 11:20:20',
            value: 343
          },
          {
            created_date: '2018-11-6 11:20:30',
            value: 355
          },
          {
            created_date: '2018-11-6 11:20:40',
            value: 311
          }
        ],
        unit: '℃'
      },
      {
        data: [
          {
            created_date: '2018-11-6 11:20:10' ,
            value: 333
          },
          {
            created_date: '2018-11-6 11:20:20',
            value: 343
          },
          {
            created_date: '2018-11-6 11:20:30',
            value: 355
          },
          {
            created_date: '2018-11-6 11:20:40',
            value: 311
          }
        ],
        unit: '℃'
      },
      {
        data: [
          {
            created_date: '2018-11-6 11:20:10' ,
            value: 388
          },
          {
            created_date: '2018-11-6 11:20:20',
            value: 355
          },
          {
            created_date: '2018-11-6 11:20:30',
            value: 433
          },
          {
            created_date: '2018-11-6 11:20:40',
            value: 431
          }
        ],
        unit: 'dd'
      }
    ];
    for (let i = 0; i < this.runtimes.length; i++) {
      let rts = this.runtimes[i];
      this.initChart(rts, i);
    }*/

    let chans = [];
    for (let i = 0; i < this.currentParams.length; i++) {
      chans.push({
        channel_type: this.currentParams[i].channel_type,
        channel_number: this.currentParams[i].channel_number
      });
    }

    let postData = {
      uid: this.uid,
      begin: this.dateRange[0],
      end: this.dateRange[1],
      channel_info: chans
    };
    this.runtimeService.getRuntimeData(postData)
      .subscribe( data => {
        console.log(data);
        this.runtimes = data.instant;
        for (let i = 0; i < this.runtimes.length; i++) {
          let rts = this.runtimes[i];
          this.initChart(rts, i);
        }
      });
  }

  // 单个图表初始化
  initChart(data, n) {
    if (!data || !data.data) {
      data = {
        data: [
          {
            created_date: new Date(),
            value: 0
          }
        ],
        unit: ''
      };
    }
    for (let i = 0; i < data.data.length; i++) {
      let rt = data.data[i];
      rt.created_date = this.datePipe.transform(new Date(rt.created_date), 'MM/dd HH:mm:ss');
    }
    // console.log(data);
    this.chartOption[n] = {
      title: {
        text: ''
      },
      color: '#666EE8',
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#000000',
        formatter: function (params) {
          params = params[0];
          // console.log(params);
          return params.value.value + data.unit;
        },
      },
      legend: {
        data: []
      },
      toolbox: {
        feature: {
          // saveAsImage: {},
          // dataView: {}
        },
        right: 50
      },
      grid: {
        left: 60,
        right: 50,
        top: 40,
        bottom: 30
      },
      xAxis: [
        {
          name: '时间',
          nameTextStyle: {
            color: '#666EE8',
            align: 'left',
          },
          type: 'category'
        }
      ],
      yAxis: [
        {
          name: data.unit,
          nameTextStyle: {
            color: '#666EE8',
            align: 'left',
          },
          type: 'value',
          min: function(value) {  // 'dataMin'
            return value.min;
          }
        }
      ],
      series: [
        {
          type: 'line',
          // smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#E7E9FC' // 0% 处的颜色
              }, {
                offset: 1, color: '#ffffff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ],
      dataset: {
        dimensions: ['created_date', 'value'],
        source: data.data
      },

    };
  }


  // 选择时间区间
  changeDate() {
    this.getChartData();
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
    this.changeDate();
  }

  // 选择参数
  changeData(data) {
    if (data.checked === true) {
      data.checked = false;
      for (let i = 0; i < this.currentParams.length; i++) {
        if (data.Uid === this.currentParams[i].Uid) {
          this.currentParams.splice(i, 1);
          this.runtimes.splice(i, 1);
        }
      }
    } else {
      if (this.currentParams.length === 4) {
        return;
      }
      data.checked = true;
      this.currentParams.push(data);
      this.getChartData();
    }

    /*for (let i = 0; i < this.params.length; i++) {

    }*/
    // this.getChartData(uid);
  }


  // 实时数据
  showCurrent() {
    this.current = true;
    this.dateRange = [];
    this.getChartData();
  }


  // 历史数据
  showHistory() {
    this.current = false;
    this.selectDate();
    this.getChartData();
  }


  // 图表放大
  expandChart(cparam, i) {
    const modalRef = this.modalService.open(EqChartExComponent, {windowClass: 'modal_lg', centered: true});
    modalRef.componentInstance.param = cparam;
    modalRef.componentInstance.option = this.chartOption[i];
  }

  // 不可选时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    let today = new Date();
    let month = today.getMonth();
    let lastMonth = new Date();
    lastMonth.setMonth(month - 1);
    return current > today || current < lastMonth;
  }

  goBack() {
    window.history.go(-1);
  }

}
