import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charge-overview-dir',
  templateUrl: './charge-overview-dir.component.html',
  styleUrls: ['./charge-overview-dir.component.css']
})
export class ChargeOverviewDirComponent implements OnInit {
  public chartOption;

  constructor() { }

  ngOnInit() {
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
          nameGap: 19,
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
        source: [{receive_time: 22 , value: 21}, {receive_time: 23 , value: 23}, {receive_time: 24 , value: 21}, {receive_time: 25 , value: 21}, {receive_time: 26 , value: 33}, {receive_time: 27 , value: 21}, {receive_time: 28 , value: 33}, {receive_time: 29 , value: 21}]
      },

    };
  }

}
