import { Component, OnInit } from '@angular/core';
import {ChargeService} from "../../../../../shared/charge.service";

@Component({
  selector: 'app-charge-overview-dir',
  templateUrl: './charge-overview-dir.component.html',
  styleUrls: ['./charge-overview-dir.component.css']
})
export class ChargeOverviewDirComponent implements OnInit {
  public chartOption;
  public info;
  public costData = [];

  constructor(private chargeService: ChargeService) { }

  ngOnInit() {
    this.getCostData();
  }

  getInfo() {
    this.info = [

    ];

  }

  getCostData() {
    this.costData = [{receive_time: '2019-01' , value: 21}, {receive_time: '2019-02' , value: 23}, {receive_time: '2019-03' , value: 21}, {receive_time: '2019-04' , value: 21}, {receive_time: '2019-05' , value: 33}, {receive_time: '2019-06' , value: 21}, {receive_time: '2019-07' , value: 33}, {receive_time: '2019-08' , value: 21}, {receive_time: '2019-09' , value: 33}, {receive_time: '2019-10' , value: 24}];
    this.initChart();
  }

  initChart() {
    this.chartOption = {
      title: {
        text: ''
      },
      color: '#5B8FF9',
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
        left: 50,
        right: 40,
        top: 40,
        bottom: 50,
      },
      xAxis: [
        {
          name: '日期',
          nameLocation: 'center',
          nameGap: 26,
          type: 'category'
        }
      ],
      yAxis: [
        {
          name: 'RMB',
          nameLocation: 'center',
          nameGap: 26,
          type: 'value',
          // min: function(value) {  // 'dataMin'
          //   return value.min;
          // }
        }
      ],
      series: [
        {
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#000'
            }
          },
          barCategoryGap: '50%'
        }
      ],
      dataset: {
        dimensions: ['receive_time', 'value'],
        source: this.costData
      },

    };
  }



}
