import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlarmService} from "../../../shared/alarm.service";
import {DatePipe} from "@angular/common";

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
              private datePipe: DatePipe) { }

  ngOnInit() {
    console.log(this.currentData);
    this.getDetail();
  }

  getDetail() {
    this.alarmService.AlarmMission('ok');

    this.alarmService.getDetail(this.currentData.Uid)
      .subscribe(data => {
        this.runtimes = data.runtime;
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
          rt.CreatedDate = this.datePipe.transform(new Date(rt.CreatedDate), 'MM/dd HH:mm:ss');
          // rt.Value = rt.Value;
          runtimeList.push(rt.Value);
        }
        runtimeValue.max = Math.max.apply(null, runtimeList);
        runtimeValue.min = Math.min.apply(null, runtimeList);

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
            },
            right: 10
          },
          grid: {
            left: 50,
            right: 40,
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
              markLine: { // 标线
                silent: true,
                data: [
                  {
                    yAxis: this.AlarmMax
                  },
                  {
                    yAxis: this.AlarmMin
                  }
                ]
              }
            }
          ],
          dataset: {
            dimensions: ['CreatedDate', 'Value'],
            source: this.runtimes
          },

        };


        this.chartOption.visualMap = {
          top: 10,
          right: 10,
          show: false,
          pieces: [{
            /*gt: 0,  // 大于
            lte: this.data.TriggerRule__Warning, // 小于等于*/
            min: runtimeValue.min < this.AlarmMin ? this.AlarmMin : runtimeValue.min,
            max: runtimeValue.max > this.AlarmMax ? this.AlarmMax : runtimeValue.max,
            color: '#ff9933'
          }],
          outOfRange: {
            color: '#00838f'
          }
        };

        /*if (this.currentData.TriggerRule.Scope === 1) {
          this.chartOption.visualMap = {
            top: 10,
            right: 10,
            show: false,
            pieces: [{
              /!*gt: 0,  // 大于
              lte: this.data.TriggerRule__Warning, // 小于等于*!/
              min: runtimeValue.min,
              max: this.AlarmMax,
              color: '#00838f'
            }],
              outOfRange: {
              color: '#ff9933'
            }
          };
        } else {
          this.chartOption.visualMap = {
            top: 10,
            right: 10,
            show: false,
            pieces: [{
              min: runtimeValue.min,
              max: this.AlarmMax,
              color: '#ff9933'
            }],
            outOfRange: {
              color: '#00838f'
            }
          };
        }*/

      });
  }




}
