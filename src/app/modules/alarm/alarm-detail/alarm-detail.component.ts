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
  private AlarmValue;

  constructor(public activeModal: NgbActiveModal,
              private alarmService: AlarmService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.alarmService.getDetail(this.currentData.Uid)
      .subscribe(data => {
        this.runtimes = data.runtime;
        this.AlarmValue = data.alarmValue;
        console.log(this.currentData, this.runtimes, this.AlarmValue);
        let runtimeValue = {
          min: 0,
          max: 0
        };
        for (let i = 0; i < this.runtimes.length; i++) {
          let rt = this.runtimes[i];
          rt.CreatedDate = this.datePipe.transform(new Date(rt.CreatedDate), 'HH:mm:ss');
          // rt.Value = rt.Value;

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
                runtimeValue.min = value.min;
                runtimeValue.max = value.max;
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
                data: [{
                  yAxis: this.AlarmValue
                }]
              }
            }
          ],
          dataset: {
            dimensions: ['CreatedDate', 'Value'],
            source: this.runtimes
          },

        };

        if (this.currentData.TriggerRule.Scope === 1) {
          this.chartOption.visualMap = {
            top: 10,
            right: 10,
            show: false,
            pieces: [{
              /*gt: 0,  // 大于
              lte: this.data.TriggerRule__Warning, // 小于等于*/
              min: runtimeValue.min,
              max: this.AlarmValue,
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
              max: this.AlarmValue,
              color: '#ff9933'
            }],
            outOfRange: {
              color: '#00838f'
            }
          };
        }

      });
  }




}
