import { Component, OnInit } from '@angular/core';
import {RuntimeService} from "../../../shared/runtime.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-operate',
  templateUrl: './operate.component.html',
  styleUrls: ['./operate.component.css']
})
export class OperateComponent implements OnInit {

  public uid;
  public params;
  public runtimes;
  public chartOption;

  constructor(private runtimeService: RuntimeService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.uid = sessionStorage.getItem('runtimeUid');
    console.log(this.uid);
    this.getRuntime(this.uid);
  }

  // 获取通道参数
  getRuntime(uid) {
    this.runtimeService.getRuntimeList(uid)
      .subscribe( data => {
        console.log(data);
        this.params = data.channel;
        this.runtimes = data.param;
        this.params[0].checked = true;
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
    for (let i = 0; i < this.runtimes.length; i++) {
      let rt = this.runtimes[i];
      rt.CreatedDate = this.datePipe.transform(new Date(rt.CreatedDate), 'HH:mm:ss');
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
          saveAsImage: {}
        }
      },
      grid: {
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


  // 选择参数
  changeData(uid) {
    for (let i = 0; i < this.params.length; i++) {
      if (this.params[i].Uid === uid) {
        this.params[i].checked = true;
      } else {
        this.params[i].checked = false;
      }
    }
    this.getChartData(uid);
  }


}
