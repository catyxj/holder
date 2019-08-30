import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {RuntimeService} from "../../../../../../shared/runtime.service";
import {DatePipe} from "@angular/common";
import {AlarmService} from "../../../../../../shared/alarm.service";

@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.css']
})
export class AlarmDetailComponent implements OnInit {
  @Input()
  currentData;

  public chartOption;
  private runtimes;
  public AlarmMax;
  public AlarmMin;

  constructor(public activeModal: NgbActiveModal,
              private alarmService: AlarmService,
              private runtimeService: RuntimeService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.alarmService.AlarmMission('ok');

    this.alarmService.getDetail(this.currentData.uid)
      .subscribe(data => {
        this.runtimes = data.runtime[0].data;
        this.AlarmMax = data.alarmMax;
        this.AlarmMin = data.alarmMin;

        // console.log(this.currentData, this.AlarmMax);
        let runtimeValue = {
          min: 0,
          max: 0
        };
        let runtimeList = [];
        for (let i = 0; i < this.runtimes.length; i++) {
          let rt = this.runtimes[i];
          rt.created_date = this.datePipe.transform(new Date(rt.created_date), 'MM/dd HH:mm:ss');
          // rt.Value = rt.Value;
          runtimeList.push(rt.value);
        }
        runtimeValue.max = Math.max.apply(null, runtimeList);
        runtimeValue.min = Math.min.apply(null, runtimeList);

        this.chartOption = {
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
              return params.value.value.toString() + data.unit;
            },
          },
          legend: {
            data: []
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            },
            right: 10
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
              smooth: true,
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
              // markLine: { // 标线
              //   silent: true,
              //   data: [
              //     {
              //       yAxis: this.AlarmMax
              //     },
              //     {
              //       yAxis: this.AlarmMin
              //     }
              //   ]
              // }
            }
          ],
          dataset: {
            dimensions: ['created_date', 'value'],
            source: this.runtimes
          },

        };


        /*this.chartOption.visualMap = {
          top: 10,
          right: 10,
          show: false,
          pieces: [{
            /!*gt: 0,  // 大于
            lte: this.data.TriggerRule__Warning, // 小于等于*!/
            min: runtimeValue.min < this.AlarmMin ? this.AlarmMin : runtimeValue.min,
            max: runtimeValue.max > this.AlarmMax ? this.AlarmMax : runtimeValue.max,
            color: '#ff9933'
          }],
          outOfRange: {
            color: '#00838f'
          }
        };*/


      });
  }




}
