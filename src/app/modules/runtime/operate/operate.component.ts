import { Component, OnInit } from '@angular/core';
import {RuntimeService} from '../../../shared/runtime.service';
import {DatePipe} from '@angular/common';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChartExpandComponent} from '../chart-expand/chart-expand.component';

@Component({
  selector: 'app-operate',
  templateUrl: './operate.component.html',
  styleUrls: ['./operate.component.css']
})
export class OperateComponent implements OnInit {

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
              private modalService: NgbModal) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    this.name = sessionStorage.getItem('runtimeName');
    this.getRuntime();
  }

  // 获取通道参数
  getRuntime() {

    let chans = [];
    for (let i = 0; i < this.currentParams.length; i++){
      chans[i] = this.currentParams[i].Uid;
    }
    let postData = {
      uid: this.uid,
      beginDate: this.dateRange[0],
      endDate: this.dateRange[1],
      channels: chans
    };
    this.runtimeService.getRuntimeList(postData)
      .subscribe( data => {
        // console.log(data);
        this.params = data.channel;
        this.runtimes = data.instant;
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
        this.initCharts();
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
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ]
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
  initCharts() {
    if (!this.runtimes) {
      return;
    }
    for (let i = 0; i < this.runtimes.length; i++) {
      let rts = this.runtimes[i].data;
      /*if (!this.runtimes[i] || this.runtimes[i].length <= 0) {
        rts = null;
      }*/
      this.initChart(rts, i);
    }
  }


  // 获取图表数据
  getChartData() {

    /*this.runtimes = [
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
          CreatedDate: '2018-11-6 11:20:10' ,
          Value: 333
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 343
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 311
        }
      ],
      [
        {
        CreatedDate: '2018-11-6 11:20:10' ,
        Value: 388
        },
        {
          CreatedDate: '2018-11-6 11:20:20',
          Value: 355
        },
        {
          CreatedDate: '2018-11-6 11:20:30',
          Value: 433
        },
        {
          CreatedDate: '2018-11-6 11:20:40',
          Value: 431
        }
        ]
    ];
    for (let i = 0; i < this.runtimes.length; i++) {
      let rts = this.runtimes[i];
      this.initChart(rts, i);
    }*/

    let chans = [];
    for (let i = 0; i < this.currentParams.length; i++){
      chans[i] = this.currentParams[i].Uid;
    }

    let postData = {
      uid: this.uid,
      beginDate: this.dateRange[0],
      endDate: this.dateRange[1],
      channels: chans
    };
    this.runtimeService.getRuntimeList(postData)
      .subscribe( data => {
        console.log(data);
        this.runtimes = data.instant;
        for (let i = 0; i < this.runtimes.length; i++) {
          let rts = this.runtimes[i].data;
          this.initChart(rts, i);
        }
      });
  }

  // 单个图表初始化
  initChart(data, n) {
    if (!data) {
      data = [
        {
          CreatedDate: new Date(),
          Value: 0
        }
      ];
    }
    for (let i = 0; i < data.length; i++) {
      let rt = data[i];
      rt.created_date = this.datePipe.transform(new Date(rt.created_date), 'MM/dd HH:mm:ss');
    }
    this.chartOption[n] = {
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
        right: 50,
        top: 20
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
        dimensions: ['created_date', 'value'],
        source: data
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
    const modalRef = this.modalService.open(ChartExpandComponent, { size: 'lg' });
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


}
