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
  private data;

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
        this.data = data;
        for (let i = 0; i < this.runtimes.length; i++) {
          let rt = this.runtimes[i];
          rt.CreatedDate = this.datePipe.transform(new Date(rt.CreatedDate), 'HH:mm');
          rt.Value = rt.Value * this.data.Parameter__Scale;
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
              markLine: { // 标线
                silent: true,
                data: [{
                  yAxis: this.data.TriggerRule__Warning
                }]
              }
            }
          ],
          dataset: {
            dimensions: ['CreatedDate', 'Value'],
            source: this.runtimes
          },

        };

        if (this.data.TriggerRule__Normal < this.data.TriggerRule__Warning) {
          this.chartOption.visualMap = {
            top: 10,
            right: 10,
            show: false,
            pieces: [{
              /*gt: 0,  // 大于
              lte: this.data.TriggerRule__Warning, // 小于等于*/
              min: 0,
              max: this.data.TriggerRule__Warning,
              color: '#00838f'
            }],
              outOfRange: {
              color: '#ff9933'
            }
          };
        }

      });
  }




}
