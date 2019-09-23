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

    this.getInfo();
    this.getCostData();
  }

  // 获取财务及账号信息
  getInfo() {

    this.chargeService.getConsumerInfo()
      .subscribe(data => {
        this.info = data;
      }, err => {

      });

  }

  getCostData() {

    /*this.costData = [{date: '2019-01' , sum: 21}, {date: '2019-02' , sum: 23}, {date: '2019-03' , sum: 21}, {date: '2019-04' , sum: 21}, {date: '2019-05' , sum: 33}, {date: '2019-06' , sum: 21}, {date: '2019-07' , sum: 33}, {date: '2019-08' , sum: 21}, {date: '2019-09' , sum: 33}, {date: '2019-10' , sum: 24}];
    this.initChart();*/

    this.chargeService.getConsumption()
      .subscribe(data => {
        this.costData = data;
        this.initChart();
      }, err => {

      });

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
        dimensions: ['date', 'sum'],
        source: this.costData
      },

    };
  }



}
